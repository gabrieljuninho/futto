"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Axios } from "@/lib/axios";

import { RegisterSchema } from "@/schemas/auth";

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

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  const { isLoading, setIsLoading } = useLoadingStore();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);

    try {
      const response = await Axios.post("/users", values);

      if (response.data.status === 400 || response.data.status === 500) {
        setErrorMessage(response.data.message);
      } else if (response.data.status === 201) {
        router.push("/login");
      } else {
        setErrorMessage("An error occurred");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Something went wrong, please try again");
      }
    }

    setIsLoading(false);
  };

  return (
    <Layouts
      backButtonHref="/login"
      backButtonLabel="Already have an account?"
      type="Sign up"
    >
      {errorMessage && (
        <div className="mb-4">
          <Alert
            variant={"destructive"}
            className="[&>svg+div]:translate-y-[0] [&>svg]:top-[1.125rem]"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="futto"
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
              "Create an account"
            )}
          </Button>
        </form>
      </Form>
    </Layouts>
  );
};

export default SignUpForm;
