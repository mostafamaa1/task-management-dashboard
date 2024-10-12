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
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>; // Initialize Socket.IO client

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
       // Connect to the socket server and emit the login event
       socket = io('http://localhost:3000');
       socket.emit("user:login", { name: loginInfo.email });
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


