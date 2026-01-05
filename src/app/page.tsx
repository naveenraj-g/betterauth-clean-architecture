"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/modules/client/auth/auth-client";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-6 px-4 max-w-md mx-auto">
      <div className="text-center space-y-6">
        {session ? (
          <>
            <div className="text-2xl">Welcome {session.user.name}</div>
            <Button variant="destructive">Sign Out</Button>
          </>
        ) : (
          <>
            <div className="text-2xl">You are not logged in</div>
            <Button asChild size="lg">
              <Link href="/auth/login">Sign In / Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
