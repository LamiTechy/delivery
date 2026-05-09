'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentDeliveries, setRecentDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const data = await response.json();
      setStats(data.stats);
      setRecentDeliveries(data.recentDeliveries);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-grey">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
    failed: 'Failed',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl mb-8">Dashboard Overview</h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stat-card"
        >
          <h3>{stats?.total_deliveries || 0}</h3>
          <p>Total Deliveries</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card border-l-warning"
        >
          <h3 className="text-warning">{stats?.pending || 0}</h3>
          <p>Pending</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card border-l-secondary"
        >
          <h3 className="text-secondary">{stats?.in_transit || 0}</h3>
          <p>In Transit</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="stat-card border-l-success"
        >
          <h3 className="text-success">{stats?.delivered || 0}</h3>
          <p>Delivered</p>
        </motion.div>
      </div>

      {/* Recent Deliveries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card-custom"
      >
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-2xl text-secondary">Recent Deliveries</h5>
          <Link href="/admin/deliveries" className="btn-primary-custom text-sm px-4 py-2">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Tracking #</th>
                <th>Customer</th>
                <th>Recipient</th>
                <th>Status</th>
                <th>Est. Delivery</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentDeliveries.map((delivery) => (
                <tr key={delivery.id}>
                  <td className="font-bold">{delivery.tracking_number}</td>
                  <td>{delivery.customer_name}</td>
                  <td>{delivery.recipient_name}</td>
                  <td>
                    <span className={`status-badge ${statusClasses[delivery.status]}`}>
                      {statusText[delivery.status]}
                    </span>
                  </td>
                  <td>{new Date(delivery.estimated_delivery).toLocaleDateString()}</td>
                  <td>
                    <Link
                      href={`/admin/deliveries/${delivery.id}`}
                      className="text-primary hover:text-primary-dark font-semibold"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
