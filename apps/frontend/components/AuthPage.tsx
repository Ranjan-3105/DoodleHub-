"use client";
import React from "react";

export default function AuthPage({ isSignin }: { isSignin: boolean }) {
  // Optional: You could also use internal toggle logic here
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="max-w-sm w-full bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-pink-300 mb-6">
          {isSignin ? "Sign In to DoodleHub" : "Create an Account"}
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-pink-400"
          />

          {!isSignin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-pink-400"
            />
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-pink-500 hover:bg-pink-600 transition-all text-white font-semibold"
          >
            {isSignin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {isSignin ? (
            <>
              Don’t have an account?{" "}
              <a href="/signup" className="text-pink-400 hover:underline">
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/signin" className="text-pink-400 hover:underline">
                Sign in
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
