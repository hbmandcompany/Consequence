# Domain setup — consequence.cc & consequence.software

| Domain | Serves at `/` |
|--------|----------------|
| `www.consequence.cc` | **Shop / marketplace** (feed, search hero, wallet) |
| `consequence.cc` | Redirects → `www.consequence.cc` |
| `www.consequence.software` | **Software marketing** homepage |
| `consequence.software` | Redirects → `www.consequence.software` |

Nav: **Home** → `consequence.cc` · **Consequence** *software* → `consequence.software`

## Env overrides

```env
NEXT_PUBLIC_HOME_URL=https://www.consequence.cc
NEXT_PUBLIC_SOFTWARE_URL=https://www.consequence.software
NEXT_PUBLIC_SHOP_URL=https://www.consequence.cc
```
