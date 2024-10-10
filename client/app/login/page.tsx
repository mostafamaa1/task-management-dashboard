// "use client";

// import { FormEvent, useEffect, useState } from  "react";
// import { signIn } from  "next-auth/react";
// import { useRouter } from  "next/navigation";
// import  Link  from  "next/link";
// import { useSession } from  'next-auth/react';
// import { BiLogoGoogle } from  'react-icons/bi';
// import { BiSolidShow } from  'react-icons/bi';
// import { BiSolidHide } from  'react-icons/bi';
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// const  Signin = () => {
// const [error, setError] = useState("");
// const [showPassword, setShowPassword] = useState(false);
// const router = useRouter();

// const labelStyles = "w-full text-sm text-white";

//  // Check the session server-side
// //  const checkSession = async () => {
// //     const session = await getServerSession(authOptions);
// //     if (session?.user) {
// //       router.push("/");
// //     }
// //   };

// //   // Call session check on component mount
// //   useEffect(() => {
// //     checkSession();
// //   }, []);

// const { data: session } = useSession();

// useEffect(() => {
//     if (session?.user) {
//         router.push("/");
//     }
// }, [session, router]);

// const  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
// event.preventDefault();
// const formData = new  FormData(event.currentTarget);
// const res = await signIn("credentials", {
// email: formData.get("email"),
// password: formData.get("password"),
// redirect: false,
// });

// if (res?.error) {
// setError(res.error  as  string)
// };

// if (!res?.error) {
// return router.push("/")
// };
// };

// return (
// <section className="w-full h-screen flex items-center justify-center">
// <form
// className="p-6 xs:p-10 w-full max-w-[350px] flex flex-col justify-between items-center gap-2.5
// border border-solid border-[#242424] bg-[#0a0a0a] rounded"
// onSubmit={handleSubmit}
// >
// {error && <div className="text-red-500">{error}</div>}
// <h1 className="mb-5 w-full text-white text-2xl font-bold">Signin</h1>

// <label className={labelStyles}>Email:</label>
// <input
// type="email"
// placeholder="Email"
// className="w-full h-8 border border-solid border-[#242424] py-1 px-2.5 rounded bg-white text-[13px]"
// name="email"
// />

// <label className={labelStyles}>Password:</label>
// <div className="flex w-full">
// <input
// type={showPassword ? "text" : "password"}
// placeholder="Password"
// className="w-full h-8 border border-solid border-[#242424] py-1 px-2.5 rounded-l bg-white text-[13px]"
// name="password"
// />
// <button
// className="w-2/12 border-y border-r border-solid border-[#242424] bg-white rounded-r
// flex items-center justify-center transition duration-150 ease hover:bg-[#888]"
// onClick={(e) => {
// e.preventDefault();
// setShowPassword(!showPassword)
// }}
// >
// {showPassword ? <BiSolidHide /> : <BiSolidShow />}
// </button>
// </div>
// <button className="w-full bg-white border border-solid border-[#242424] py-1.5 mt-2.5 rounded
// transition duration-150 ease hover:bg-[#747373] text-[13px]"
// >
// Login
// </button>

// <div className="w-full h-10 relative flex items-center justify-center">
// <div className="absolute h-px w-full top-2/4 bg-[#242424]"></div>
// <p className="w-8 h-6 bg-[#0a0a0a] z-10 text-white flex items-center justify-center">or</p>
// </div>
// <Link href="/register" className="text-sm text-white transition duration-150 ease hover:text-[#888]">
// Don&apos;t have an account?
// </Link>
// </form>
// </section>
// );
// }

// export  default  Signin;

"use client";

import Link from "next/link";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast"; // Import useToast hook

function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast(); // Initialize toast hook

  // Handle form input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  // Redirect if already logged in
  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);

  // Handle form submission with NextAuth signIn method
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email: loginInfo.email,
      password: loginInfo.password,
      redirect: false, // Avoid automatic redirects, handle it manually
    });

    if (res?.error) {
      toast({
        title: "Login Failed",
        description: res.error, // Display the error message from NextAuth
        variant: "default",
        className: "bg-red-400 text-black",
        duration: 1500,
      });
    } else {
      toast({
        title: "Login Successful",
        description: "You are now logged in.",
        variant: "default",
        className: "bg-green-400 text-black",
        duration: 1500,
      });
      router.push("/"); // Redirect to home if login succeeds
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-muted">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login Your Account
          </CardTitle>
          <CardDescription className="text-center">
            Task Management Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={submitForm}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                name="password"
                autoComplete="on"
                onChange={handleChange}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Sign In
            </Button>
          </form>
          <div className="pt-4">
            <p className="text-center">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;


