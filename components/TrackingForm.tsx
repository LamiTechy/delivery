'use client';

import { useState } from 'react';

interface TrackingFormProps {
  onTrack: (trackingNumber: string) => void;
  loading: boolean;
}

export default function TrackingForm({ onTrack, loading }: TrackingFormProps) {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      onTrack(trackingNumber.trim());
    }
  };

  return (
    <div className="card-custom max-w-4xl mx-auto mb-8">
      <h2 className="text-center mb-6 text-3xl">Enter Tracking Number</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="e.g., TRK1000001"
            className="form-control-custom flex-1"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary-custom disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Tracking...' : 'Track Package'}
          </button>
        </div>
        <div className="text-center">
          <small className="text-grey">
            Sample Tracking Numbers: TRK1000001, TRK1000002, TRK1000003
          </small>
        </div>
      </form>
    </div>
  );
}
