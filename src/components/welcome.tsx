"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CalendarEvent {
  id?: string;
  summary?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

export function Welcome() {
  const { user, isLoaded } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const name = user?.firstName;
  const router = useRouter();

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

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

  const cancelLesson = async (eventId: string) => {
    try {
      const res = await fetch(`/api/lessons/cancel?eventId=${eventId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Lesson cancelled");
        setEvents((prev) => prev.filter((e) => e.id !== eventId));
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to cancel");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
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
                {events.map((event) => (
                  <li
                    key={event.id}
                    className="p-4 border rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        Lesson with Lamia
                      </p>
                      <p className="text-sm">
                        {format(
                          new Date(
                            event.start.dateTime || event.start.date || ""
                          ),
                          "PPPpp"
                        )}{" "}
                        –{" "}
                        {format(
                          new Date(event.end.dateTime || event.end.date || ""),
                          "pp"
                        )}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => router.push("/booking")}
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => event.id && cancelLesson(event.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </li>
                ))}
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
