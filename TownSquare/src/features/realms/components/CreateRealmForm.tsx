// src/features/realms/components/CreateRealmForm.tsx
"use client";

import React, { useState } from "react";
import type { Realm } from "@/features/realms/types/Realm";
import type { Result } from "@/features/realms/types/Result";
import { createRealm } from "@/features/realms/realms-api";

type CreateRealmFormProps = {
  user: { id: string } | null;
  onRealmCreated?: (realm: Realm) => void; // optional for now
  onCancel: () => void;
};

export const CreateRealmForm: React.FC<CreateRealmFormProps> = ({
  user,
  onRealmCreated,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!name.trim() || !desc.trim()) {
      setError("All fields must be filled out before submitting!");
      return;
    }

    if (!user) {
      setError("You must be logged in to create a realm!");
      return;
    }

    const newRealm: Partial<Realm> = {
      name,
      description: desc,
      ownerId: user.id,
    };

    try {
      const result: Result<Realm> = await createRealm(newRealm);

      if (!result.success) {
        setError(result.error.message);
        return;
      }

      if (result.data) {
        console.log("Created realm:", result.data);
        onRealmCreated?.(result.data);
        setName("");
        setDesc("");
        onCancel(); // hide form after success
      }
    } catch (e) {
      console.error(e);
      setError("Unexpected error during realm creation");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

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

      <button type="button" onClick={onCancel}>
        Cancel
      </button>

      <input type="submit" value="Create" />
    </form>
  );
};
