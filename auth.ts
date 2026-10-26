import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/login");
  return data.user;
}

export async function requireAdmin() {
  const user = await requireUser();
  const admins = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!user.email || !admins.includes(user.email.toLowerCase())) {
    redirect("/dashboard");
  }

  return user;
}
