"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Online English & Afrikaans Tutoring
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Personalized one-on-one lessons for students of all ages — worldwide.
        </p>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Our Approach</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
            <p>
              <strong>Online Tutoring For All</strong> is dedicated to
              delivering individualized support for every student. We create a
              professional and nurturing learning environment where students can
              thrive both academically and personally.
            </p>
            <p>
              Our team plans and implements lessons that are both
              developmentally and age-appropriate. After each session, students
              receive feedback — and for school-aged learners, detailed feedback
              is also shared with parents.
            </p>
            <p>
              Lessons are crafted to support every student's social, emotional,
              cognitive, and physical growth. We're skilled in tailoring
              instruction to each learner’s needs, helping them reach their full
              potential.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              What We Offer for School-Aged Students
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
            <ul className="list-disc list-inside space-y-2">
              <li>Preparing lessons aligned with IEB and CAPS curricula.</li>
              <li>Creating detailed and personalized lesson plans.</li>
              <li>
                Assessing progress and providing ongoing feedback to parents.
              </li>
              <li>
                Adapting teaching methods to meet individual learning styles.
              </li>
              <li>
                Building strong study habits and independent learning skills.
              </li>
              <li>
                Identifying academic challenges and offering guided support.
              </li>
              <li>Preparing students thoroughly for upcoming exams.</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
