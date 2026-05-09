import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tracking = searchParams.get('tracking');

  if (!tracking) {
    return NextResponse.json(
      { success: false, message: 'Tracking number is required' },
      { status: 400 }
    );
  }

  try {
    // Get delivery information
    const deliveries = await sql`
      SELECT d.*, c.name as customer_name, c.email as customer_email, c.phone as customer_phone
      FROM deliveries d
      LEFT JOIN customers c ON d.customer_id = c.id
      WHERE d.tracking_number = ${tracking}
    `;

    if (deliveries.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No delivery found with this tracking number. Please check and try again.',
      });
    }

    const delivery = deliveries[0];

    // Get tracking history
    const history = await sql`
      SELECT * FROM tracking_history
      WHERE delivery_id = ${delivery.id}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      success: true,
      delivery,
      history,
    });
  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json(
      { success: false, message: 'Error tracking package' },
      { status: 500 }
    );
  }
}
