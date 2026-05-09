import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get statistics
    const totalDeliveries = await sql`SELECT COUNT(*) as count FROM deliveries`;
    const pending = await sql`SELECT COUNT(*) as count FROM deliveries WHERE status = 'pending'`;
    const inTransit = await sql`SELECT COUNT(*) as count FROM deliveries WHERE status = 'in_transit'`;
    const delivered = await sql`SELECT COUNT(*) as count FROM deliveries WHERE status = 'delivered'`;

    const stats = {
      total_deliveries: parseInt(totalDeliveries[0].count),
      pending: parseInt(pending[0].count),
      in_transit: parseInt(inTransit[0].count),
      delivered: parseInt(delivered[0].count),
    };

    // Get recent deliveries
    const recentDeliveries = await sql`
      SELECT d.*, c.name as customer_name
      FROM deliveries d
      LEFT JOIN customers c ON d.customer_id = c.id
      ORDER BY d.created_at DESC
      LIMIT 10
    `;

    return NextResponse.json({ stats, recentDeliveries });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
