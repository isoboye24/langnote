import { NextResponse } from 'next/server';

export async function GET() {
  const languages = [
    'Arabic',
    'English',
    'French',
    'German',
    'Hindi',
    'Hungarian',
    'Japanese',
    'Mandarin',
    'Polish',
    'Portuguese',
    'Russian',
    'Spanish',
    'Ukrainian',
  ];

  return NextResponse.json(languages);
}
