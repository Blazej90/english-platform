"use client";

import { useEffect, useState } from "react";
import { format, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const lessonHours = [
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
    if (storedId) {
      setRescheduleEventId(storedId);
    }
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
      } catch (err) {
        console.error("Failed to fetch busy times", err);
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
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Something went wrong.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 sm:space-y-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            {rescheduleEventId ? "Reschedule Lesson" : "Book a Lesson"}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">Pick a day</h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              fromDate={new Date()}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Available hours</h2>
            {selectedDate ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                        className={`w-full ${
                          isBusy ? "opacity-50 cursor-not-allowed" : ""
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
                  <div className="mt-6">
                    <Button
                      className="w-full sm:w-auto"
                      onClick={handleBooking}
                      disabled={isBooking}
                    >
                      {isBooking
                        ? "Processing..."
                        : rescheduleEventId
                        ? "Confirm Reschedule"
                        : "Confirm Booking"}
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
        </CardContent>
      </Card>
    </div>
  );
}
