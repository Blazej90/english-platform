"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JoinAsTeacherButton } from "@/components/teacher/join-as-teacher-button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

type Lesson = {
  id: string;
  summary?: string;
  start: string;
  end: string;
  studentEmail?: string;
};

export function UpcomingTeacherLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLessons() {
      setLoading(true);
      try {
        const res = await fetch("/api/teacher-lessons");
        const data = await res.json();
        const now = new Date();
        const futureLessons = (data.lessons || []).filter(
          (l: Lesson) => new Date(l.start) > now
        );
        setLessons(futureLessons);
      } catch {
        setLessons([]);
      } finally {
        setLoading(false);
      }
    }
    fetchLessons();
  }, []);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Upcoming lessons</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-full" />
        ) : lessons.length === 0 ? (
          <div className="text-muted-foreground">No upcoming lessons.</div>
        ) : (
          <ul className="space-y-3">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between border-b py-2"
              >
                <div>
                  <div className="font-medium">
                    {lesson.summary || "Lesson"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {lesson.start
                      ? format(new Date(lesson.start), "PPP p")
                      : "No date"}{" "}
                    {lesson.studentEmail && <>• {lesson.studentEmail}</>}
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <JoinAsTeacherButton eventId={lesson.id} lesson={lesson} />
                </div>
                <div>Button placeholder</div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
