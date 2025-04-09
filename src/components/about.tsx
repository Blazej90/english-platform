"use client";

import { useScroll } from "@/context/scroll-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function About() {
  const { aboutRef } = useScroll();

  return (
    <section ref={aboutRef} id="about" className="scroll-mt-24 mt-96">
      <Card className="max-w-3xl mx-auto mt-12">
        <CardHeader>
          <CardTitle className="text-2xl">Meet Lamia Oosthuzein</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4 text-base leading-relaxed">
          <p>
            Lamia Oosthuzein is a passionate English teacher from Johannesburg,
            South Africa.
          </p>
          <p>
            With several years of experience as a Native Speaker, she guides
            learners in mastering English through conversation, immersion, and
            personalized support.
          </p>
          <p>More details about Lamia will be shared soon — stay tuned!</p>
        </CardContent>
      </Card>
    </section>
  );
}
