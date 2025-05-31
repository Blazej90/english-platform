"use client";

import { useEffect, useState } from "react";
import { format, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackgroundGradient } from "@/components/ui/gradient-bg";
import { toast } from "sonner";

const lessonHours = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [busyTimes, setBusyTimes] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [rescheduleEventId, setRescheduleEventId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const storedId = localStorage.getItem("rescheduleEventId");
    if (storedId) setRescheduleEventId(storedId);
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchBusyTimes = async () => {
      try {
        const res = await fetch("/api/lessons/availability");
        const data = await res.json();

        const times: string[] = [];
        data.busy.forEach((slot: { start: string }) => {
          const slotDate = new Date(slot.start);
          if (isSameDay(slotDate, selectedDate)) {
            const hour = format(slotDate, "HH:mm");
            times.push(hour);
          }
        });

        setBusyTimes(times);
      } catch {
        toast.error("Unable to load availability.");
      }
    };

    fetchBusyTimes();
  }, [selectedDate]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedHour) return;
    setIsBooking(true);
    const date = format(selectedDate, "yyyy-MM-dd");
    const payload = JSON.stringify({ date, time: selectedHour });

    try {
      const res = await fetch(
        rescheduleEventId
          ? `/api/lessons/reschedule?eventId=${rescheduleEventId}`
          : "/api/lessons/book",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...JSON.parse(payload),
            eventId: rescheduleEventId,
          }),
        }
      );

      if (res.ok) {
        toast.success(
          rescheduleEventId
            ? "Lesson rescheduled successfully!"
            : "Lesson booked successfully!"
        );
        localStorage.removeItem("rescheduleEventId");
        setSelectedHour(null);
        setRescheduleEventId(null);
        setBusyTimes((prev) => [...prev, selectedHour]);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to book/reschedule lesson.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-8 px-2 sm:px-4">
      <BackgroundGradient className="w-full max-w-2xl mx-auto">
        <Card className="shadow-xl rounded-2xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-none w-full px-1 sm:px-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-1 tracking-tight">
              {rescheduleEventId ? "Reschedule Lesson" : "Book a Lesson"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold mb-2">Pick a day</h2>
                <div className="w-full max-w-xs sm:max-w-md mx-auto">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    fromDate={new Date()}
                  />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Available hours</h2>
                {selectedDate ? (
                  <>
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
                      {lessonHours.map((hour) => {
                        const isBusy = busyTimes.includes(hour);
                        const isSelected = selectedHour === hour;

                        return (
                          <Button
                            key={hour}
                            variant={
                              isSelected
                                ? "default"
                                : isBusy
                                ? "outline"
                                : "secondary"
                            }
                            className={`rounded-xl font-semibold shadow transition w-full py-2 text-base
                              active:scale-95 duration-150
                              ${
                                isSelected
                                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                  : isBusy
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:bg-blue-100 dark:hover:bg-blue-950"
                              }`}
                            disabled={isBusy}
                            onClick={() => setSelectedHour(hour)}
                          >
                            {hour}
                          </Button>
                        );
                      })}
                    </div>
                    {selectedHour && (
                      <div className="mt-6 flex flex-col items-center">
                        <Button
                          className="w-full sm:w-auto rounded-xl font-semibold px-8 py-3 text-base
                                    bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700
                                    text-white shadow-emerald-500/30 shadow-lg
                                    hover:shadow-emerald-400/60
                                    focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
                                    relative overflow-hidden
                                    active:scale-95 transition duration-150"
                          style={{
                            boxShadow: "0 0 24px 2px #34d39980",
                          }}
                          onClick={handleBooking}
                          disabled={isBooking}
                        >
                          <span className="relative z-10">
                            {isBooking
                              ? "Processing..."
                              : rescheduleEventId
                              ? "Confirm Reschedule"
                              : "Confirm Booking"}
                          </span>
                          <span className="absolute inset-0 rounded-xl bg-emerald-400 opacity-10 blur-2xl animate-pulse z-0"></span>
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-muted-foreground">
                    Please select a day first.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </BackgroundGradient>
    </div>
  );
}
