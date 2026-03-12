
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://career.betopiagroup.com/api/jobs/published');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}
