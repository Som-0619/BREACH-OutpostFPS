import { handleRoomRequest } from '../../../../server/room-api.js';

export const dynamic = 'force-dynamic';

async function getWorkersEnv() {
  try {
    // Dynamic import to avoid build-time failure on non-Cloudflare environments like Vercel / Node.js
    const workers = await import('cloudflare:workers');
    return workers.env || {};
  } catch {
    return (globalThis as any).env || {};
  }
}

export async function POST(request: Request) {
  const env = await getWorkersEnv();
  return handleRoomRequest(request, env);
}

export async function GET() {
  return Response.json({ service: 'BREACH co-op', capacity: 6, protocol: 1 });
}

