"use client";

import { switchLanguage } from "@/src/app/actions/switcher";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  async function handleClick() {
    startTransition(async () => {
      await switchLanguage();
      // Force refresh (so Next.js re-renders server components with new cookies)
      //   window.location.reload();
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-700"
    >
      {isPending ? "Switching..." : "Switch Language"}
    </button>
  );
}
