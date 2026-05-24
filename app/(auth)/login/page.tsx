'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

function LoginForm() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      // alert('Mock OTP verified');
    }, 1000);
  };

  const handleRetryOtp = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleGoogle = async () => {
    setOauthLoading(true);
    // Simulate redirect
    setTimeout(() => {
      setOauthLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-[2rem] border border-secondary shadow-premium p-8 md:p-10 space-y-8">
      <div className="text-center space-y-2">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Welcome back</p>
        <h1 className="text-3xl md:text-4xl font-display font-black text-text-primary">Sign in</h1>
        <p className="text-text-muted text-sm font-medium">Sign in with your mobile number and OTP.</p>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading || oauthLoading}
        className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border-2 border-secondary bg-white text-text-primary font-bold text-sm hover:bg-secondary/50 hover:border-primary/30 transition-all disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {oauthLoading ? 'Redirecting…' : 'Continue with Google'}
      </button>

      <div className="relative flex items-center gap-4">
        <div className="flex-1 h-px bg-secondary" />
        <span className="text-xs font-bold uppercase tracking-widest text-text-muted">or</span>
        <div className="flex-1 h-px bg-secondary" />
      </div>

      <form onSubmit={step === 'phone' ? handleSendOtp : handleVerifyOtp} className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="login-phone" className="text-sm font-bold text-text-primary ml-1">
            Mobile number
          </label>
          <input
            id="login-phone"
            type="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={step === 'otp'}
            className="w-full p-4 rounded-xl border border-secondary bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all font-bold"
            placeholder="10-digit number"
          />
          <p className="text-xs text-text-muted ml-1 font-medium mt-2">Indian numbers only. Prefix fixed to +91.</p>
        </div>
        
        {step === 'otp' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1.5"
          >
            <label htmlFor="login-otp" className="text-sm font-bold text-text-primary ml-1">
              OTP
            </label>
            <input
              id="login-otp"
              type="text"
              autoComplete="one-time-code"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-4 rounded-xl border border-secondary bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all tracking-[0.35em] text-center font-bold"
              placeholder="1234"
            />
          </motion.div>
        )}
        
        <button
          type="submit"
          disabled={loading || oauthLoading}
          className="w-full bg-accent text-white rounded-xl py-4 font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary-dark transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {loading
            ? 'Please wait…'
            : step === 'phone'
              ? 'Send OTP'
              : 'Verify OTP & Sign in'}
        </button>
        
        {step === 'otp' && (
          <div className="flex items-center justify-between gap-3 px-1 mt-4">
            <button
              type="button"
              onClick={handleRetryOtp}
              className="text-[11px] font-bold tracking-widest uppercase text-primary hover:text-primary-dark transition-colors"
            >
              Resend OTP
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('phone');
                setOtp('');
              }}
              className="text-[11px] font-bold tracking-widest uppercase text-text-muted hover:text-primary transition-colors"
            >
              Change number
            </button>
          </div>
        )}
      </form>

      <p className="text-center text-sm text-text-muted font-medium">
        New here?{' '}
        <Link href="/signup" className="font-bold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
