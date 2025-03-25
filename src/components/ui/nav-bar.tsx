"use client";

import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
  // eslint-disable-next-line
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      setSession(session);
    }
    fetchSession();
  }, []);

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">
        <Link href="/" className="cursor-pointer">
          Coupon Claim Assignment
        </Link>
      </h1>
      <nav>
        {session?.user?.role === "ADMIN" ? (
          <Button
            onClick={() => {
              redirect("/dashboard");
            }}
            className="m-2"
          >
            Dashboard
          </Button>
        ) : null}
        {session ? (
          <Button
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            onClick={() => {
              redirect("/api/auth/signin");
            }}
          >
            Login
          </Button>
        )}
      </nav>
    </header>
  );
}
