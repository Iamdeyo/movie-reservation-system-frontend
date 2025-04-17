"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Showtime {
  id: number;
  movieId: number;
  theaterId: number;
  startTime: string;
  endTime: string;
  endDate: string;
  price: string;
  theater?: {
    id: number;
    name: string;
  };
}

interface MovieData {
  id: number;
  title: string;
  description: string;
  poster: string;
  duration: number | string;
  genres: {
    id: number;
    name: string;
  }[];
  showtimes: Showtime[];
}

function formatMinutesToHours(minutes: number): string {
  const hrs: number = Math.floor(minutes / 60);
  const mins: number = minutes % 60;
  return `${hrs}h ${mins}m`;
}

// Format date for display
const formatDisplayDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Format time for display
const formatDisplayTime = (timeString: string) => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Movie({ movie: initialMovie }: { movie: MovieData }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const sd = searchParams.get("sd");
  const [data, setData] = useState<MovieData>(initialMovie);
  const [selectedShowtime, setSelectedShowtime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data whenever sd changes
  useEffect(() => {
    const fetchData = async () => {
      if (!sd) return; // Skip if no date selected

      setIsLoading(true);
      try {
        const url = new URL(`${BASE_URL}/movies/${data.id}`);
        url.searchParams.append("selectedDate", sd);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch movie data");

        const result = await res.json();
        setData(result.data);
        setSelectedShowtime(null); // Reset selected showtime when date changes
      } catch (error) {
        console.log("Error fetching movie data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sd, data.id]); // Re-run when sd or movie id changes

  const handleProceed = () => {
    router.push(
      "/seats?sd=" +
        sd +
        "&st=" +
        selectedShowtime +
        "&th=" +
        data.showtimes.find(({ id }) => id === selectedShowtime)?.theater?.id
    );
  };

  return (
    <div className="mt-10 space-y-10 mx-auto container">
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 h-svh">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
        </div>
      )}

      <div className="flex flex-col gap-10 md:flex-row-reverse md:justify-between">
        {/* Movie poster and info (unchanged) */}
        <div className="flex flex-wrap md:flex-col gap-9 md:max-w-3xs">
          <div className="aspect-[250/375] w-full max-w-[250px] flex-none relative rounded-[1.25rem] overflow-hidden">
            <Image
              src={data.poster}
              alt="movie"
              fill
              sizes="400px"
              className="object-cover transition-all duration-500"
            />
          </div>
          <div className="grid gap-4 flex-1 min-w-3xs">
            <p className="uppercase font-semibold text-lg xs:text-2xl">
              {data.title}
            </p>
            <p className="text-sm">{data.description}</p>
            <p className="text-sm flex justify-between gap-4">
              <span>Duration</span>
              <span className="text-end">
                {formatMinutesToHours(Number(data.duration))}
              </span>
            </p>
            <p className="text-sm flex justify-between gap-4">
              <span>Genre</span>
              <span className="text-end">
                {data.genres.map((g) => g.name).join(", ")}
              </span>
            </p>
          </div>
        </div>

        {/* Date selection and showtimes */}
        <div className="flex flex-col gap-5">
          <div className="space-y-5">
            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-semibold">
              Date
            </h3>
            <div className="flex flex-wrap gap-5">
              {Array.from({ length: 7 }).map((_, i) => {
                const today = new Date();
                const date = new Date(today);
                date.setDate(today.getDate() + i);

                const dayName = date.toLocaleDateString("en-US", {
                  weekday: "short",
                });
                const dayNumber = date.getDate();
                const monthName = date.toLocaleDateString("en-US", {
                  month: "short",
                });
                const formattedDate = `${date.getFullYear()}-${(
                  date.getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}-${date
                  .getDate()
                  .toString()
                  .padStart(2, "0")}`;

                return (
                  <button
                    key={i}
                    onClick={() =>
                      router.push(`${pathname}?sd=${formattedDate}`)
                    }
                    data-active={(!sd && i === 0) || formattedDate === sd}
                    disabled={isLoading}
                    className="flex-none border-2 rounded-xl border-white gap-1 flex flex-col items-center justify-center text-center h-[86px] w-[86px] data-[active=true]:text-white data-[active=true]:bg-main data-[active=true]:border-main cursor-pointer hover:border-main hover:text-main active:scale-90 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <p className="font-medium">{`${dayNumber} ${monthName}`}</p>
                    <p className="font-bold text-xl">{dayName}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-semibold">
              Showtimes
            </h3>
            {data.showtimes.length === 0 ? (
              <p className="text-gray-500">
                No showtimes available for this date
              </p>
            ) : (
              <div className="flex flex-wrap gap-5">
                {data.showtimes.map((st) => (
                  <button
                    key={st.id}
                    data-active={st.id === selectedShowtime}
                    onClick={() => setSelectedShowtime(st.id)}
                    disabled={isLoading}
                    className="flex-none border rounded-lg border-white gap-1 flex flex-col items-center justify-center text-center data-[active=true]:text-white data-[active=true]:bg-main data-[active=true]:border-main cursor-pointer hover:border-main hover:text-main active:scale-90 transition-all duration-500 w-fit px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <p className="font-medium">
                      {formatDisplayTime(st.startTime)}
                    </p>
                    <p className="text-xs">{st.theater?.name}</p>
                    <p className="text-xs font-bold">{st.price}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedShowtime && (
            <div className="space-y-5">
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-semibold">
                Your Selection
              </h3>
              <div className="border rounded-3xl px-6 py-7 grid gap-5 max-w-[373px]">
                <p className="text-2xl font-semibold md:text-3xl">
                  {
                    data.showtimes.find(({ id }) => id === selectedShowtime)
                      ?.theater?.name
                  }
                </p>
                <p className="sm:text-lg md:text-xl">
                  {formatDisplayDate(sd || "")} <br />
                  {formatDisplayTime(
                    data.showtimes.find(({ id }) => id === selectedShowtime)
                      ?.startTime || ""
                  )}
                </p>
                <p className="text-sm">
                  {
                    data.showtimes.find(({ id }) => id === selectedShowtime)
                      ?.price
                  }
                </p>
                <p className="text-sm">
                  *Seat selection can be done after this
                </p>

                <div
                  onClick={handleProceed}
                  className={cn(buttonVariants(), "w-full")}
                >
                  Proceed to Booking
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
