import { cookies } from "next/headers";

export default async function getLang() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "en";

  return lang;
}
