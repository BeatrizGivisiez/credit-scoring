"use client";
import { useState } from "react";

import { UserCreateDTO } from "@/app/dto/UserDto";

export const useEditUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const editUser = async (newUser: UserCreateDTO, id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user?id=${id}`, {
        method: "PUT",
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

  return { editUser, loading, error };
};
