"use server";

export default async function contactusAction(data) {
  try {
    const response = await fetch(
      `https://pricelessmed.com/api/website/contact-us`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: {
          message: result.message || "Failed to submit form",
          status: response.status,
        },
      };
    }

    return {
      data: result.data || result,
      success: true,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      success: false,
      error: {
        message:
          err instanceof Error ? err.message : "An unknown error occurred",
        status: 500,
      },
    };
  }
}
