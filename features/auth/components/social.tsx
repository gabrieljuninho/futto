"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

import { useLoadingStore } from "@/stores/loading";

import { Button } from "@/components/ui/button";

const Social = () => {
  const { isLoading } = useLoadingStore();

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant={"outline"}
        className="w-full hover:bg-secondary/80"
        disabled={isLoading}
      >
        <FcGoogle className="h-5 w-5" />
        <span>Sign in with Google</span>
      </Button>
      <Button
        variant={"outline"}
        className="w-full hover:bg-secondary/80"
        disabled={isLoading}
      >
        <FaGithub className="h-5 w-5" />
        <span>Sign in with Github</span>
      </Button>
    </div>
  );
};

export default Social;
