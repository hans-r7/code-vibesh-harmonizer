import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created!");
    navigate("/code");
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12 bg-gradient-hero relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-primary shadow-elegant mb-4">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="text-muted-foreground mt-2">Start building in minutes</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-sm">Full name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-input border-border h-11"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input border-border h-11"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-input border-border h-11"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant"
            >
              Create account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground hover:text-primary font-medium">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
