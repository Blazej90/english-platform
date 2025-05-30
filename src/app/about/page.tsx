"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackgroundGradient } from "@/components/ui/gradient-bg";
import { TypewriterEffectLoop } from "@/components/ui/typewriter-effect";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background py-8 px-2 sm:px-6">
      <BackgroundGradient className="w-full max-w-4xl mx-auto">
        <Card className="w-full shadow-xl rounded-2xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-none">
          <CardContent className="p-6 md:p-10 space-y-12">
            <div className="text-center mb-2">
              <TypewriterEffectLoop
                words={[
                  {
                    text: "Online English",
                    className: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    text: "& Afrikaans",
                    className: "text-emerald-600 dark:text-emerald-400",
                  },
                  {
                    text: "Tutoring",
                    className: "text-yellow-500 dark:text-yellow-300",
                  },
                ]}
                className="!text-3xl sm:!text-4xl md:!text-5xl font-bold"
                cursorClassName="bg-emerald-500"
              />
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-3">
                Personalized one-on-one lessons for students of all ages —
                worldwide.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
              <div className="w-full md:w-[340px] flex-shrink-0 text-center space-y-3">
                <div className="w-full md:w-[340px] mx-auto relative rounded-lg overflow-hidden">
                  <Image
                    src="/images/teacher.jpg"
                    alt="English teacher"
                    width={340}
                    height={460}
                    className="rounded-lg shadow-lg w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 rounded-lg pointer-events-none border-2 border-transparent bg-gradient-to-br from-blue-300/30 to-emerald-400/20" />
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Lamia Oosthuzein
                  </span>{" "}
                  – Johannesburg, SA
                </p>
              </div>
              <Card className="w-full bg-transparent border-none shadow-none p-0">
                <CardHeader className="px-0 pb-2">
                  <motion.h2
                    className="text-2xl font-semibold"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    Our Approach
                  </motion.h2>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed px-0">
                  {[
                    <>
                      <strong className="text-emerald-700 dark:text-emerald-300">
                        Online Tutoring For All
                      </strong>{" "}
                      is dedicated to delivering individualized support for
                      every student. We create a professional and nurturing
                      learning environment where students can thrive both
                      academically and personally.
                    </>,
                    <>
                      Our team plans and implements lessons that are both
                      developmentally and age-appropriate. After each session,
                      students receive feedback — and for school-aged learners,
                      detailed feedback is also shared with parents.
                    </>,
                    <>
                      Lessons are crafted to support every student's social,
                      emotional, cognitive, and physical growth. We're skilled
                      in tailoring instruction to each learner's needs, helping
                      them reach their full potential.
                    </>,
                  ].map((el, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.95, delay: 0.18 + i * 0.15 }}
                      viewport={{ once: true, amount: 0.25 }}
                    >
                      {el}
                    </motion.p>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="w-full bg-transparent border-none shadow-none p-0">
              <CardHeader className="px-0 pb-2">
                <motion.h2
                  className="text-2xl font-semibold"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.25 }}
                >
                  What We Offer for School-Aged Students
                </motion.h2>
              </CardHeader>
              <CardContent className="text-muted-foreground text-base leading-relaxed px-0">
                <motion.ul
                  className="space-y-3 pl-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.28 } },
                  }}
                >
                  {[
                    "Preparing lessons aligned with IEB and CAPS curricula.",
                    "Creating detailed and personalized lesson plans.",
                    "Assessing progress and providing ongoing feedback to parents.",
                    "Adapting teaching methods to meet individual learning styles.",
                    "Building strong study habits and independent learning skills.",
                    "Identifying academic challenges and offering guided support.",
                    "Preparing students thoroughly for upcoming exams.",
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-2"
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.85, ease: "easeOut" },
                        },
                      }}
                    >
                      <span className="mt-1 text-emerald-500 dark:text-emerald-400 text-xl">
                        •
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </BackgroundGradient>
    </div>
  );
}
