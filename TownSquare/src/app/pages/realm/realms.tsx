"use client";

import React, { useEffect, useState } from "react";
import { Realm } from "@/features/realms/types/Realm";
import { listRealms, createRealm } from "@/features/realms/realms-api";
import { Result } from "@/features/realms/types/Result";
import { authClient } from "@/auth/config/auth-client";

// This is a placeholder for the Realms page. You can replace this with your actual Realms page content.
export const Realms = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [realms, setRealms] = useState<Realm[]>([]);
  const [error, setError] = useState<String | null>(null);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    async function loadRealms() {
      const result = await listRealms();
      console.log("listRealms raw result: ", result);

      if (!result.success) {
        console.error("listRealms error: ", result.error.message);
        setError(result.error.message);
        return;
      }
      setRealms(Array.isArray(result.data) ? result.data : []);
    }
    loadRealms();
  }, []);

  async function handleCreate(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !desc.trim()) {
      console.log("All fields must be filled out before submitting!");
      return;
    }

    if (!user) {
      console.log("You must be logged in to create a realm!");
      return;
    }

    const newRealm: Partial<Realm> = {
      name: name,
      description: desc,
      ownerId: user.id,
    }

    try {
      const result: Result<Realm> = await createRealm(newRealm);

      console.log("Result status:", result.success);

      if (!result.success) {
        console.log("HTTP error: ", result.error.code);
        console.log("message: ", result.error.message);
        return;
      }

      if (result.data) {
        const createdRealm = result.data;

        console.log("Success!");
        console.log("Created realm: ", createdRealm);

        setRealms((prev) => [...prev, createdRealm]);
      }
    } catch (e) {
      console.error(e);
      setError("Unexpected error during realm creation");
    }
  }

  return (
    <>
      <h1>Realms</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {realms.map((realm) => (
          <li key={realm.id}>
            Name: {realm.name} -
            Description: {realm.description} - 
            Created at: {realm.createdAt} - 
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreate}>
        <label htmlFor="realmName">
          Realm navn
        </label>
        <input 
            type="text" 
            id="realmName" 
            placeholder="Skriv navnet på ditt nye realm her" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={{ margin: "10px", backgroundColor: "violet" }}
        />

        <label htmlFor="realmDesc">
          Realm beskrivelse
        </label>
        <input 
            type="text" 
            id="realmDesc" 
            placeholder="Skriv beskrivelsen til ditt nye realm her" 
            value={desc} 
            onChange={(e) => setDesc(e.target.value)}
            style={{ margin: "10px", backgroundColor: "violet" }}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
