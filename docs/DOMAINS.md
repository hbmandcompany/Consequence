# Domain setup — consequence.software & consequence.cc

Both domains attach to the **same Vercel project** (`hbmandcompany/Consequence`). Middleware routes by hostname:

| Domain | Serves |
|--------|--------|
| `www.consequence.software` | Marketing homepage (`/`) |
| `consequence.software` | Redirects → `www.consequence.software` (once DNS points to Vercel) |
| `consequence.cc` | Shop / marketplace (`/` rewrites to `/shop`) |
| `www.consequence.cc` | Shop / marketplace |

## Current issue: GoDaddy parking on apex

`https://www.consequence.software` already serves the app from Vercel.

`https://consequence.software` (no `www`) still returns a **GoDaddy placeholder** because the apex DNS record does not point to Vercel yet.

## Fix in GoDaddy (choose one)

### Option A — Point apex to Vercel (recommended)

1. **Vercel** → Project **Consequence** → **Settings** → **Domains**
2. Add `consequence.software` and `www.consequence.software` if not already listed.
3. **GoDaddy** → DNS for `consequence.software`:
   - Remove domain **forwarding** / parking for `@`
   - **A** record — Name `@` → Value `76.76.21.21` (Vercel)
   - **CNAME** — Name `www` → Value `cname.vercel-dns.com`
4. Wait for DNS propagation (minutes to a few hours).
5. In Vercel, confirm both domains show **Valid Configuration**.

After this, apex traffic hits Vercel and `vercel.json` + middleware redirect `consequence.software` → `www.consequence.software`.

### Option B — GoDaddy forwarding (quick workaround)

If you cannot change the apex A record yet:

1. GoDaddy → **Forwarding** for `consequence.software`
2. Forward to `https://www.consequence.software`
3. Type: **Permanent (301)**

## consequence.cc (shop)

1. Vercel → add `consequence.cc` and `www.consequence.cc` to the project.
2. GoDaddy DNS:
   - **A** `@` → `76.76.21.21`
   - **CNAME** `www` → `cname.vercel-dns.com`

## Verify

```bash
# Marketing homepage (should return large HTML, Server: Vercel)
curl -I https://www.consequence.software

# Shop (should show marketplace content)
curl -I https://consequence.cc
```

## Env overrides (optional)

```env
NEXT_PUBLIC_MAIN_SITE_URL=https://www.consequence.software
NEXT_PUBLIC_SHOP_URL=https://consequence.cc
NEXT_PUBLIC_MAIN_SITE_HOSTS=consequence.software,www.consequence.software
NEXT_PUBLIC_SHOP_HOSTS=consequence.cc,www.consequence.cc
```
