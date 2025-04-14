"use client";

import { Button } from "@/components/ui/button";

export default function SingleTickets() {
  return (
    <div className="container mx-auto flex items-center justify-center pt-20">
      <div className="border rounded-3xl border-white p-5 sm:max-w-[355px] grid gap-5 md:gap-10">
        <div className="grid gap-1.5">
          <p className="md:text-lg">Date</p>
          <p className="text-lg xs:text-xl md:text-2xl font-medium">
            Mon, 23 Oct 2023
          </p>
        </div>
        <div className="grid gap-1.5">
          <p className="md:text-lg">Movie Title</p>
          <p className="text-lg xs:text-xl md:text-2xl font-medium">
            SPIDERMAN NO WAY HOME
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="grid gap-1.5">
            <p className="md:text-lg">Seat(s)</p>
            <p className="text-lg xs:text-xl md:text-2xl font-medium">
              A4, C3, D4
            </p>
          </div>
          <div className="grid gap-1.5">
            <p className="md:text-lg">Time</p>
            <p className="text-lg xs:text-xl md:text-2xl font-medium">14:50</p>
          </div>
        </div>
        <Button>Download Ticket</Button>
      </div>
    </div>
  );
}
