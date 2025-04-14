"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useLoginDialog } from "@/context/login-provider";

export default function Navbar() {
  const { openLoginDialog } = useLoginDialog();
  return (
    <header className="h-20 flex items-center justify-between container mx-auto">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="logo" width={131} height={49} />
      </Link>
      <nav className="flex gap-2.5">
        <Button onClick={openLoginDialog}>Login</Button>
        <Link href={"/"} className={cn(buttonVariants({ variant: "outline" }))}>
          Register
        </Link>
        {/* <Link href={"/"} className={cn(buttonVariants({ variant: "ghost" }))}>
          My Ticket
        </Link>
        <div className={cn(buttonVariants({ variant: "destructive" }))}>
          Logout
        </div> */}
      </nav>
    </header>
  );
}
