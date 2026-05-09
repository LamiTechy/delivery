'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import TrackingForm from '@/components/TrackingForm';
import TrackingResults from '@/components/TrackingResults';
import FeatureCards from '@/components/FeatureCards';

export default function Home() {
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (trackingNumber: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/track?tracking=${trackingNumber}`);
      const data = await response.json();
      setTrackingData(data);
    } catch (error) {
      console.error('Error tracking package:', error);
      setTrackingData({ success: false, message: 'Error tracking package' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl mb-4">Track Your Delivery</h1>
            <p className="text-lg md:text-xl opacity-90">
              Enter your tracking number to get real-time updates on your package
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tracking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TrackingForm onTrack={handleTrack} loading={loading} />
        </motion.div>

        {/* Tracking Results */}
        {trackingData && (
          <TrackingResults data={trackingData} />
        )}

        {/* Feature Cards */}
        {!trackingData && <FeatureCards />}
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-8 mt-12 text-center">
        <div className="container mx-auto px-4">
          <p className="opacity-80">
            © 2026 DeliverTrack. All rights reserved. | Powered by Advanced Logistics Technology
          </p>
        </div>
      </footer>
    </div>
  );
}
