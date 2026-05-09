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
    const deliveries = await sql`
      SELECT d.*, c.name as customer_name, c.email as customer_email
      FROM deliveries d
      LEFT JOIN customers c ON d.customer_id = c.id
      ORDER BY d.created_at DESC
    `;

    return NextResponse.json(deliveries);
  } catch (error) {
    console.error('Deliveries API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Generate unique tracking number
    const trackingNumber = `TRK${Math.floor(1000000 + Math.random() * 9000000)}`;

    const result = await sql`
      INSERT INTO deliveries (
        tracking_number, customer_id, sender_name, sender_address,
        recipient_name, recipient_address, recipient_phone,
        package_description, weight, delivery_fee,
        estimated_delivery, current_location, notes, status
      ) VALUES (
        ${trackingNumber}, ${data.customer_id}, ${data.sender_name}, ${data.sender_address},
        ${data.recipient_name}, ${data.recipient_address}, ${data.recipient_phone},
        ${data.package_description}, ${data.weight}, ${data.delivery_fee},
        ${data.estimated_delivery}, ${data.current_location}, ${data.notes || ''}, 'pending'
      )
      RETURNING *
    `;

    const delivery = result[0];

    // Add initial tracking history
    await sql`
      INSERT INTO tracking_history (delivery_id, status, location, description)
      VALUES (${delivery.id}, 'pending', ${data.current_location}, 'Package received and awaiting pickup')
    `;

    return NextResponse.json(delivery);
  } catch (error) {
    console.error('Create delivery error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
