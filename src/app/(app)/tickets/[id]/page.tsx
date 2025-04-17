import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

type Seat = {
  id: number;
  row: string;
  number: number;
};

type Reservation = {
  id: number;
  reservationDate: string;
  seats: Seat[];
  showtime: {
    id: number;
    movieId: number;
    movie: {
      title: string;
    };
    theater: {
      name: string;
    };
    startTime: string;
  };
};

const BASE_URL = process.env.BASE_URL;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const session = await auth();
  const { id } = await params;

  if (!session || !session.accessToken) {
    return {
      title: "Unauthorized",
      description: "You must be logged in to view this reservation.",
    };
  }

  const res = await getReservation(id, session.accessToken);
  if (!res) {
    return {
      title: "Reservation Not Found",
      description: "No reservation found with the given ID.",
    };
  }

  return {
    title: `${res.showtime.movie.title}'s Tickets | Cinemas`,
    description: `Reservation on ${res.reservationDate} at ${res.showtime.startTime}`,
  };
}

async function getReservation(
  id: string,
  accessToken: string
): Promise<Reservation | null> {
  try {
    const res = await fetch(`${BASE_URL}/reservations/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const resData = await res.json();
    return resData.data as Reservation;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default async function ReservationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const session = await auth();

  if (!session || !session.accessToken) {
    redirect("/");
  }

  const reservation = await getReservation(id, session.accessToken as string);

  if (!reservation) {
    return notFound();
  }

  const formattedDate = new Date(reservation.reservationDate).toDateString();
  const formattedTime = reservation.showtime.startTime.slice(0, 5);
  const seatList = reservation.seats
    .map((s) => `${s.row}${s.number}`)
    .join(", ");

  return (
    <div className="container mx-auto flex items-center justify-center pt-20">
      <div className="border rounded-3xl border-white p-5 w-full sm:max-w-[355px] grid gap-5 md:gap-10">
        <div className="grid gap-1.5">
          <p className="md:text-lg">Date</p>
          <p className="text-lg xs:text-xl md:text-2xl font-medium">
            {formattedDate}
          </p>
        </div>
        <div className="grid gap-1.5">
          <p className="md:text-lg">Movie Title</p>
          <p className="text-lg xs:text-xl md:text-2xl font-medium">
            {reservation.showtime.movie.title}
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="grid gap-1.5">
            <p className="md:text-lg">Seat(s)</p>
            <p className="text-lg xs:text-xl md:text-2xl font-medium">
              {seatList}
            </p>
          </div>
          <div className="grid gap-1.5">
            <p className="md:text-lg">Time</p>
            <p className="text-lg xs:text-xl md:text-2xl font-medium">
              {formattedTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
