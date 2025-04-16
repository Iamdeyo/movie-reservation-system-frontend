"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useLoginDialog } from "@/context/login-provider";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { openLoginDialog } = useLoginDialog();

  const { status } = useSession();

  const handleLogout = async () => {
    signOut({ redirect: false });
  };

  return (
    <header className="h-20 flex items-center justify-between container mx-auto">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="logo" width={131} height={49} />
      </Link>
      <nav className="flex gap-2.5">
        {status !== "authenticated" ? (
          <>
            <Button onClick={openLoginDialog}>Login</Button>
            <Link
              href={"/"}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              href={"/tickets"}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              My Ticket
            </Link>
            <div
              className={cn(buttonVariants({ variant: "destructive" }))}
              onClick={handleLogout}
            >
              Logout
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
