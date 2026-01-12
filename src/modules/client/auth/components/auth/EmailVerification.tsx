"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function EmailVerification() {
  return (
    <Card className="max-w-xl w-full">
      <CardHeader>
        <CardTitle className="text-xl">Verify Your Email</CardTitle>
        <CardDescription>
          We sent you a verification link. Please check your email and click the
          link to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="secondary" className="w-full">
          Resend Email
        </Button>
      </CardContent>
    </Card>
  );
}

export default EmailVerification;
