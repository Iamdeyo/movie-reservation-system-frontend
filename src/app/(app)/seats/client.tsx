"use client";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useLoginDialog } from "@/context/login-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Seat {
  id: number;
  row: string;
  number: number;
}

interface Props {
  allSeats: Seat[];
  bookedSeats: number[];
}

interface CreateReservationInput {
  theaters_id: string;
  showtimes_id: string;
  seats_ids: number[];
  reservation_date: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export default function Seats({ allSeats, bookedSeats }: Props) {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const { data: session, status } = useSession();
  const { openLoginDialog } = useLoginDialog();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleSeat = (seat: Seat) => {
    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    if (isSelected) {
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  const groupedByRow = allSeats.reduce((acc, seat) => {
    acc[seat.row] = acc[seat.row] || [];
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  const isBooked = (id: number) => bookedSeats.includes(id);
  const isSelected = (id: number) => selectedSeats.some((s) => s.id === id);

  const pricePerSeat = 10000;
  const totalPrice = selectedSeats.length * pricePerSeat;

  const handleProceed = async () => {
    const showtimes_id = searchParams.get("st");
    const reservation_date = searchParams.get("sd");
    const theaters_id = searchParams.get("th"); // You can name this however your URL is structured

    if (!showtimes_id || !reservation_date || !theaters_id) {
      return;
    }

    if (status === "unauthenticated") {
      openLoginDialog();
      return;
    }

    if (!session) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await createReservation(
        {
          theaters_id,
          showtimes_id,
          reservation_date,
          seats_ids: selectedSeats.map((seat) => seat.id),
        },
        session?.accessToken
      );

      if (response?.success) {
        toast.success(response.message);
        router.push("/tickets/" + response.data.id);
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full flex-1">
      <h3 className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-semibold mt-5 container mx-auto">
        Seats
      </h3>

      <section className="space-y-4 grid justify-center mt-6">
        {Object.entries(groupedByRow).map(([row, seats]) => (
          <div key={row} className="flex gap-3 justify-center">
            {seats.map((seat) => {
              const disabled = isBooked(seat.id);
              const selected = isSelected(seat.id);

              return (
                <button
                  key={seat.id}
                  onClick={() => !disabled && toggleSeat(seat)}
                  disabled={disabled}
                  className={cn(
                    "w-10 aspect-square rounded-xl flex items-center justify-center font-semibold text-xs transition",
                    disabled
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : selected
                      ? "bg-main text-white"
                      : "bg-white text-black"
                  )}
                >
                  {seat.row}
                  {seat.number}
                </button>
              );
            })}
          </div>
        ))}
      </section>

      <section className="border-t border-white pb-10 pt-5">
        <div className="container mx-auto flex items-center justify-between gap-5 flex-wrap">
          <div className="flex items-center gap-5">
            <div className="grid gap-1.5">
              <p className="md:text-lg">Total</p>
              <p className="text-lg xs:text-xl md:text-2xl font-medium">
                ₦{totalPrice.toLocaleString()}
              </p>
            </div>
            <div className="grid gap-1.5">
              <p className="md:text-lg">Seats</p>
              <p className="text-lg xs:text-xl md:text-2xl font-medium">
                {selectedSeats.map((s) => `${s.row}${s.number}`).join(", ") ||
                  "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 flex-wrap-reverse">
            <Button variant={"outline"}>Back</Button>
            <button
              onClick={handleProceed}
              className={cn(buttonVariants(), "disabled:opacity-50")}
              disabled={selectedSeats.length === 0 || isLoading}
            >
              Proceed Payment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

async function createReservation(
  body: CreateReservationInput,
  token: string
): Promise<ApiResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to create reservation");
    }

    return data;
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
}
