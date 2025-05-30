// "use client";

// import Image from "next/image";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function AboutPage() {
//   return (
//     <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
//       <section className="text-center space-y-4">
//         <h1 className="text-4xl md:text-5xl font-bold">
//           Online English & Afrikaans Tutoring
//         </h1>
//         <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//           Personalized one-on-one lessons for students of all ages — worldwide.
//         </p>
//       </section>

//       <section className="flex flex-col md:flex-row gap-10 items-center md:items-start">
//         <div className="w-full md:w-[360px] flex-shrink-0 text-center space-y-3">
//           <div className="w-full md:w-[360px] mx-auto">
//             <Image
//               src="/images/teacher.jpg"
//               alt="English teacher"
//               width={360}
//               height={480}
//               className="rounded-lg shadow-md w-full h-auto"
//               priority
//             />
//           </div>
//           <p className="text-sm text-muted-foreground">
//             Lamia Oosthuzein – Johannesburg, SA
//           </p>
//         </div>

//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle className="text-2xl">Our Approach</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
//             <p>
//               <strong>Online Tutoring For All</strong> is dedicated to
//               delivering individualized support for every student. We create a
//               professional and nurturing learning environment where students can
//               thrive both academically and personally.
//             </p>
//             <p>
//               Our team plans and implements lessons that are both
//               developmentally and age-appropriate. After each session, students
//               receive feedback — and for school-aged learners, detailed feedback
//               is also shared with parents.
//             </p>
//             <p>
//               Lessons are crafted to support every student&apos;s social,
//               emotional, cognitive, and physical growth. We&apos;re skilled in
//               tailoring instruction to each learner&apos;s needs, helping them
//               reach their full potential.
//             </p>
//           </CardContent>
//         </Card>
//       </section>

//       <section>
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-2xl">
//               What We Offer for School-Aged Students
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="text-muted-foreground text-base leading-relaxed">
//             <ul className="space-y-3 pl-4">
//               {[
//                 "Preparing lessons aligned with IEB and CAPS curricula.",
//                 "Creating detailed and personalized lesson plans.",
//                 "Assessing progress and providing ongoing feedback to parents.",
//                 "Adapting teaching methods to meet individual learning styles.",
//                 "Building strong study habits and independent learning skills.",
//                 "Identifying academic challenges and offering guided support.",
//                 "Preparing students thoroughly for upcoming exams.",
//               ].map((item, idx) => (
//                 <li key={idx} className="flex items-start gap-2">
//                   <span className="mt-1 text-primary">•</span>
//                   <span>{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </CardContent>
//         </Card>
//       </section>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
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
                  <CardTitle className="text-2xl font-semibold">
                    Our Approach
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed px-0">
                  <p>
                    <strong className="text-emerald-700 dark:text-emerald-300">
                      Online Tutoring For All
                    </strong>{" "}
                    is dedicated to delivering individualized support for every
                    student. We create a professional and nurturing learning
                    environment where students can thrive both academically and
                    personally.
                  </p>
                  <p>
                    Our team plans and implements lessons that are both
                    developmentally and age-appropriate. After each session,
                    students receive feedback — and for school-aged learners,
                    detailed feedback is also shared with parents.
                  </p>
                  <p>
                    Lessons are crafted to support every student&apos;s social,
                    emotional, cognitive, and physical growth. We&apos;re
                    skilled in tailoring instruction to each learner&apos;s
                    needs, helping them reach their full potential.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full bg-transparent border-none shadow-none p-0">
              <CardHeader className="px-0 pb-2">
                <CardTitle className="text-2xl font-semibold">
                  What We Offer for School-Aged Students
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-base leading-relaxed px-0">
                <ul className="space-y-3 pl-1">
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
                      <span className="mt-1 text-emerald-500 dark:text-emerald-400 text-xl">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </BackgroundGradient>
    </div>
  );
}
