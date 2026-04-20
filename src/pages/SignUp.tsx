
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Loader2, Mail, Lock, User, Github } from "lucide-react";
import { authApi } from "@/src/lib/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SignUp() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryParam = searchParams.get("q");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authApi.signup(formData);
      const redirectUrl = queryParam ? `/app?q=${encodeURIComponent(queryParam)}` : "/app";
      window.location.href = redirectUrl; // Redirect to app
    } catch (err: any) {
      setError(err.message);
      // Shaky form effect on auth error
      const form = document.getElementById("signup-form");
      form?.classList.add("animate-shake");
      setTimeout(() => form?.classList.remove("animate-shake"), 500);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = formData.password.length === 0 ? 0 : formData.password.length < 6 ? 1 : formData.password.length < 10 ? 2 : 3;

  return (
    <div className="min-h-screen flex flex-col bg-background p-6">
      <Link to="/" className="font-serif text-2xl tracking-tight mb-12 self-start">ARIA</Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex items-center justify-center"
      >
        <Card className="w-full max-w-md bg-card border-border shadow-2xl overflow-hidden">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="font-serif text-3xl">Create your account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Verify your identity to begin autonomous research.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            <Button variant="outline" className="w-full h-12 flex gap-3 font-medium border-border hover:bg-white/5 active:bg-white/10" onClick={() => {}}>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><Separator className="border-border/50" /></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-muted-foreground bg-card px-2">Or with email</div>
            </div>

            <form id="signup-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name (Optional)</Label>
                <div className="relative">
                  <Input
                    id="name"
                    placeholder="Ragav"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-black/20 border-border focus:border-accent-cyan pl-10 h-12"
                  />
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="ragav@agent.ai"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-black/20 border-border focus:border-accent-cyan pl-10 h-12"
                  />
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-black/20 border-border focus:border-accent-cyan pl-10 h-12"
                  />
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>

                {/* Password strength meter */}
                <div className="flex gap-1 h-1 mt-2">
                  <div className={`flex-1 rounded-full transition-all duration-500 ${passwordStrength >= 1 ? 'bg-red-500' : 'bg-white/5'}`} />
                  <div className={`flex-1 rounded-full transition-all duration-500 ${passwordStrength >= 2 ? 'bg-yellow-500' : 'bg-white/5'}`} />
                  <div className={`flex-1 rounded-full transition-all duration-500 ${passwordStrength >= 3 ? 'bg-accent-cyan' : 'bg-white/5'}`} />
                </div>
                <p className="text-[10px] text-muted-foreground flex justify-between">
                  <span>At least 6 characters</span>
                  <span>{passwordStrength === 3 ? "Strong" : passwordStrength === 2 ? "Medium" : "Weak"}</span>
                </p>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-red-400 font-medium py-2"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-accent-cyan text-background hover:bg-accent-cyan/90 font-bold transition-all mt-4"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Verify and Join"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4 py-8 border-t border-border/50 bg-[#121214]/30">
            <p className="text-xs text-muted-foreground">
              Already have an account? <Link to="/signin" className="text-accent-cyan hover:underline">Sign in</Link>
            </p>
            <p className="text-[10px] text-muted-foreground/50 text-center max-w-[280px]">
              By signing up, you agree to our Terms of Service and Privacy Policy. All research agents are subject to heuristic limits.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
