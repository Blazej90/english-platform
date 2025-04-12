"use client";

import { useEffect, useState } from "react";
import { format, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
];

const mockBusyTimes: Record<string, string[]> = {
  "2025-04-15": ["10:00", "14:00"],
  "2025-04-16": ["12:00"],
};

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [busyTimes, setBusyTimes] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedDate) return;

    const key = format(selectedDate, "yyyy-MM-dd");
    setBusyTimes(mockBusyTimes[key] || []);
  }, [selectedDate]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Book a Lesson</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
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
              <div className="grid grid-cols-2 gap-3">
                {lessonHours.map((hour) => {
                  const isBusy = busyTimes.includes(hour);
                  return (
                    <Button
                      key={hour}
                      variant={isBusy ? "outline" : "default"}
                      className={isBusy ? "opacity-50 cursor-not-allowed" : ""}
                      disabled={isBusy}
                    >
                      {hour}
                    </Button>
                  );
                })}
              </div>
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
