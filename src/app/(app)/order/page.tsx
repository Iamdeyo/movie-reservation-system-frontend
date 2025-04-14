import { Button } from "@/components/ui/button";

export default function Order() {
  return (
    <div className="max-w-sm mx-auto px-5 mt-20">
      <div className="space-y-6">
        {/* Header */}
        <h2 className="text-2xl font-bold">Booking Detail</h2>

        {/* Schedule Section */}
        <div className="space-y-4">
          <h3 className="text-gray-400">Schedule</h3>

          <div className="space-y-1">
            <p className="text-gray-400 text-sm">Movie Title</p>
            <p className="font-medium">SPIDERMAN NO WAY HOME</p>
          </div>

          <div className="space-y-1">
            <p className="text-gray-400 text-sm">Date</p>
            <p className="font-medium">Mon, 23 Oct 2023</p>
          </div>

          <div className="flex justify-between">
            <div className="space-y-1">
              <p className="text-gray-400 text-sm">Ticket (3)</p>
              <p className="font-medium">C8, C9, C10</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-gray-400 text-sm">Hours</p>
              <p className="font-medium">14:40</p>
            </div>
          </div>
        </div>

        {/* Transaction Detail Section */}
        <div className="space-y-4">
          <h3 className="text-gray-400">Transaction Detail</h3>

          <div className="flex justify-between items-center">
            <p className="text-sm">REGULAR SEAT</p>
            <p className="text-sm">RM 55.70 x3</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm">Service Charge (6%)</p>
            <p className="text-sm">RM 3.30 x3</p>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-700">
            <p className="font-medium">Total payment</p>
            <p className="font-medium">RM 62.10</p>
          </div>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-500 italic">
          *Purchased ticket cannot be canceled
        </p>

        {/* Checkout Button */}
        <Button className="w-full">Checkout Ticket</Button>
      </div>
    </div>
  );
}
