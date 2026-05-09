'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AddDeliveryPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customer_id: '',
    sender_name: '',
    sender_address: '',
    recipient_name: '',
    recipient_address: '',
    recipient_phone: '',
    package_description: '',
    weight: '',
    delivery_fee: '',
    estimated_delivery: '',
    current_location: '',
    notes: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/admin/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoadingCustomers(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/admin/deliveries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: Number(form.customer_id),
          sender_name: form.sender_name,
          sender_address: form.sender_address,
          recipient_name: form.recipient_name,
          recipient_address: form.recipient_address,
          recipient_phone: form.recipient_phone,
          package_description: form.package_description,
          weight: Number(form.weight),
          delivery_fee: Number(form.delivery_fee),
          estimated_delivery: form.estimated_delivery,
          current_location: form.current_location,
          notes: form.notes,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || 'Unable to create delivery');
      }

      router.push('/admin/deliveries');
    } catch (error) {
      console.error('Create delivery error:', error);
      alert('Unable to create delivery. Please check the fields and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-4xl">Add New Delivery</h2>
          <p className="text-grey">Fill in delivery details and set the delivery fee.</p>
        </div>
        <Link href="/admin/deliveries" className="btn-primary-custom">
          Back to Deliveries
        </Link>
      </div>

      {loadingCustomers ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="card-custom max-w-3xl mx-auto space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-grey font-semibold">Customer</span>
              <select
                value={form.customer_id}
                onChange={(e) => handleChange('customer_id', e.target.value)}
                required
                className="form-control-custom"
              >
                <option value="">Select a customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} ({customer.email})
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-grey font-semibold">Delivery Fee</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.delivery_fee}
                onChange={(e) => handleChange('delivery_fee', e.target.value)}
                required
                className="form-control-custom"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-grey font-semibold">Sender Name</span>
              <input
                type="text"
                value={form.sender_name}
                onChange={(e) => handleChange('sender_name', e.target.value)}
                required
                className="form-control-custom"
              />
            </label>
            <label className="block">
              <span className="text-grey font-semibold">Sender Address</span>
              <input
                type="text"
                value={form.sender_address}
                onChange={(e) => handleChange('sender_address', e.target.value)}
                required
                className="form-control-custom"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-grey font-semibold">Recipient Name</span>
              <input
                type="text"
                value={form.recipient_name}
                onChange={(e) => handleChange('recipient_name', e.target.value)}
                required
                className="form-control-custom"
              />
            </label>
            <label className="block">
              <span className="text-grey font-semibold">Recipient Phone</span>
              <input
                type="tel"
                value={form.recipient_phone}
                onChange={(e) => handleChange('recipient_phone', e.target.value)}
                required
                className="form-control-custom"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-grey font-semibold">Recipient Address</span>
            <input
              type="text"
              value={form.recipient_address}
              onChange={(e) => handleChange('recipient_address', e.target.value)}
              required
              className="form-control-custom"
            />
          </label>

          <label className="block">
            <span className="text-grey font-semibold">Package Description</span>
            <textarea
              value={form.package_description}
              onChange={(e) => handleChange('package_description', e.target.value)}
              required
              rows={4}
              className="form-control-custom"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-grey font-semibold">Weight (kg)</span>
              <input
                type="number"
                step="0.1"
                min="0"
                value={form.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                required
                className="form-control-custom"
              />
            </label>
            <label className="block">
              <span className="text-grey font-semibold">Estimated Delivery</span>
              <input
                type="date"
                value={form.estimated_delivery}
                onChange={(e) => handleChange('estimated_delivery', e.target.value)}
                required
                className="form-control-custom"
              />
            </label>
            <label className="block">
              <span className="text-grey font-semibold">Current Location</span>
              <input
                type="text"
                value={form.current_location}
                onChange={(e) => handleChange('current_location', e.target.value)}
                required
                className="form-control-custom"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-grey font-semibold">Notes</span>
            <textarea
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
              className="form-control-custom"
            />
          </label>

          <button type="submit" disabled={submitting} className="btn-primary-custom w-full">
            {submitting ? 'Saving...' : 'Save Delivery'}
          </button>
        </motion.form>
      )}
    </div>
  );
}
