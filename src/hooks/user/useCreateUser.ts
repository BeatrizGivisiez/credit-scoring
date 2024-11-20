"use client";
import { useState } from "react";

import { UserCreateDTO } from "@/app/dto/UserDto";

export const useCreateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (newUser: UserCreateDTO) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/ld+json"
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error(`Error creating data: ${response.statusText}`);
      }

      return await response.json();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};
