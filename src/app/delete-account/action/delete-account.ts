"use server";

import { revalidatePath } from "next/cache";

export interface DeleteAccountPayload {
  phoneNumber: string;
  reason: string;
  otp: string;
  platForm?: string;
}

export async function deleteAccount(data: DeleteAccountPayload) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/delete_acc/deactivate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete account");
    }

    const result = await response.json();

    revalidatePath("/");

    return { success: true, data: result };
  } catch (error) {
    console.error("Error deleting account:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
