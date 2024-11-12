import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import Social from "@/features/auth/components/social";

import { PropsWithChildren } from "@/types";

type LayoutsProps = PropsWithChildren & {
  backButtonLabel: string;
  backButtonHref: string;
  type: "Sign in" | "Sign up";
};

const Layouts: FC<LayoutsProps> = ({
  backButtonHref,
  backButtonLabel,
  children,
  type,
}) => {
  return (
    <div className="w-full max-w-full select-none p-4">
      <div className="p-4 sm:mx-auto sm:my-0 sm:w-[40rem] sm:p-12 sm:pt-6">
        <div className="mb-6 flex items-center justify-center">
          <div className="h-16 w-16">
            <Image
              src={"/assets/images/logo.png"}
              alt="Logo"
              width={500}
              height={500}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
        {children}
        <div className="relative my-8">
          <Separator />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-center text-sm leading-none">
            Or
          </div>
        </div>
        <div className="mt-4">
          <Social />
        </div>
        <div className="mt-6 px-0 text-center text-sm font-normal italic sm:px-16">
          By signing {type === "Sign up" ? "up" : "in"}, you are agreeing to our{" "}
          <Link href="/privacy" className="text-link hover:underline">
            privacy policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-link hover:underline">
            terms of use
          </Link>
          .
        </div>
        <Separator className="my-6" />
        <p className="text-center text-sm font-normal sm:leading-normal">
          {backButtonLabel}{" "}
          <Link href={backButtonHref} className="text-link hover:underline">
            {type === "Sign up" ? "Log in" : "Create an account"}
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Layouts;
