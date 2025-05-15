"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Lesson = {
  id: string;
  summary?: string;
  start: string;
  end: string;
  studentEmail?: string;
  status?: string;
};

export function TeacherHistory() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/teacher-lessons");
        const data = await res.json();
        setLessons(data.lessons || []);
      } catch {
        setLessons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Lesson History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : lessons.length > 0 ? (
            <ul className="space-y-2">
              {lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="p-3 border rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <p className="font-medium">{lesson.summary || "Lesson"}</p>
                    <p className="text-xs">
                      {lesson.start &&
                      !isNaN(new Date(lesson.start).getTime()) ? (
                        format(new Date(lesson.start), "PPPpp")
                      ) : (
                        <span className="text-red-500">Invalid date</span>
                      )}
                    </p>
                    {lesson.studentEmail && (
                      <p className="text-xs text-muted-foreground">
                        {lesson.studentEmail}
                      </p>
                    )}
                  </div>
                  <div className="text-xs font-semibold">
                    {lesson.status === "cancelled"
                      ? "Cancelled"
                      : lesson.start && new Date(lesson.start) < new Date()
                      ? "Completed"
                      : "Planned"}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No lessons found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
