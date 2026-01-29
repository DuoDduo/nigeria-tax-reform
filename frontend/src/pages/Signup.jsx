import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupAPI } from "../api/authAPI";
import { useAuth } from "../auth/AuthContext";
import { Eye, EyeOff, AlertCircle, User, Mail, Lock, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password.length < 6) {
      setError("Security requirement: Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await signupAPI({ full_name: fullName, email, password });
      login(data);
      navigate("/"); 
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please verify your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Side: Information & Branding Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#004d2f] relative overflow-hidden p-16 flex-col justify-between">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-signup" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-signup)" />
          </svg>
        </div>

        {/* Branding Overlay */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Coat_of_arms_of_Nigeria.svg" 
              alt="Coat of Arms" 
              className="w-16 h-16"
            />
            <div className="h-12 w-[1px] bg-white/20 mx-2"></div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase leading-none">TaxPyre</h1>
              <p className="text-[10px] font-bold text-green-300 uppercase tracking-[0.2em] mt-1">Federal Republic of Nigeria</p>
            </div>
          </div>

          <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-6">
            Register for <br />
            <span className="text-[#A88948]">Official AI Access</span>
          </h2>
          
          <div className="space-y-6 max-w-md">
            {[
              "Real-time analysis of the 2026 Tax Bills",
              "Personalized tax impact projections",
              "Direct source-backed information",
              "Secure digital identity for reform updates"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-green-50/80 font-medium">
                <CheckCircle size={18} className="text-[#A88948]" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Note */}
        <div className="relative z-10 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
          <p className="text-sm text-green-100/70 leading-relaxed italic">
            "Your registration ensures a secure, verifiable channel for tax reform literacy across the Federation."
          </p>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20 relative">
        <div className="w-full max-w-md">
          {/* Mobile Only Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Coat_of_arms_of_Nigeria.svg" 
              alt="Logo" 
              className="w-16 h-16"
            />
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h3>
            <p className="text-gray-500 mt-2 font-medium">Join the official tax reform portal today.</p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-md text-sm animate-in fade-in zoom-in duration-300">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span className="font-bold">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Full Legal Name</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Adewale"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 pl-12 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#008751] focus:border-transparent transition-all font-medium"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 pl-12 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#008751] focus:border-transparent transition-all font-medium"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Create Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 pl-12 pr-12 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#008751] focus:border-transparent transition-all font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#008751] transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#008751] hover:bg-[#00643d] text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 uppercase tracking-widest text-xs active:scale-[0.98] mt-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-[#008751]/20"
              }`}
            >
              {isLoading ? "Validating Account..." : "Register Account"}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col items-center">
             <div className="flex items-center gap-2 text-gray-400 mb-8">
                <ShieldCheck size={16} className="text-[#A88948]" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Protected by Nigerian Data Privacy Laws</span>
              </div>
            
            <p className="text-center text-gray-500 text-sm font-medium">
              Already registered?{" "}
              <Link to="/login" className="text-[#008751] font-bold hover:underline ml-1">
                Official Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;