"use client"; // Indicates that this page should be rendered on the client-side

import Link from "next/link"; // Importing Link for client-side navigation
import { useEffect, useState } from "react"; // Importing React hooks for state management and side effects
import { Button } from "@/components/ui/button"; // Importing Button component
import { Input } from "@/components/ui/input"; // Importing Input component
import { Label } from "@/components/ui/label"; // Importing Label component
import { useRouter } from "next/navigation"; // Importing useRouter for client-side routing
import { useToast } from "@/hooks/use-toast"; // Importing useToast hook for toast notifications
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Importing Card components
import { signIn, useSession } from "next-auth/react"; // Importing signIn function and useSession hook for authentication
import axios, { AxiosError } from "axios"; // Importing axios for HTTP requests and AxiosError for error handling

function Page() {
  const router = useRouter(); // Initializing useRouter for client-side routing
  const { toast } = useToast(); // Initializing toast hook for notifications
  const [loading, setLoading] = useState(false); // Initializing state for loading indicator
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  }); // Initializing state for registration information

  const { data: session } = useSession(); // Using useSession hook to get the current session

  const handleChange = (e: any) => {
    const { name, value } = e.target; // Extracting input name and value
    setRegisterInfo({ ...registerInfo, [name]: value }); // Updating registerInfo state with new input values
  };

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (session) {
      router.push("/"); // Redirecting to the home page if the user is already logged in
    }
  }, [session, router]);

  const submitForm = async (e: any) => {
    e.preventDefault(); // Preventing the default form submission behavior

    if (registerInfo.password !== registerInfo.cpassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
        duration: 1500,
      }); // Displaying a toast notification for password mismatch
      return;
    }

    try {
      setLoading(true); // Setting loading indicator to true
      const res = await axios.post("/api/auth/signup", {
        name: registerInfo.name,
        email: registerInfo.email,
        password: registerInfo.password,
      }); // Sending a POST request to the signup API

      if (res.status === 200) {
        toast({
          title: "Account Created",
          description: "Redirecting to login...",
          variant: "default",
          className: "bg-green-400 text-black",
          duration: 1500,
        }); // Displaying a toast notification for successful account creation

        // Automatically sign in the user
        const signInRes = await signIn("credentials", {
          email: registerInfo.email,
          password: registerInfo.password,
          redirect: false,
        }); // Attempting to sign in the user

        if (signInRes?.ok) {
          router.push("/"); // Redirecting to the home page if sign in is successful
        } else {
          router.push("/login"); // Redirecting to the login page if sign in fails
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        toast({
          title: "Error",
          description: errorMessage || "Failed to create account",
          variant: "destructive",
          className: "bg-red-400 text-black",
          duration: 1500,
        }); // Displaying a toast notification for account creation failure
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
          className: "bg-red-400 text-black",
          duration: 1500,
        }); // Displaying a toast notification for unknown error
      }
    } finally {
      setLoading(false); // Setting loading indicator to false after the operation
    }
  };

  if (session) return null; // Returning null if the user is already logged in
  else
    return (
      <div className="flex items-center px-5 justify-center min-h-screen bg-muted">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Register Your Account</CardTitle>
            <CardDescription className="text-center">Task Management Dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={submitForm}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Enter your Name"
                  name="name"
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleChange}
                  required
                  autoComplete="off"
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
              <div className="space-y-2">
                <Label htmlFor="cpassword">Confirm Password</Label>
                <Input
                  id="cpassword"
                  type="password"
                  placeholder="Confirm your password"
                  name="cpassword"
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
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
            <div className="pt-4">
              <p className="text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
}

export default Page;

