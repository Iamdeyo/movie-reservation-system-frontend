"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

// Define the form schema with zod
const formSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  function onSubmit(values: FormValues) {
    console.log("Registration attempt with:", values);
    // Add your registration logic here
    // On success, redirect to login or dashboard
    // router.push('/login')
  }

  return (
    <div className="flex h-svh">
      <div className="bg-[#020700] md:flex h-full hidden relative flex-1 overflow-hidden p-5">
        <div className="bg-main blur-[140px] lg:blur-[200px] w-[240px] lg:w-[448px] aspect-square rounded-full absolute top-0 -translate-y-[15%] right-0 translate-x-[30%] "></div>
        <div className="bg-main blur-[140px] lg:blur-[200px] w-[240px] lg:w-[448px] aspect-square rounded-full absolute bottom-0 translate-y-[15%] left-0 -translate-x-[30%] "></div>
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="logo" width={131} height={49} />
        </Link>
      </div>
      <div className="h-full p-5 w-full md:max-w-lg lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl overflow-y-auto">
        <div className="relative min-h-[650px] flex flex-col justify-center items-center">
          <Link href={"/"} className="absolute md:hidden  left-0 top-0">
            <Image src={"/logo.png"} alt="logo" width={131} height={49} />
          </Link>
          <div className="h-16"></div>
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold tracking-tight mb-5">
              Create an account
            </h2>

            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-gray-600">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="balamia@gmail.com"
                            className="h-12 px-4"
                            {...field}
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
                      <FormItem className="space-y-2">
                        <FormLabel className="text-gray-600">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="h-12 px-4 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                              {showPassword ? (
                                <EyeOffIcon className="h-5 w-5" />
                              ) : (
                                <EyeIcon className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-gray-600">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              className="h-12 px-4 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                              {showConfirmPassword ? (
                                <EyeOffIcon className="h-5 w-5" />
                              ) : (
                                <EyeIcon className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-12 text-white">
                    Create account
                  </Button>

                  <div className="text-center pt-2">
                    <p className="text-gray-400 text-sm">
                      Already Have An Account?{" "}
                      <Link
                        href="/login"
                        className="text-main hover:text-emerald-500"
                      >
                        Log in
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
