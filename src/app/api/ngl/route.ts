import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, message, deviceId } = await request.json();

    if (!username || !message) {
      return NextResponse.json(
        { error: 'Username NGL dan pesan tidak boleh kosong' },
        { status: 400 }
      );
    }

    // Clean username (in case user pasted full link like ngl.link/nama)
    const cleanUsername = username
      .replace(/^https?:\/\/(www\.)?ngl\.link\//, '')
      .replace(/[^a-zA-Z0-9._-]/g, '')
      .trim();

    const randomDeviceId =
      deviceId ||
      'dev_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const params = new URLSearchParams();
    params.append('username', cleanUsername);
    params.append('question', message);
    params.append('deviceId', randomDeviceId);
    params.append('gameSlug', '');
    params.append('referrer', '');

    const response = await fetch('https://ngl.link/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://ngl.link',
        'Referer': `https://ngl.link/${cleanUsername}`,
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `Gagal mengirim ke NGL: ${response.status}`, details: errText },
        { status: response.status }
      );
    }

    const data = await response.json().catch(() => ({ success: true }));

    return NextResponse.json({
      success: true,
      username: cleanUsername,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Terjadi kesalahan saat menghubungi server NGL' },
      { status: 500 }
    );
  }
}
