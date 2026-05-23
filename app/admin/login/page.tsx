'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error('SignIn error:', result.error);
        setError(result.error || 'Invalid username or password');
      } else if (result) {
        router.push('/admin/dashboard');
      } else {
        setError('Sign-in failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('SignIn exception:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-dark p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-2xl p-8 md:p-12 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl text-secondary mb-2">Admin Login</h2>
          <p className="text-grey">Delivery Tracking System</p>
        </div>

        {error && (
          <div className="bg-danger/10 border-2 border-danger text-danger px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="form-label-custom">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control-custom"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="form-label-custom">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control-custom"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary-custom w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>

          <div className="text-center">
            <small className="text-grey"></small>
          </div>

          <div className="text-center">
            <Link href="/" className="text-grey hover:text-primary transition-colors">
              ← Back to Tracking Page
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
