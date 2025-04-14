"use client";

import Image from "next/image";
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

      <section className="flex flex-col md:flex-row gap-10 items-center md:items-start">
        <div className="w-full md:w-[360px] flex-shrink-0 text-center space-y-3">
          <div className="w-full md:w-[360px] mx-auto">
            <Image
              src="/images/teacher.jpg"
              alt="English teacher"
              width={360}
              height={480}
              className="rounded-lg shadow-md w-full h-auto"
              priority
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Lamia Oosthuzein – Johannesburg, SA
          </p>
        </div>

        <Card className="w-full">
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
              Lessons are crafted to support every student&apos;s social,
              emotional, cognitive, and physical growth. We&apos;re skilled in
              tailoring instruction to each learner&apos;s needs, helping them
              reach their full potential.
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
          <CardContent className="text-muted-foreground text-base leading-relaxed">
            <ul className="space-y-3 pl-4">
              {[
                "Preparing lessons aligned with IEB and CAPS curricula.",
                "Creating detailed and personalized lesson plans.",
                "Assessing progress and providing ongoing feedback to parents.",
                "Adapting teaching methods to meet individual learning styles.",
                "Building strong study habits and independent learning skills.",
                "Identifying academic challenges and offering guided support.",
                "Preparing students thoroughly for upcoming exams.",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
