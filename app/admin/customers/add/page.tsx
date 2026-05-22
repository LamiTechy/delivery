'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AddCustomerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add customer');
      }

      router.push('/admin/customers');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/customers"
            className="text-primary hover:text-primary-dark font-semibold"
          >
            ← Back
          </Link>
          <h2 className="text-4xl">Add New Customer</h2>
        </div>

        <div className="card-custom">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter customer name"
                className="form-control-custom w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
                className="form-control-custom w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
                className="form-control-custom w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter customer address"
                rows={4}
                className="form-control-custom w-full"
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button type="submit" disabled={loading} className="btn-primary-custom">
                {loading ? 'Adding...' : 'Add Customer'}
              </button>
              <Link href="/admin/customers" className="btn-secondary-custom">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
