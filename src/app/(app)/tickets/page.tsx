import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export async function generateMetadata() {
  return {
    title: `Tickets | Cinemas`,
    description: `Get all tickets information here`,
  };
}

async function getReservations(accessToken: string): Promise<Reservation[]> {
  try {
    const res = await fetch(`${BASE_URL}/reservations`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return [];

    const resData = await res.json();
    return resData.data as Reservation[];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function Tickets({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const session = await auth();

  if (!session || !session.accessToken) {
    redirect("/");
  }

  const allReservations = await getReservations(session.accessToken);

  const now = new Date();
  const filter = searchParams.filter ?? "upcoming";

  const filteredReservations =
    filter === "history"
      ? allReservations.filter((res) => new Date(res.reservationDate) < now)
      : allReservations.filter((res) => new Date(res.reservationDate) >= now);

  return (
    <div className="container mx-auto">
      <div className="flex gap-3 justify-center mt-5 md:mt-10">
        <Link href="?filter=upcoming">
          <Button
            variant={filter === "upcoming" ? "default" : "outline"}
            className="rounded-4xl"
          >
            Upcoming
          </Button>
        </Link>
        <Link href="?filter=history">
          <Button
            variant={filter === "history" ? "default" : "outline"}
            className="rounded-4xl"
          >
            History
          </Button>
        </Link>
      </div>

      <section className="mt-10 flex flex-wrap gap-x-3 lg:gap-x-4 gap-y-8 justify-center">
        {filteredReservations.length === 0 ? (
          <p className="text-center text-lg">No {filter} reservations found.</p>
        ) : (
          filteredReservations.map((res) => {
            const formattedDate = new Date(res.reservationDate).toDateString();
            const formattedTime = res.showtime.startTime.slice(0, 5);
            const seatList = res.seats
              .map((s) => `${s.row}${s.number}`)
              .join(", ");

            return (
              <div
                key={res.id}
                className="border rounded-3xl border-white p-5 sm:max-w-[325px] w-full max-w-[450px] flex-none grid gap-5 md:gap-10"
              >
                <div className="grid gap-1.5">
                  <p className="md:text-lg">Date</p>
                  <p className="text-lg xs:text-xl md:text-2xl font-medium">
                    {formattedDate}
                  </p>
                </div>
                <div className="grid gap-1.5">
                  <p className="md:text-lg">Movie Title</p>
                  <p className="text-lg xs:text-xl md:text-2xl font-medium">
                    {res.showtime.movie.title}
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
            );
          })
        )}
      </section>
    </div>
  );
}
