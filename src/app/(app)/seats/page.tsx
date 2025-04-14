import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Seats() {
  return (
    <div className="flex flex-col justify-between h-full flex-1">
      <h3 className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-semibold mt-5 container mx-auto">
        Seats
      </h3>
      <section className="space-y-4 grid justify-center">
        <div className="flex gap-3">
          <button className="w-10 aspect-square rounded-xl flex items-center justify-center flex-none bg-white text-black font-semibold text-xs">
            A1
          </button>
          <button className="w-10 aspect-square rounded-xl flex items-center justify-center flex-none bg-white text-black font-semibold text-xs">
            A1
          </button>
          <button className="w-10 aspect-square rounded-xl flex items-center justify-center flex-none bg-white text-black font-semibold text-xs">
            A1
          </button>
        </div>
        <div className="flex gap-3">
          <button className="w-10 aspect-square rounded-xl flex items-center justify-center flex-none bg-white text-black font-semibold text-xs">
            A1
          </button>
          <button className="w-10 aspect-square rounded-xl flex items-center justify-center flex-none bg-white text-black font-semibold text-xs">
            A1
          </button>
          <button className="w-10 aspect-square rounded-xl flex items-center justify-center flex-none bg-white text-black font-semibold text-xs">
            A1
          </button>
        </div>
        <div className="flex gap-3">
          <button className="w-10 aspect-square rounded-xl flex items-center justify-center flex-none bg-white text-black font-semibold text-xs">
            A1
          </button>
          <button className="w-10 aspect-square rounded-xl flex items-center justify-center flex-none bg-white text-black font-semibold text-xs">
            A1
          </button>
          <button className="w-10 aspect-square rounded-xl flex items-center justify-center flex-none bg-white text-black font-semibold text-xs">
            A1
          </button>
        </div>
      </section>
      <section className="border-t border-white pb-10 pt-5">
        <div className="container mx-auto flex items-center justify-between gap-5 flex-wrap">
          <div className="flex items-center gap-5">
            <div className="grid gap-1.5">
              <p className="md:text-lg">Total</p>
              <p className="text-lg xs:text-xl md:text-2xl font-medium">
                N30,000
              </p>
            </div>
            <div className="grid gap-1.5">
              <p className="md:text-lg">Seat</p>
              <p className="text-lg xs:text-xl md:text-2xl font-medium">
                C3, C9, C10
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 flex-wrap-reverse">
            <Button variant={"outline"}>Back</Button>
            <Link href={"#"} className={cn(buttonVariants())}>
              Proceed Payment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
