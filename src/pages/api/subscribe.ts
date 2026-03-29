import type { APIRoute } from 'astro';
import disposableDomains from 'disposable-email-domains';
import { env } from 'cloudflare:workers';
import { TURNSTILE_SECRET_KEY } from 'astro:env/server';

const disposableSet = new Set(disposableDomains);

export const POST: APIRoute = async ({ request }) => {
	try {
        let body: Record<string, string>;
        try {
            const parsed = await request.json();
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error();
            body = parsed as Record<string, string>;
        } catch {
            return new Response(JSON.stringify({ success: false, error: 'Malformed request body' }), { status: 400 });
        }
        const { email, 'cf-turnstile-response': turnstileToken, b_name } = body;

        // 1. Honeypot check (zero-JS bot trap)
        if (b_name) {
            return new Response(JSON.stringify({ success: false, error: 'Invalid request' }), { status: 400 });
        }

        if (!email || !turnstileToken) {
            return new Response(JSON.stringify({ success: false, error: 'Email and captcha token are required' }), { status: 400 });
        }

        // 2. Validate Turnstile
        const turnstileSecret = TURNSTILE_SECRET_KEY; 
        
        const turnstileData = new FormData();
        turnstileData.append('secret', turnstileSecret);
        turnstileData.append('response', turnstileToken);

        const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: turnstileData
        });
        const turnstileOutcome = (await turnstileRes.json()) as Record<string, any>;

        if (!turnstileOutcome.success) {
            return new Response(JSON.stringify({ success: false, error: 'Captcha verification failed' }), { status: 400 });
        }

        // 3. Email format regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ success: false, error: 'Invalid email format' }), { status: 400 });
        }

        // 4. Temporary Email Check (Level 1 Strictness)
        const domain = email.split('@')[1].toLowerCase();
        if (disposableSet.has(domain)) {
            return new Response(JSON.stringify({ success: false, error: 'Disposable email addresses are not allowed' }), { status: 400 });
        }

        // 5. Insert into D1 Database
        const db = env.DB;
        if (!db) {
            console.error('Database binding not found.');
            // Fallback for purely static dev environments if needed, but in standard dev this should exist
            return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), { status: 500 });
        }

        const now = new Date().toISOString();
        
        // Insert or ignore if they are already actively subscribed
        const stmt = db.prepare(
            "INSERT INTO subscribers (email, status, created_at) VALUES (?, 'active', ?) ON CONFLICT(email) DO UPDATE SET status='active', created_at=EXCLUDED.created_at;"
        );
        await stmt.bind(email, now).run();

        return new Response(JSON.stringify({ success: true, message: 'Subscribed successfully!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

	} catch (e) {
        console.error('Subscription error:', e);
		return new Response(JSON.stringify({ success: false, error: 'Something went wrong' }), { status: 500 });
	}
};
