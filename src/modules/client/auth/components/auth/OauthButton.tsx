"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

type Props = {
  oauthName: "google" | "github";
  label: string;
  isFormSubmitting: boolean;
  className?: string;
};

const OauthButton = ({
  oauthName,
  label,
  isFormSubmitting,
  className,
}: Props) => {
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  return (
    <Button
      variant="outline"
      disabled={isAuthLoading || isFormSubmitting}
      className={cn(
        "flex-1 items-center justify-center cursor-pointer border-2",
        className
      )}
      onClick={async () => {
        setIsAuthLoading(true);
      }}
    >
      <span className="pointer-events-none">
        {!isAuthLoading ? (
          oauthName === "google" ? (
            <FcGoogle size={18} aria-hidden="true" />
          ) : (
            <FaGithub size={18} aria-hidden="true" />
          )
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </span>
      {label}
    </Button>
  );
};

export default OauthButton;
