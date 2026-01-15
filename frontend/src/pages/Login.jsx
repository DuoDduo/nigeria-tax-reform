import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginAPI } from "../api/authAPI";
import { useAuth } from "../auth/AuthContext";
import { Eye, EyeOff, AlertCircle, ShieldCheck, Lock, ArrowRight, CheckCircle } from "lucide-react";

const Login = () => {
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
    if (!email || !password) {
      setError("Please provide your official credentials.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await loginAPI(email, password);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed. Please check your credentials.");
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
              <pattern id="grid-login" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-login)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Coat_of_arms_of_Nigeria.svg" 
              alt="Coat of Arms" 
              className="w-16 h-16"
            />
            <div className="h-12 w-[1px] bg-white/20 mx-2"></div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase leading-none">TaxEase</h1>
              <p className="text-[10px] font-bold text-green-300 uppercase tracking-[0.2em] mt-1">Federal Republic of Nigeria</p>
            </div>
          </div>

          <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-6">
            Secure Access to <br />
            <span className="text-[#A88948]">Tax Reform Data</span>
          </h2>
          
          <div className="space-y-6 max-w-md">
            {[
              "Encrypted end-to-end data processing",
              "Direct access to 2026 Reform Bills",
              "Personalized AI tax impact analysis",
              "Verified Government Policy updates"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-green-50/80 font-medium">
                <CheckCircle size={18} className="text-[#A88948]" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
          <p className="text-sm text-green-100/70 leading-relaxed italic">
            "This portal serves as the unified point of truth for the 2024-2026 tax reforms, ensuring every Nigerian citizen and business is informed and empowered."
          </p>
        </div>
      </div>

      {/* Right Side: Secure Login Form */}
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
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">Portal Login</h3>
            <p className="text-gray-500 mt-2 font-medium">Enter your official credentials to continue.</p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-md text-sm animate-in fade-in zoom-in duration-300">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Official Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.gov.ng"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#008751] focus:border-transparent transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Security Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 pr-12 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#008751] focus:border-transparent transition-all font-medium"
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

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center text-gray-500 font-medium cursor-pointer">
                <input type="checkbox" className="mr-2 h-4 w-4 rounded border-gray-300 text-[#008751] focus:ring-[#008751]" />
                Keep me authenticated
              </label>
              <Link to="/forgot-password" size="sm" className="text-[#008751] font-bold hover:underline">
                Recovery Options
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#008751] hover:bg-[#00643d] text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 uppercase tracking-widest text-xs active:scale-[0.98] ${
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-[#008751]/20"
              }`}
            >
              {isLoading ? (
                "Authorizing..."
              ) : (
                <>
                  Secure Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Trust Badges */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col items-center">
            <div className="flex items-center gap-6 grayscale opacity-40">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase">SSL Secured</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock size={16} />
                <span className="text-[10px] font-bold uppercase">256-bit AES</span>
              </div>
            </div>
            
            <p className="mt-8 text-center text-gray-500 text-sm font-medium">
              New to the portal?{" "}
              <Link to="/signup" className="text-[#008751] font-bold hover:underline ml-1">
                Register Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;