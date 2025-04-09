import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto container lg:max-w-[880px] flex flex-col items-center">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
        Now Showing
      </h2>
      <section className="w-full mt-10 grid grid-cols-2 justify-center sm:flex sm:flex-wrap gap-x-5 gap-y-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Link
            href={"/movie/2"}
            key={i}
            className="w-full max-w-[350px] sm:max-w-[200px] lg:max-w-[250px] flex flex-col items-center text-center gap-2.5 group cursor-pointer"
          >
            <div className="aspect-[250/375] w-full relative rounded-[1.25rem] overflow-hidden">
              <Image
                src={"/movie.png"}
                alt="movie"
                fill
                sizes="400px"
                className="object-cover group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <p className="text-sm xs:text-base font-semibold line-clamp-2 text-center group-hover:underline transition-all duration-500">
              movie title {i} Lorem ipsum
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
