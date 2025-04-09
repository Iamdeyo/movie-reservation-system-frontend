import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Navbar() {
  return (
    <header className="h-20 flex items-center justify-between container mx-auto">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="logo" width={131} height={49} />
      </Link>
      <nav className="flex gap-2.5">
        <Link href={"/"} className={cn(buttonVariants())}>
          Login
        </Link>
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
