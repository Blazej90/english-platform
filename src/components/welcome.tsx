"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { JoinButton } from "@/components/join-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Event = {
  id: string;
  summary?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
};

export function Welcome() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const name = user?.firstName;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/user-events");
        const data = await res.json();
        setEvents(data.events || []);
      } catch {
        toast.error("Failed to load upcoming lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleCancel = async (eventId: string) => {
    try {
      const res = await fetch(
        `/api/lessons/cancel?eventId=${encodeURIComponent(eventId)}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Lesson cancelled");
        setEvents((prev) => prev.filter((event) => event.id !== eventId));
      } else {
        toast.error("Failed to cancel the lesson");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleReschedule = (eventId: string) => {
    localStorage.setItem("rescheduleEventId", eventId);
    router.push("/booking");
  };

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Welcome back{name ? `, ${name}` : "!"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            You are logged in as <span className="font-mono">{email}</span>
          </p>
          <p>
            Here you’ll be able to book lessons, manage your profile, and more.
          </p>

          <div className="pt-4">
            <h2 className="text-base font-semibold text-foreground mb-2">
              Your upcoming lessons
            </h2>

            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : events.length > 0 ? (
              <ul className="space-y-4">
                {events.map((event) => {
                  const startDate = event.start?.dateTime || event.start?.date;
                  const endDate = event.end?.dateTime || event.end?.date;

                  return (
                    <li
                      key={event.id}
                      className="p-4 border rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          Lesson with Lamia
                        </p>
                        <p className="text-sm">
                          {startDate && endDate ? (
                            <>
                              {format(new Date(startDate), "PPPpp")} –{" "}
                              {format(new Date(endDate), "pp")}
                            </>
                          ) : (
                            <span className="text-red-500">Invalid date</span>
                          )}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {startDate && (
                          <JoinButton eventId={event.id} start={startDate} />
                        )}
                        <Button
                          variant="outline"
                          onClick={() => handleReschedule(event.id)}
                        >
                          Reschedule
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleCancel(event.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-muted-foreground">No lessons booked yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
