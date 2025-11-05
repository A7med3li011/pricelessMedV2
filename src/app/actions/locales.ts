"use server";

import { getDirection } from "@/src/utils/direction";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setLocale(locale: string, pathname: string) {
       const cookieStore = await cookies();
       const direction = getDirection(locale);

       // Set locale cookie
       cookieStore.set("NEXT_LOCALE", locale, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              maxAge: 60 * 60 * 24 * 30,
              sameSite: "strict",
              path: "/",
       });

       /* set direction cookie */
       cookieStore.set("NEXT_DIRECTION", direction, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              maxAge: 60 * 60 * 24 * 30,
              sameSite: "strict",
              path: "/",
       });

       redirect(`/${locale}${pathname}`);
}