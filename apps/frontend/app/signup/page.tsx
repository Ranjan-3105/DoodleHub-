import AuthPage from "@/components/AuthPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | DoodleHub",
  description: "Create a DoodleHub account",
};

export default function SignupPage() {
  return <AuthPage isSignin={false} />;
}
