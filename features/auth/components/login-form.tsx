"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/actions/login";

import { LoginSchema } from "@/schemas/auth";

import { useLoadingStore } from "@/stores/loading";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Layouts from "@/features/auth/components/layouts";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const urlParams = useSearchParams();
  const callBackUrl = urlParams.get("callbackUrl");
  const errorUrlParam =
    urlParams.get("error") === "OAuthAccountNotLinked"
      ? "This account is already linked to a user. Please sign in with a different account."
      : "";

  const errorMessages = errorMessage || errorUrlParam;

  const { isLoading, setIsLoading } = useLoadingStore();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);

    login(values, callBackUrl)
      .then((data) => {
        if (data?.error) {
          form.reset();

          setErrorMessage(data.error);
        }
        if (data?.success) {
          form.reset();
        }
      })
      .catch(() => {
        setErrorMessage("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });

    setIsLoading(false);
  };

  return (
    <Layouts
      backButtonHref="/signup"
      backButtonLabel="Don't have an account?"
      type="Sign in"
    >
      {errorMessages && (
        <div className="mb-4">
          <Alert
            variant={"destructive"}
            className="[&>svg+div]:translate-y-[0] [&>svg]:top-[1.125rem]"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessages}</AlertDescription>
          </Alert>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="futto@example.com"
                    autoComplete="off"
                    className="text-sm"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="******"
                    autoComplete="off"
                    className="text-sm"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-sm" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
      </Form>
    </Layouts>
  );
};

export default LoginForm;
