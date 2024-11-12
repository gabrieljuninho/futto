/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { useLoadingStore } from "@/stores/loading";

import { Button } from "@/components/ui/button";

const Social = () => {
  const urlParams = useSearchParams();
  const callBackUrl = urlParams.get("callbackUrl");

  const handleClick = (provider: "google" | "github") => {
    signIn(provider), { callbackUrl: callBackUrl || DEFAULT_LOGIN_REDIRECT };
  };

  const { isLoading } = useLoadingStore();

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant={"outline"}
        className="w-full hover:bg-secondary/80"
        onClick={() => handleClick("google")}
        disabled={isLoading}
      >
        <FcGoogle className="h-5 w-5" />
        <span>Sign in with Google</span>
      </Button>
      <Button
        variant={"outline"}
        className="w-full hover:bg-secondary/80"
        onClick={() => handleClick("github")}
        disabled={isLoading}
      >
        <FaGithub className="h-5 w-5" />
        <span>Sign in with Github</span>
      </Button>
    </div>
  );
};

export default Social;
