"use client";

import React, { useEffect, useState } from "react";
import { Realm } from "@/features/realms/types/Realm";
import { realmsService } from "@/features/realms/service/realms-service";
import { Result, ResultData } from "@/features/realms/types/Result";

/*
type RealmProps = {
  realms: Realm[]
};
*/

// This is a placeholder for the Realms page. You can replace this with your actual Realms page content.
export const Realms = () => {
  const [data, setData] = useState<Realm[]>([]);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [ownerId, setOwnerId] = useState("");

  useEffect(() => {
    async function loadRealms() {
      try {
        const realmsList = await realmsService.list();
        setData(realmsList);
      } 
      finally {
        if (data?.length === 0) {
          return;
        }
      }
    }
    loadRealms();
  }, []);

  async function handleCreate(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !desc.trim() || !ownerId.trim()) {
      console.log("All fields must be filled out before submitting!");
      return;
    }

    if (Number.isNaN(Number(ownerId))) {
      console.log("Owner ID must be a number!")
      return;
    }

    const newRealm: Partial<Realm> = {
      name: name,
      description: desc,
      ownerId: Number(ownerId),
    }

    try {
      const response = await fetch("/api/realms/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRealm),
      });

      console.log("Response status:", response.status);

      const body: Result<Realm> = await response.json();

      if (!response.ok) {
        console.log("HTTP error: ", response.status);
        console.log("Body: ", body);
        return;
      }

      if (!body.success) {
        console.log("Something went wrong.");
        console.log("Error: ", body.error.message);
        return;
      }

      if (body.data !== undefined) {
        const id: number = body.data.id;
        const name: string = body.data.name;
        const description: string = body.data.description;
        const ownerId: number = body.data.ownerId;
        const createdAt: string = body.data.createdAt;
        const updatedAt: string | undefined = body.data.updatedAt;

        const createdRealm: Realm = {
          id: id,
          name: name,
          description: description,
          ownerId: ownerId,
          createdAt: createdAt,
          updatedAt: updatedAt,
        }


        console.log("Success!");
        console.log("Created realm: ", createdRealm);

        setData(prev => (prev ? [...prev, createdRealm] : [createdRealm]));
      }

    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <h1>Realms</h1>
      <ul>
        {data.map((realm) => (
          <li key={realm.id}>
            Name: {realm.name} - 
            Description: {realm.description} - 
            Created at: {realm.createdAt} - 
            Owner ID: {realm.ownerId}
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

        <label htmlFor="realmOwnerId">
          Eier-ID
        </label>
        <input 
            type="text" 
            id="realmOwnerId" 
            placeholder="Skriv eier-ID til ditt nye realm her" 
            value={ownerId} 
            onChange={(e) => setOwnerId(e.target.value)}
            style={{ margin: "10px", backgroundColor: "violet" }}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
