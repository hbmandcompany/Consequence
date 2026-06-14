/** Shop/marketplace URL — consequence.cc in production, local /shop in dev. */
export function getShopUrl(): string {
  if (process.env.NEXT_PUBLIC_SHOP_URL) {
    return process.env.NEXT_PUBLIC_SHOP_URL;
  }
  if (process.env.NODE_ENV === "production") {
    return "https://consequence.cc";
  }
  return "/shop";
}

export const SHOP_URL = getShopUrl();
