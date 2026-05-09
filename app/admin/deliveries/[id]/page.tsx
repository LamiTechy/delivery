'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DeliveryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [delivery, setDelivery] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
        setHistory(data.history);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-grey">Loading delivery details...</p>
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
          <h2 className="text-4xl">Delivery Details</h2>
          <p className="text-grey">Tracking #{delivery.tracking_number}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/deliveries" className="btn-primary-custom">
            Back to Deliveries
          </Link>
          <Link href={`/admin/deliveries/${id}/edit`} className="btn-primary-custom">
            Edit Delivery
          </Link>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-custom">
            <h5 className="text-xl text-secondary mb-4">Package Status</h5>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-grey-light">
                <span className="text-grey font-semibold">Status</span>
                <span className="font-bold">{delivery.status.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-grey-light">
                <span className="text-grey font-semibold">Delivery Fee</span>
                <span className="font-bold">${parseFloat(delivery.delivery_fee).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-grey-light">
                <span className="text-grey font-semibold">Current Location</span>
                <span className="font-bold">{delivery.current_location}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-grey font-semibold">Estimated Delivery</span>
                <span className="font-bold">{new Date(delivery.estimated_delivery).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="card-custom">
            <h5 className="text-xl text-secondary mb-4">Shipment Details</h5>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-grey-light">
                <span className="text-grey font-semibold">Package Description</span>
                <span className="font-bold">{delivery.package_description}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-grey-light">
                <span className="text-grey font-semibold">Weight</span>
                <span className="font-bold">{delivery.weight} kg</span>
              </div>
            </div>
          </div>

          <div className="card-custom">
            <h5 className="text-xl text-secondary mb-4">Tracking History</h5>
            <div className="timeline">
              {history.map((item: any) => (
                <div key={item.id} className="timeline-item active">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h5 className="text-primary text-lg mb-2">{item.status.replace('_', ' ').toUpperCase()}</h5>
                    <p className="text-grey text-sm mb-2">
                      <strong>Location:</strong> {item.location}
                    </p>
                    <p className="mb-2">{item.description}</p>
                    <small className="text-grey text-xs">{new Date(item.created_at).toLocaleString()}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-custom">
            <h5 className="text-xl text-secondary mb-4">Sender Information</h5>
            <div className="space-y-3">
              <div className="py-2 border-b border-grey-light">
                <span className="text-grey font-semibold block mb-1">Name</span>
                <span className="font-bold">{delivery.sender_name}</span>
              </div>
              <div className="py-2">
                <span className="text-grey font-semibold block mb-1">Address</span>
                <span className="font-bold">{delivery.sender_address}</span>
              </div>
            </div>
          </div>

          <div className="card-custom">
            <h5 className="text-xl text-secondary mb-4">Recipient Information</h5>
            <div className="space-y-3">
              <div className="py-2 border-b border-grey-light">
                <span className="text-grey font-semibold block mb-1">Name</span>
                <span className="font-bold">{delivery.recipient_name}</span>
              </div>
              <div className="py-2 border-b border-grey-light">
                <span className="text-grey font-semibold block mb-1">Address</span>
                <span className="font-bold">{delivery.recipient_address}</span>
              </div>
              <div className="py-2">
                <span className="text-grey font-semibold block mb-1">Phone</span>
                <span className="font-bold">{delivery.recipient_phone}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
