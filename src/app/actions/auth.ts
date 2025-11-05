"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "ACCESS_TOKEN";

const cookieOptions = {
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: "lax" as const,
       path: "/",
};

export async function setAccessToken(token: string, maxAgeSeconds = 60 * 60 * 2) {
       const cookieStore = await cookies();

       cookieStore.set(ACCESS_TOKEN_COOKIE, token, {
              ...cookieOptions,
              maxAge: maxAgeSeconds,
       });
}

export async function clearAccessToken() {
       const cookieStore = await cookies();

       cookieStore.delete(ACCESS_TOKEN_COOKIE);
}

export async function getAccessToken() {
       const cookieStore = await cookies();

       return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
}

