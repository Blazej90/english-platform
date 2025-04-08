import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SSOCallbackPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex justify-center items-center h-screen text-xl">
      Logowanie trwa...
    </div>
  );
}
