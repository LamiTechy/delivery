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
    const customers = await sql`
      SELECT c.*, COUNT(d.id) as total_deliveries
      FROM customers c
      LEFT JOIN deliveries d ON c.id = d.customer_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `;

    return NextResponse.json(customers);
  } catch (error) {
    console.error('Customers API error:', error);
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

    const result = await sql`
      INSERT INTO customers (name, email, phone, address)
      VALUES (${data.name}, ${data.email}, ${data.phone}, ${data.address})
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Create customer error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
