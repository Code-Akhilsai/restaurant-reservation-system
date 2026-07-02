import { useState } from "react";
import ReservationCard from "../components/ReservationCard";

function MyReservations() {
  const [reservations, setReservations] = useState([
    {
      id: "RSV-1001",
      restaurant: "TableEase Restaurant",
      date: "10 July 2026",
      time: "7:00 PM",
      guests: 2,
      table: 4,
      status: "Confirmed",
    },
    {
      id: "RSV-1002",
      restaurant: "TableEase Restaurant",
      date: "18 July 2026",
      time: "8:00 PM",
      guests: 4,
      table: 7,
      status: "Confirmed",
    },
  ]);

  const handleCancel = (id) => {
    setReservations((previousReservations) =>
      previousReservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: "Cancelled" }
          : reservation,
      ),
    );
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
          Customer dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold">My Reservations</h1>
        <p className="mt-2 text-slate-600">
          View or cancel your upcoming restaurant reservations.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onCancel={handleCancel}
          />
        ))}
      </div>
    </main>
  );
}

export default MyReservations;
