"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAdmin";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid business email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isLoading } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <RedirectIfAuthenticated>
      <div className="relative flex min-h-screen items-center justify-center bg-white px-4 py-12 dark:bg-slate-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-blue-50/50 blur-[120px] dark:bg-blue-900/20" />
          <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-indigo-50/50 blur-[120px] dark:bg-indigo-900/20" />
        </div>

        <Card className="z-10 w-full max-w-105 border-none shadow-2xl shadow-blue-500/5 ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="space-y-4 pt-8 text-center">
            <div className="flex justify-center">
              <div className=" bg-white">
                <Image
                  src="/logo.jpg"
                  alt="Soul Dunes Logo"
                  width={64}
                  height={64}
                  className="h-24 w-24 object-contain"
                  priority
                />
              </div>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight">Login to your account</CardTitle>
              <CardDescription className="text-slate-500">
                Enter your email and password to login
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="pb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 dark:text-slate-300">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="admin@souldunes.com"
                            className="h-11 transition-all"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[12px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-slate-700 dark:text-slate-300">Password</FormLabel>

                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="h-11 transition-all "
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <div className="flex items-center justify-end">
                        <Link
                          href="/forgot-password"
                          className="text-xs font-medium text-blue-600 hover:text-blue-500 underline-offset-4 hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormMessage className="text-[12px]" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Sign in to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

        </Card>
      </div>
    </RedirectIfAuthenticated>
  );
}