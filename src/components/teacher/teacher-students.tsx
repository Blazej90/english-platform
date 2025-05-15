"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
};

export function TeacherStudents() {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "student");

      if (error) {
        console.error("❌ Error fetching students:", error);
      } else {
        setStudents(data || []);
      }

      setLoading(false);
    };

    fetchStudents();
  }, []);

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Students</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading students...</p>
        ) : students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="py-2">{student.name || "–"}</td>
                  <td className="py-2">{student.email}</td>
                  <td className="py-2">
                    {new Date(student.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
