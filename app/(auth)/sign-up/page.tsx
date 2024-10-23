"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomInput from "@/components/CustomInput";

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (res.ok) {
        alert("User created successfully");
        router.push("/");
      } else {
        alert("Error creating user");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex-center size-full max-sm:px-6">
      <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
          <Link href="/" className="cursor-pointer flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Horizon logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Horizon
            </h1>
          </Link>
          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              Sign Up
              <p className="text-16 font-normal text-gray-600">
                Please enter your details
              </p>
            </h1>
          </div>
        </header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomInput
              control={form.control}
              name="name"
              label="Username"
              placeholder="Enter your first name"
            />
            <CustomInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
            <CustomInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
            />
            <div className="flex flex-col gap-4">
              <Button type="submit" disabled={isLoading} className="form-btn">
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <footer className="flex justify-center gap-1">
          <p className="text-14 font-normal text-gray-600">
            Already have an account?
          </p>
          <Link href="/sign-in" className="form-link">
            Sign in
          </Link>
        </footer>
      </section>
    </section>
  );
};

export default SignUp;
