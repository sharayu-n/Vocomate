"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login/signup wrapper, bypass real auth to ensure it's immediately testable end-to-end
    if (email) {
       router.push("/train");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-1 mb-8">
        <span className="font-bold text-4xl tracking-tighter">voco</span>
        <span className="font-bold text-4xl tracking-tighter text-primary">mate</span>
      </div>
      
      <Card className="w-full max-w-md p-8 bg-white rounded-3xl border shadow-xl">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 mx-auto">
          <Mic className="text-primary w-8 h-8" />
        </div>
        
        <h1 className="text-2xl font-semibold text-center mb-2">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          {isLogin ? "Sign in to continue your speech training." : "Get started with your speech training today."}
        </p>
        
        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input 
                type="text" 
                placeholder="John Doe" 
                required
                className="rounded-xl bg-gray-50 border-gray-200"
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email address</label>
            <Input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl bg-gray-50 border-gray-200"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              required
              className="rounded-xl bg-gray-50 border-gray-200"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium mt-4 hover:bg-primary/90 transition-colors shadow-lg"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            className="text-primary font-medium cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Sign In"}
          </span>
        </p>
      </Card>
    </div>
  );
}
