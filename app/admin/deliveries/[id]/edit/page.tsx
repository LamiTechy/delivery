'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function EditDeliveryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [delivery, setDelivery] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    sender_name: '',
    sender_address: '',
    recipient_name: '',
    recipient_address: '',
    recipient_phone: '',
    package_description: '',
    weight: '',
    status: '',
    current_location: '',
    delivery_fee: '',
    estimated_delivery: '',
    notes: '',
  });

  useEffect(() => {
    if (id) {
      fetchDelivery();
    }
  }, [id]);

  const fetchDelivery = async () => {
    try {
      const response = await fetch(`/api/admin/deliveries/${id}`);
      const data = await response.json();
      if (response.ok) {
        setDelivery(data.delivery);
        setForm({
          sender_name: data.delivery.sender_name || '',
          sender_address: data.delivery.sender_address || '',
          recipient_name: data.delivery.recipient_name || '',
          recipient_address: data.delivery.recipient_address || '',
          recipient_phone: data.delivery.recipient_phone || '',
          package_description: data.delivery.package_description || '',
          weight: data.delivery.weight?.toString() || '',
          status: data.delivery.status || '',
          current_location: data.delivery.current_location || '',
          delivery_fee: data.delivery.delivery_fee?.toString() || '',
          estimated_delivery: data.delivery.estimated_delivery ? new Date(data.delivery.estimated_delivery).toISOString().slice(0, 10) : '',
          notes: data.delivery.notes || '',
        });
      } else {
        throw new Error(data.error || 'Delivery not found');
      }
    } catch (error) {
      console.error('Error loading delivery:', error);
      router.push('/admin/deliveries');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/admin/deliveries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: delivery.customer_id,
          sender_name: form.sender_name,
          sender_address: form.sender_address,
          recipient_name: form.recipient_name,
          recipient_address: form.recipient_address,
          recipient_phone: form.recipient_phone,
          package_description: form.package_description,
          weight: Number(form.weight),
          status: form.status,
          current_location: form.current_location,
          delivery_fee: Number(form.delivery_fee),
          estimated_delivery: form.estimated_delivery,
          notes: form.notes,
          history_description: `Updated delivery to ${form.status.replace('_', ' ')}`,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || 'Unable to update delivery');
      }

      router.push('/admin/deliveries');
    } catch (error) {
      console.error('Update delivery error:', error);
      alert('Unable to update delivery. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-grey">Loading delivery data...</p>
        </div>
      </div>
    );
  }

  if (!delivery) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-4xl">Edit Delivery</h2>
          <p className="text-grey">Update delivery details and fee.</p>
        </div>
        <Link href="/admin/deliveries" className="btn-primary-custom">
          Back to Deliveries
        </Link>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="card-custom max-w-3xl mx-auto space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-grey font-semibold">Status</span>
            <select
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value)}
              required
              className="form-control-custom"
            >
              <option value="pending">Pending</option>
              <option value="in_transit">In Transit</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
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
          {submitting ? 'Updating...' : 'Update Delivery'}
        </button>
      </motion.form>
    </div>
  );
}
