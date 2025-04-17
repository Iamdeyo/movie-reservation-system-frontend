import Seats from "./client";
import { notFound } from "next/navigation";

interface Seat {
  id: number;
  row: string;
  number: number;
}

interface SeatData {
  allSeats: Seat[];
  bookedSeats: number[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: SeatData;
}

export async function generateMetadata() {
  return {
    title: `Select Seats | Cinemas`,
  };
}

export default async function SeatsPage({
  searchParams,
}: {
  searchParams: { st?: string; sd?: string };
}) {
  const theSearchParams = await searchParams;
  const showtimeId = theSearchParams.st;
  const showDate = theSearchParams.sd;

  if (!showtimeId || !showDate) {
    notFound(); // or return a fallback
  }

  try {
    const res = await fetch(
      `${process.env.BASE_URL}/showtimes/${showtimeId}/${showDate}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch seat data");

    const json: ApiResponse = await res.json();

    if (!json.success) {
      throw new Error("Invalid response from server");
    }

    return (
      <Seats
        allSeats={json.data.allSeats}
        bookedSeats={json.data.bookedSeats}
      />
    );
  } catch (err) {
    console.error("Seat fetch error:", err);
    notFound(); // or show a fallback UI
  }
}
