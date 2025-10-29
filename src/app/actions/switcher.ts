"use server";

import { cookies } from "next/headers";

export async function switchLanguage() {
  const cookieStore = await cookies();

  const currentLang = cookieStore.get("lang")?.value || "en";
  const newLang = currentLang === "en" ? "ar" : "en";

  cookieStore.set("lang", newLang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return { lang: newLang };
}
