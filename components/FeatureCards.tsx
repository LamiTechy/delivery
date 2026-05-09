'use client';

import { motion } from 'framer-motion';

export default function FeatureCards() {
  const features = [
    {
      icon: '📦',
      title: 'Real-Time Tracking',
      description: 'Get live updates on your package location and delivery status',
    },
    {
      icon: '🚚',
      title: 'Delivery Timeline',
      description: 'View complete journey of your package from sender to destination',
    },
    {
      icon: '📍',
      title: 'Location Updates',
      description: 'Know exactly where your package is at every step of the way',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="card-custom text-center"
        >
          <div className="text-5xl mb-4">{feature.icon}</div>
          <h5 className="text-xl text-secondary mb-3">{feature.title}</h5>
          <p className="text-grey">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
