// src/features/realms/hooks/useCreateRealmForm.ts
"use client";

import { useState } from "react";

export function useCreateRealmForm() {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  return { isOpen, openForm, closeForm };
}
