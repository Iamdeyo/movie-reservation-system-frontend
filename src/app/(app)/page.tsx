import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Movie {
  id: number;
  title: string;
  poster: string;
}

interface PaginationData {
  current_page: number;
  total: number;
  per_page: number;
  last_page: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Movie[];
  pagination: PaginationData;
}

async function getMovies(searchQuery?: string, page?: number) {
  const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
  const url = new URL(`${BASE_URL}/movies`);

  if (searchQuery) {
    url.searchParams.append("search", searchQuery);
  }
  if (page) {
    url.searchParams.append("page", page.toString());
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return (await res.json()) as ApiResponse;
}

interface HomeProps {
  searchParams: {
    search?: string;
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  // Extract searchParams values first
  const getSearchParams = await searchParams;
  const search = getSearchParams?.search || "";
  const page = getSearchParams?.page || "1";

  const currentPage = Number(page) || 1;
  const { data: movies, pagination } = await getMovies(search, currentPage);

  // Generate pagination links
  const getPaginationLinks = () => {
    const links = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      pagination.current_page - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(
      pagination.last_page,
      startPage + maxVisiblePages - 1
    );

    // Previous button
    links.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          href={`?${new URLSearchParams({
            ...(search && { search }),
            page: Math.max(1, pagination.current_page - 1).toString(),
          })}`}
          aria-disabled={pagination.current_page === 1}
        />
      </PaginationItem>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`?${new URLSearchParams({
              ...(search && { search }),
              page: i.toString(),
            })}`}
            isActive={i === pagination.current_page}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    links.push(
      <PaginationItem key="next">
        <PaginationNext
          href={`?${new URLSearchParams({
            ...(search && { search }),
            page: Math.min(
              pagination.last_page,
              pagination.current_page + 1
            ).toString(),
          })}`}
          aria-disabled={pagination.current_page === pagination.last_page}
        />
      </PaginationItem>
    );

    return links;
  };

  return (
    <div className="mx-auto container lg:max-w-[880px] flex flex-col items-center">
      <div className="flex justify-between flex-wrap gap-5 w-full">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold flex-none w-fit">
          Now Showing
        </h2>
        <form className="flex-none">
          <Input
            name="search"
            className="max-w-3xs rounded-none border-x-0 border-t-0"
            placeholder="Search movie"
            defaultValue={search}
          />
        </form>
      </div>

      <section className="w-full mt-10 grid grid-cols-2 justify-center sm:flex sm:flex-wrap gap-x-5 gap-y-8">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              href={`/movie/${movie.id}`}
              key={movie.id}
              className="w-full max-w-[350px] sm:max-w-[200px] lg:max-w-[250px] flex flex-col items-center text-center gap-2.5 group cursor-pointer"
            >
              <div className="aspect-[250/375] w-full relative rounded-[1.25rem] overflow-hidden">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  sizes="400px"
                  className="object-cover group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <p className="text-sm xs:text-base font-semibold line-clamp-2 text-center group-hover:underline transition-all duration-500">
                {movie.title}
              </p>
            </Link>
          ))
        ) : (
          <p className="col-span-2 text-center py-10">No movies found</p>
        )}
      </section>

      {pagination.last_page > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>{getPaginationLinks()}</PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
