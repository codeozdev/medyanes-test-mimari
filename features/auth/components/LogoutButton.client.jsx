"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton({ className = "" }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className={`text-sm font-medium ${className}`}>
      Çıkış Yap
    </button>
  );
}
