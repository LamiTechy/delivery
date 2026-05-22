import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const customer = await sql`
      SELECT c.*, COUNT(d.id) as total_deliveries
      FROM customers c
      LEFT JOIN deliveries d ON c.id = d.customer_id
      WHERE c.id = ${params.id}
      GROUP BY c.id
    `;

    if (customer.length === 0) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json(customer[0]);
  } catch (error) {
    console.error('Get customer error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();

    const result = await sql`
      UPDATE customers
      SET name = ${data.name}, email = ${data.email}, phone = ${data.phone}, address = ${data.address}
      WHERE id = ${params.id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Update customer error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await sql`
      DELETE FROM customers
      WHERE id = ${params.id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete customer error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
