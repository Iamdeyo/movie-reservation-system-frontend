import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Movie() {
  return (
    <div className="mt-10 space-y-10 mx-auto container">
      <div className="flex flex-col gap-10 md:flex-row-reverse md:justify-between">
        <div className="grid gap-9 max-w-3xs">
          <div className="aspect-[250/375] w-full relative rounded-[1.25rem] overflow-hidden">
            <Image
              src={"/movie.png"}
              alt="movie"
              fill
              sizes="400px"
              className="object-cover transition-all duration-500"
            />
          </div>
          <div className="grid gap-4">
            <p className="uppercase font-semibold text-lg xs:text-2xl">
              SPIDERMAN across THE SPIDERVERSE
            </p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              tempora minima dignissimos sunt veritatis reprehenderit, ipsam
              omnis aut vitae et iusto amet aspernatur eveniet? Ad accusamus
              dicta nesciunt nulla dolore!
            </p>
            <p className="text-sm flex justify-between gap-4">
              <span>Duration</span>
              <span className="text-end">2h 30m</span>
            </p>
            <p className="text-sm flex justify-between gap-4">
              <span>Genre</span>
              <span className="text-end">Action, Comdey</span>
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="space-y-5">
            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-semibold">
              Showtimes
            </h3>
            <div className="flex flex-wrap gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  data-active={i === 1}
                  className="flex-none border rounded-lg border-white gap-1 flex flex-col items-center justify-center text-center data-[active=true]:text-white data-[active=true]:bg-main data-[active=true]:border-main cursor-pointer hover:border-main hover:text-main active:scale-90 transition-all duration-500 w-fit px-5 py-3"
                >
                  <p className="font-medium">11:00 pm</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-semibold">
              Date
            </h3>
            <div className="flex flex-wrap gap-5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  data-active={i === 1}
                  className="flex-none border-2 rounded-xl border-white gap-1 flex flex-col items-center justify-center text-center h-[86px] w-[86px] data-[active=true]:text-white data-[active=true]:bg-main data-[active=true]:border-main cursor-pointer hover:border-main hover:text-main active:scale-90 transition-all duration-500"
                >
                  <p className="font-medium">22 oct</p>
                  <p className="font-bold text-xl">Mon</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-semibold">
              Theater
            </h3>
            <div className="flex flex-wrap gap-5">
              <div
                data-active={true}
                className="flex-none border rounded-4xl border-white gap-1 flex flex-col items-center justify-center text-center data-[active=true]:text-white data-[active=true]:bg-main data-[active=true]:border-main cursor-pointer hover:border-main hover:text-main active:scale-90 transition-all duration-500 w-fit px-5 py-3"
              >
                <p className="font-medium">Theater 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-3xl px-6 py-7 grid gap-5 max-w-[373px]">
        <p className="text-2xl font-semibold md:text-3xl">Theater 1</p>
        <p className="sm:text-lg md:text-xl">
          24 October 2025 <br /> 15:00
        </p>
        <p className="text-sm">*Seat selection can be done after this</p>

        <Link href={"/"} className={cn(buttonVariants(), "w-full")}>
          Proceed
        </Link>
      </div>
    </div>
  );
}
