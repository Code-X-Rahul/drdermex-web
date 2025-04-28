export interface DeleteAccountPayload {
  phoneNumber: string;
  reason: string;
  otp: string;
  platForm?: string;
}

export async function deleteAccount(data: DeleteAccountPayload) {
  try {
    const response = await fetch(
      "https://prod.backend.drdermx.com/api/v1/delete_acc/deactivate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Failed to delete account",
      };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error deleting account:", error);
    return { success: false, error: "An unknown error occurred" };
  }
}
