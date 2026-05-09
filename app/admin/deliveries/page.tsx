'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await fetch('/api/admin/deliveries');
      const data = await response.json();
      setDeliveries(data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this delivery?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/deliveries/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchDeliveries();
      } else {
        alert('Error deleting delivery');
      }
    } catch (error) {
      console.error('Error deleting delivery:', error);
      alert('Error deleting delivery');
    }
  };

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.recipient_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || delivery.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-grey">Loading deliveries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h2 className="text-4xl">Manage Deliveries</h2>
        <Link href="/admin/deliveries/add" className="btn-primary-custom">
          + Add New Delivery
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by tracking number, customer, or recipient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control-custom"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-control-custom"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_transit">In Transit</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Deliveries Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-custom"
      >
        <div className="overflow-x-auto">
          <table className="table-custom">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tracking #</th>
                <th>Customer</th>
                <th>Recipient</th>
                <th>Description</th>
                <th>Status</th>
                <th>Location</th>
                <th>Fee</th>
                <th>Est. Delivery</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.id}>
                  <td>{delivery.id}</td>
                  <td className="font-bold">{delivery.tracking_number}</td>
                  <td>{delivery.customer_name}</td>
                  <td>{delivery.recipient_name}</td>
                  <td>{delivery.package_description.substring(0, 30)}...</td>
                  <td>
                    <span className={`status-badge ${statusClasses[delivery.status]}`}>
                      {statusText[delivery.status]}
                    </span>
                  </td>
                  <td>{delivery.current_location}</td>
                  <td>${parseFloat(delivery.delivery_fee).toFixed(2)}</td>
                  <td>{new Date(delivery.estimated_delivery).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <Link
                      href={`/admin/deliveries/${delivery.id}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      👁️
                    </Link>
                    <Link
                      href={`/admin/deliveries/${delivery.id}/edit`}
                      className="text-primary hover:text-primary-dark"
                      title="Edit"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(delivery.id)}
                      className="text-danger hover:text-red-700"
                      title="Delete"
                    >
                      🗑️
                    </button>
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
