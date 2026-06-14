# Domain setup — consequence.cc & consequence.software

Both domains attach to the **same Vercel project**. Routing by hostname:

| Domain | Role |
|--------|------|
| `www.consequence.cc` | **Home** — marketing homepage at `/` |
| `consequence.cc` | Redirects → `www.consequence.cc` |
| `www.consequence.software` | **Software** — studio, `/shop`, `/treasury`, etc. |
| `consequence.software` | Redirects → `www.consequence.software` |

Nav on **consequence.cc**: **Home** stays on `.cc`; **Consequence** *software* links to `consequence.software`.

## Env overrides (optional)

```env
NEXT_PUBLIC_HOME_URL=https://www.consequence.cc
NEXT_PUBLIC_SOFTWARE_URL=https://www.consequence.software
NEXT_PUBLIC_SHOP_URL=https://www.consequence.software/shop
NEXT_PUBLIC_HOME_HOSTS=consequence.cc,www.consequence.cc
NEXT_PUBLIC_SOFTWARE_HOSTS=consequence.software,www.consequence.software
```

## GoDaddy DNS (both domains)

For each domain in Vercel → Project → Domains:

- **A** `@` → `76.76.21.21`
- **CNAME** `www` → `cname.vercel-dns.com`
- Remove parking / forwarding on apex
