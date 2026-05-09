'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TrackingResultsProps {
  data: any;
}

export default function TrackingResults({ data }: TrackingResultsProps) {
  const [paying, setPaying] = useState(false);

  const handlePayNow = async () => {
    setPaying(true);
    try {
      // Replace this with a real payment flow or API call.
      await new Promise((resolve) => setTimeout(resolve, 800));
      alert('Payment flow started for this delivery.');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Unable to start payment. Please try again later.');
    } finally {
      setPaying(false);
    }
  };
  if (!data.success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-custom max-w-4xl mx-auto"
      >
        <div className="text-center py-8">
          <h3 className="text-2xl text-warning mb-2">Tracking Number Not Found</h3>
          <p className="text-grey">{data.message}</p>
        </div>
      </motion.div>
    );
  }

  const { delivery, history } = data;

  const statusClasses: { [key: string]: string } = {
    pending: 'status-pending',
    in_transit: 'status-in_transit',
    out_for_delivery: 'status-out_for_delivery',
    delivered: 'status-delivered',
    failed: 'status-failed',
  };

  const statusText: { [key: string]: string } = {
    pending: 'Pending',
    in_transit: 'In Transit',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    failed: 'Delivery Failed',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Status Card */}
        <div className="card-custom">
          <h5 className="text-xl text-secondary mb-4">Package Status</h5>
          <div className="mb-4">
            <span className={`status-badge ${statusClasses[delivery.status]}`}>
              {statusText[delivery.status]}
            </span>
          </div>
          {delivery.status === 'in_transit' && (
            <div className="mb-4">
              <button
                type="button"
                onClick={handlePayNow}
                disabled={paying}
                className="btn-primary-custom w-full"
              >
                {paying
                  ? 'Processing Payment...'
                  : `Pay $${parseFloat(delivery.delivery_fee).toFixed(2)} Now`}
              </button>
            </div>
          )}
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-grey-light">
              <span className="text-grey font-semibold">Tracking Number:</span>
              <span className="font-bold">{delivery.tracking_number}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-grey-light">
              <span className="text-grey font-semibold">Current Location:</span>
              <span className="font-bold">{delivery.current_location || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-grey font-semibold">Estimated Delivery:</span>
              <span className="font-bold">{formatDate(delivery.estimated_delivery)}</span>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="card-custom">
          <h5 className="text-xl text-secondary mb-4">Shipment Details</h5>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-grey-light">
              <span className="text-grey font-semibold">Package Description:</span>
              <span className="font-bold">{delivery.package_description}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-grey-light">
              <span className="text-grey font-semibold">Weight:</span>
              <span className="font-bold">{delivery.weight} kg</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-grey font-semibold">Delivery Fee:</span>
              <span className="font-bold">${parseFloat(delivery.delivery_fee).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Tracking History */}
        <div className="card-custom">
          <h5 className="text-xl text-secondary mb-4">Tracking History</h5>
          <div className="timeline">
            {history.map((item: any, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`timeline-item ${index === 0 && delivery.status !== 'delivered' ? 'active' : ''}`}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h5 className="text-primary text-lg mb-2">
                    {item.status.replace('_', ' ').toUpperCase()}
                  </h5>
                  <p className="text-grey text-sm mb-2">
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p className="mb-2">{item.description}</p>
                  <small className="text-grey text-xs">{formatDateTime(item.created_at)}</small>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Sender Info */}
        <div className="card-custom">
          <h5 className="text-xl text-secondary mb-4">Sender Information</h5>
          <div className="space-y-3">
            <div className="py-2 border-b border-grey-light">
              <span className="text-grey font-semibold block mb-1">Name:</span>
              <span className="font-bold">{delivery.sender_name}</span>
            </div>
            <div className="py-2">
              <span className="text-grey font-semibold block mb-1">Address:</span>
              <span className="font-bold">{delivery.sender_address}</span>
            </div>
          </div>
        </div>

        {/* Recipient Info */}
        <div className="card-custom">
          <h5 className="text-xl text-secondary mb-4">Recipient Information</h5>
          <div className="space-y-3">
            <div className="py-2 border-b border-grey-light">
              <span className="text-grey font-semibold block mb-1">Name:</span>
              <span className="font-bold">{delivery.recipient_name}</span>
            </div>
            <div className="py-2 border-b border-grey-light">
              <span className="text-grey font-semibold block mb-1">Address:</span>
              <span className="font-bold">{delivery.recipient_address}</span>
            </div>
            <div className="py-2">
              <span className="text-grey font-semibold block mb-1">Phone:</span>
              <span className="font-bold">{delivery.recipient_phone}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
