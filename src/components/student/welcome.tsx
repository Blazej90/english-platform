"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { JoinButton } from "@/components/student/join-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackgroundGradient } from "@/components/ui/gradient-bg";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    if (isLoaded) {
      fetch("/api/sync-user", { method: "POST" });
    }
  }, [isLoaded]);

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
        { method: "DELETE" }
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background py-8">
      <BackgroundGradient className="max-w-2xl w-full mx-auto">
        <Card className="shadow-xl rounded-2xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-none w-full px-2 sm:px-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-1 tracking-tight">
              Welcome back{name ? `, ${name}` : "!"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-base text-muted-foreground">
            <p>
              You are logged in as <span className="font-mono">{email}</span>
            </p>
            <p>
              Here you can book lessons, join upcoming classes, or manage your
              profile.
            </p>
            <div className="pt-6">
              <h2 className="text-base font-semibold text-foreground mb-3">
                Your upcoming lessons
              </h2>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : events.length > 0 ? (
                <ScrollArea className="w-full h-80 max-h-96">
                  <ul className="space-y-4">
                    {events.map((event) => {
                      const startDate =
                        event.start?.dateTime || event.start?.date;
                      const endDate = event.end?.dateTime || event.end?.date;

                      return (
                        <li
                          key={event.id}
                          className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-sm border border-zinc-200 dark:border-zinc-800"
                        >
                          <div className="min-w-0">
                            <p className="font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                              Lesson with Lamia
                            </p>
                            <p className="text-sm truncate">
                              {startDate && endDate ? (
                                <>
                                  {format(new Date(startDate), "PPPpp")} –{" "}
                                  {format(new Date(endDate), "pp")}
                                </>
                              ) : (
                                <span className="text-red-500">
                                  Invalid date
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            {startDate && (
                              <JoinButton
                                eventId={event.id}
                                start={startDate}
                                className="rounded-xl bg-emerald-600 text-white font-semibold shadow-md hover:bg-emerald-700 transition w-full sm:w-auto"
                                size="sm"
                              >
                                Join
                              </JoinButton>
                            )}
                            <Button
                              variant="ghost"
                              className="rounded-xl border border-emerald-500 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900 transition font-semibold shadow w-full sm:w-auto"
                              size="sm"
                              onClick={() => handleReschedule(event.id)}
                            >
                              Reschedule
                            </Button>
                            <Button
                              variant="destructive"
                              className="rounded-xl font-semibold shadow hover:bg-red-700 transition w-full sm:w-auto"
                              size="sm"
                              onClick={() => handleCancel(event.id)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No lessons booked yet. Book your first session!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </BackgroundGradient>
    </div>
  );
}
