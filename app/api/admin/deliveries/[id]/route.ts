import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);

    const deliveries = await sql`
      SELECT d.*, c.name as customer_name, c.email as customer_email, c.phone as customer_phone
      FROM deliveries d
      LEFT JOIN customers c ON d.customer_id = c.id
      WHERE d.id = ${id}
    `;

    if (deliveries.length === 0) {
      return NextResponse.json({ error: 'Delivery not found' }, { status: 404 });
    }

    const history = await sql`
      SELECT * FROM tracking_history
      WHERE delivery_id = ${id}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ delivery: deliveries[0], history });
  } catch (error) {
    console.error('Get delivery error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);
    const data = await request.json();

    // Get current delivery to check if status changed
    const currentDelivery = await sql`
      SELECT * FROM deliveries WHERE id = ${id}
    `;

    if (currentDelivery.length === 0) {
      return NextResponse.json({ error: 'Delivery not found' }, { status: 404 });
    }

    // Update delivery
    const result = await sql`
      UPDATE deliveries SET
        customer_id = ${data.customer_id},
        sender_name = ${data.sender_name},
        sender_address = ${data.sender_address},
        recipient_name = ${data.recipient_name},
        recipient_address = ${data.recipient_address},
        recipient_phone = ${data.recipient_phone},
        package_description = ${data.package_description},
        weight = ${data.weight},
        status = ${data.status},
        current_location = ${data.current_location},
        delivery_fee = ${data.delivery_fee},
        estimated_delivery = ${data.estimated_delivery},
        notes = ${data.notes || ''},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    // If status changed, add to tracking history
    if (currentDelivery[0].status !== data.status) {
      await sql`
        INSERT INTO tracking_history (delivery_id, status, location, description)
        VALUES (
          ${id},
          ${data.status},
          ${data.current_location},
          ${data.history_description || 'Status updated'}
        )
      `;
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Update delivery error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);

    await sql`DELETE FROM deliveries WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete delivery error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
