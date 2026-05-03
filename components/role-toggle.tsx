"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ROLES, type Role } from "@/lib/utils";
import { cn } from "@/lib/utils";

const LABELS: Record<Role, string> = {
  ai: "AI / ML",
  fullstack: "Full-Stack",
  backend: "Backend",
};

export function RoleToggle({ role }: { role: Role }) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function setRole(r: Role) {
    const sp = new URLSearchParams(params.toString());
    sp.set("role", r);
    startTransition(() => {
      router.replace(`/?${sp.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-bg-elev p-1">
      <span className="px-3 py-1 label">View as</span>
      {ROLES.map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          disabled={pending}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium transition-colors",
            role === r
              ? "bg-accent text-accent-fg"
              : "text-fg-muted hover:text-fg",
          )}
        >
          {LABELS[r]}
        </button>
      ))}
    </div>
  );
}
