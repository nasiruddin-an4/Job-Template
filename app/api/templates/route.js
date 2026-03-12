
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const templatePath = path.join(process.cwd(), 'public', 'template');
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json({ templates: [] });
    }
    const files = fs.readdirSync(templatePath).filter(file => 
      file.toLowerCase().endsWith('.png') || 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg')
    );
    return NextResponse.json({ templates: files });
  } catch (error) {
    console.error('Template Listing Error:', error.message);
    return NextResponse.json({ error: 'Failed to list templates' }, { status: 500 });
  }
}
