"use server";

import { cookies } from "next/headers";

export async function switchLanguage({ lang }: { lang: string }) {
  const cookieStore = await cookies();

  const newLang = lang;

  cookieStore.set("lang", lang);

  return { lang: newLang };
}
