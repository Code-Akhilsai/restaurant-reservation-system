function ReservationCard({ reservation, onCancel }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {reservation.restaurant}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Booking ID: {reservation.id}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            reservation.status === "Confirmed"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {reservation.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-500">Date</p>
          <p className="font-semibold">{reservation.date}</p>
        </div>

        <div>
          <p className="text-slate-500">Time</p>
          <p className="font-semibold">{reservation.time}</p>
        </div>

        <div>
          <p className="text-slate-500">Guests</p>
          <p className="font-semibold">{reservation.guests} People</p>
        </div>

        <div>
          <p className="text-slate-500">Table</p>
          <p className="font-semibold">Table {reservation.table}</p>
        </div>
      </div>

      {reservation.status === "Confirmed" && (
        <button
          onClick={() => onCancel(reservation.id)}
          className="mt-5 w-full rounded-lg border border-red-200 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          Cancel Reservation
        </button>
      )}
    </article>
  );
}

export default ReservationCard;
