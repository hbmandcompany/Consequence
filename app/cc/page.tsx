import { redirect } from "next/navigation";

/** Legacy URL → Shop */
export default function CCPage() {
  redirect("/shop");
}
