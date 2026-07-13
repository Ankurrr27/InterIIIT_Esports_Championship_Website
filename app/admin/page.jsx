import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  // Always redirect to the colleges tab as the default view
  redirect("/admin/colleges");
}
