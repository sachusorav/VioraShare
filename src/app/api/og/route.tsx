import { ImageResponse } from 'next/og';
// App router includes next/og by default in Next.js 13+

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic parameters
    const title = searchParams.get('title') || 'VioraShare';
    const description = searchParams.get('description') || 'Secure Temporary File Sharing';
    const stats = searchParams.get('stats') || 'Disposable Rooms • No Trace';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #111 2%, transparent 0%), radial-gradient(circle at 75px 75px, #111 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Blur Elements */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '60%',
              height: '60%',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              filter: 'blur(100px)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-10%',
              left: '-10%',
              width: '50%',
              height: '50%',
              backgroundColor: 'rgba(37, 99, 235, 0.05)',
              filter: 'blur(80px)',
              borderRadius: '50%',
            }}
          />

          {/* Logo Icon Placeholder */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              padding: '20px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '24px',
            }}
          >
             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
             </svg>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '0 50px',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                letterSpacing: '-2px',
                color: 'white',
                marginBottom: '10px',
                background: 'linear-gradient(to bottom right, #fff, #888)',
                backgroundClip: 'text',
              }}
            >
              VioraShare
            </h1>
            <p
              style={{
                fontSize: '32px',
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '20px',
                maxWidth: '800px',
              }}
            >
              {description}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 24px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '100px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#3b82f6',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              {stats}
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.4)',
              fontWeight: 'bold',
              letterSpacing: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            VIORASHARE.ONLINE • SECURE FLOW
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
