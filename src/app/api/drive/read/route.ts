import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, fileId } = body;
    if (!token || !fileId) {
      return NextResponse.json({ error: 'Token and fileId are required' }, { status: 400 });
    }

    const metaRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?fields=id,name,mimeType`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!metaRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch file metadata' }, { status: metaRes.status });
    }
    
    const meta = await metaRes.json();
    let textContent = '';

    if (meta.mimeType === 'application/vnd.google-apps.document' || meta.mimeType === 'application/vnd.google-apps.presentation') {
      const exportRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (exportRes.ok) {
        textContent = await exportRes.text();
      }
    } else if (meta.mimeType === 'application/pdf') {
      const mediaRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (mediaRes.ok) {
        const arrayBuffer = await mediaRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // @ts-ignore
        const pdfParse = require('pdf-parse');
        const data = await pdfParse(buffer);
        textContent = data.text;
      }
    } else if (meta.mimeType === 'text/plain' || meta.mimeType === 'text/markdown' || meta.mimeType === 'text/csv') {
      const mediaRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (mediaRes.ok) {
        textContent = await mediaRes.text();
      }
    } else {
      return NextResponse.json({ error: 'Unsupported file type: ' + meta.mimeType }, { status: 400 });
    }

    return NextResponse.json({ content: textContent, name: meta.name });
  } catch (error: any) {
    console.error('Error reading drive file:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
