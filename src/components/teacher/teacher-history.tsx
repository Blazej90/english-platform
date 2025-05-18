"use client";

import { useEffect, useState } from "react";
import { format, isBefore, isAfter, isWithinInterval } from "date-fns";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Lesson = {
  id: string;
  summary?: string;
  start: string;
  end: string;
  studentEmail?: string;
  status?: string;
};

type FilterType = "all" | "future" | "completed" | "inprogress";

function getNameFromEmail(email?: string) {
  if (!email) return "";
  const base = email.split("@")[0];
  return base.charAt(0).toUpperCase() + base.slice(1);
}

export function TeacherHistory() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const now = new Date();
  const filteredLessons = lessons.filter((lesson) => {
    const start = new Date(lesson.start);
    const end = new Date(lesson.end);
    if (filter === "future") return isAfter(start, now);
    if (filter === "completed") return isBefore(end, now);
    if (filter === "inprogress") return isWithinInterval(now, { start, end });
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error("No lessons selected to delete.");
      return;
    }
    const res = await fetch("/api/teacher-lessons", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedIds }),
    });
    if (res.ok) {
      toast.success("Lessons deleted.");
      setLessons((prev) => prev.filter((l) => !selectedIds.includes(l.id)));
      setSelectedIds([]);
    } else {
      toast.error("Failed to delete lessons.");
    }
  };

  const dropdownMenuClasses =
    "bg-[#18181b] border border-white/10 text-white shadow-xl";

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-3xl bg-black border-white/10">
        <CardHeader>
          <CardTitle className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>Lesson History</span>
            <div className="flex gap-2 items-center">
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#18181b] text-white border-white/10"
                  >
                    {(() => {
                      switch (filter) {
                        case "all":
                          return "All lessons";
                        case "future":
                          return "Upcoming";
                        case "completed":
                          return "Completed";
                        case "inprogress":
                          return "Ongoing";
                        default:
                          return "Filter";
                      }
                    })()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={dropdownMenuClasses}
                  align="end"
                >
                  <DropdownMenuItem onClick={() => setFilter("all")}>
                    All lessons
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("future")}>
                    Upcoming
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("inprogress")}>
                    Ongoing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("completed")}>
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="destructive"
                size="sm"
                disabled={selectedIds.length === 0}
                onClick={handleDelete}
              >
                Delete selected
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : filteredLessons.length > 0 ? (
            <ul className="space-y-2">
              {filteredLessons.map((lesson) => {
                const start = new Date(lesson.start);
                const end = new Date(lesson.end);
                let status: string;
                if (isWithinInterval(now, { start, end })) status = "Ongoing";
                else if (isBefore(end, now)) status = "Completed";
                else status = "Upcoming";

                let who = lesson.summary;
                if (
                  lesson.summary?.toLowerCase().includes("lesson with lamia") &&
                  lesson.studentEmail
                ) {
                  who = `Lesson with ${getNameFromEmail(lesson.studentEmail)}`;
                }

                return (
                  <li
                    key={lesson.id}
                    className="p-3 border rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-[#101013] border-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedIds.includes(lesson.id)}
                        onCheckedChange={() => toggleSelect(lesson.id)}
                        id={`lesson-${lesson.id}`}
                      />
                      <div>
                        <p className="font-medium">{who || "Lesson"}</p>
                        <p className="text-xs">
                          {format(new Date(lesson.start), "PPPpp")} –{" "}
                          {format(new Date(lesson.end), "pp")}
                        </p>
                        {lesson.studentEmail && (
                          <p className="text-xs text-muted-foreground">
                            {lesson.studentEmail}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-xs font-semibold">{status}</div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No lessons found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
