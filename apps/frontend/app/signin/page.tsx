import AuthPage from "@/components/AuthPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | DoodleHub",
  description: "Access your DoodleHub account",
};

export default function SigninPage() {
  return <AuthPage isSignin={true} />;
}
