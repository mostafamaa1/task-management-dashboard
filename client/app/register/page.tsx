// "use client";

// import { FormEvent, useEffect, useState } from "react";
// import axios, { AxiosError } from "axios";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { BiSolidShow } from "react-icons/bi";
// import { BiSolidHide } from "react-icons/bi";

// const Signup = () => {
//   const [error, setError] = useState();
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();
  
//   const labelStyles = "w-full text-sm text-white";

//   const { data: session } = useSession();

//   useEffect(() => {
//     if (session) {
//       router.push("/");
//     }
//   }, [session, router]);

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const formData = new FormData(event.currentTarget);
//       const signupResponse = await axios.post(
//         `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`,
//         {
//           email: formData.get("email"),
//           password: formData.get("password"),
//           name: formData.get("name"),
//         }
//       );

//       const res = await signIn("credentials", {
//         email: signupResponse.data.email,
//         password: formData.get("password"),
//         redirect: false,
//       });

//       if (res?.ok) return router.push("/");
//     } catch (error) {
//       console.log(error);
//       if (error instanceof AxiosError) {
//         const errorMessage = error.response?.data.message;
//         setError(errorMessage);
//       }
//     }
//   };

//   return (
//     <section className="w-full h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="p-6 xs:p-10 w-full max-w-[350px] flex flex-col justify-between items-center gap-2.5  
// border border-solid border-[#242424] bg-[#0a0a0a] rounded"
//       >
//         {error && <div className="">{error}</div>}
//         <h1 className="mb-5 w-full text-white text-2xl font-bold">Signup</h1>

//         <label className={labelStyles}>Fullname:</label>
//         <input
//           type="text"
//           placeholder="Fullname"
//           className="w-full h-8 border border-solid border-[#242424] py-1 px-2.5 rounded bg-white text-[13px]"
//           name="name"
//         />

//         <label className={labelStyles}>Email:</label>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full h-8 border border-solid border-[#242424] py-1 px-2.5 rounded bg-white text-[13px]"
//           name="email"
//         />

//         <label className={labelStyles}>Password:</label>
//         <div className="flex w-full">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             className="w-full h-8 border border-solid border-[#242424] py-1 px-2.5 rounded-l bg-white text-[13px]"
//             name="password"
//           />
//           <button
//             className="w-2/12 border-y border-r border-solid border-[#242424] bg-white rounded-r  
// flex items-center justify-center transition duration-150 ease hover:bg-[#1A1A1A]"
//             onClick={(e) => {
//               e.preventDefault();
//               setShowPassword(!showPassword);
//             }}
//           >
//             {showPassword ? <BiSolidHide /> : <BiSolidShow />}
//           </button>
//         </div>
//         <button
//           className="w-full bg-black border text-white border-solid border-[#242424] py-1.5 mt-2.5 rounded  
// transition duration-150 ease hover:bg-[#1A1A1A] text-[13px]"
//         >
//           Signup
//         </button>

//         <div className="w-full h-10 relative flex items-center justify-center">
//           <div className="absolute h-px w-full top-2/4 bg-[#242424]"></div>
//           <p className="w-8 h-6 bg-[#0a0a0a] text-white z-10 flex items-center justify-center">
//             or
//           </p>
//         </div>
//         <Link
//           href="/login"
//           className="text-sm text-white transition duration-150 ease hover:text-[#a5a2a2]"
//         >
//           Already have an account?
//         </Link>
//       </form>
//     </section>
//   );
// };

// export default Signup;

// "use client";

// import Link from "next/link";
// import { FormEvent, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useRouter } from "next/navigation";
// import { useToast } from "@/hooks/use-toast";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { signIn, useSession } from "next-auth/react"; // Import NextAuth
// import axios from "axios";

// const Register = () => {
//   const router = useRouter();
//   const { toast } = useToast();
//   const { data: session } = useSession(); // Check session
//   const [loading, setLoading] = useState(false);
//   const [registerInfo, setRegisterInfo] = useState({ name: "", email: "", password: "", cpassword: "" });

//   // Redirect if user is already logged in
//   useEffect(() => {
//     if (session) {
//       router.push("/");
//     }
//   }, [session, router]);

//   const handleChange = (e: any ) => {
//     const { name, value } = e.target;
//     setRegisterInfo({ ...registerInfo, [name]: value });
//   };

//   const submitForm = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Check for password match
//     if (registerInfo.password !== registerInfo.cpassword) {
//       toast({
//         title: "Error",
//         description: "Passwords do not match",
//         variant: "default",
//         className: "bg-red-400 text-black",
//         duration: 1500,
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       // Adjusted API endpoint for registration
//       const res = await axios.post("/api/auth/register", registerInfo);
//       const { success, message } = res.data;

//       if (success) {
//         toast({
//           title: "Account Created",
//           description: message,
//           variant: "default",
//           className: "bg-green-400 text-black",
//           duration: 1500,
//         });

//         // Automatically sign in the user after registration
//         const signInResponse = await signIn("credentials", {
//           email: registerInfo.email,
//           password: registerInfo.password,
//           redirect: false,
//         });

//         if (signInResponse?.ok) {
//           router.push("/");
//         }
//       } else {
//         toast({
//           title: "Error",
//           description: message,
//           variant: "default",
//           className: "bg-red-400 text-black",
//           duration: 1500,
//         });
//       }
//     } catch (error) {
//       // Handle error
//       toast({
//         title: "Error",
//         description: (error as Error).message || "Something went wrong",
//         variant: "default",
//         className: "bg-red-400 text-black",
//         duration: 1500,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center px-5 justify-center min-h-screen bg-muted ">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center ">Register Your Account</CardTitle>
//           <CardDescription className="text-center ">Task Management Dashboard</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form className="space-y-4" onSubmit={submitForm}>
//             <div className="space-y-2">
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="Enter your Name"
//                 name="name"
//                 onChange={handleChange}
//                 required
//                 autoComplete="off"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 name="email"
//                 onChange={handleChange}
//                 required
//                 autoComplete="off"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 name="password"
//                 autoComplete="on"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="cpassword">Confirm Password</Label>
//               <Input
//                 id="cpassword"
//                 type="password"
//                 placeholder="Confirm your password"
//                 name="cpassword"
//                 autoComplete="on"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
//             >
//               Register
//             </Button>
//           </form>
//           <div className="pt-4">
//             <p className="text-center ">
//               Already have an account?{" "}
//               <Link href="/login" className="text-blue-600 hover:underline">
//                 Sign In
//               </Link>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Register;

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useDashboardStore } from "@/store/dashboardStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn, useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";

function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { data: session } = useSession();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const submitForm = async (e: any) => {
    e.preventDefault();

    if (registerInfo.password !== registerInfo.cpassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
        duration: 1500,
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", {
        name: registerInfo.name,
        email: registerInfo.email,
        password: registerInfo.password,
      });

      if (res.status === 200) {
        toast({
          title: "Account Created",
          description: "Redirecting to login...",
          variant: "default",
          className: "bg-green-400 text-black",
          duration: 1500,
        });

        // Automatically sign in the user
        const signInRes = await signIn("credentials", {
          email: registerInfo.email,
          password: registerInfo.password,
          redirect: false,
        });

        if (signInRes?.ok) {
          router.push("/");
        } else {
          router.push("/login");
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
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
          className: "bg-red-400 text-black",
          duration: 1500,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (session) return null;
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

