import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(request) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error: dbError } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("[POST /api/profiles] Auth error:", authError);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  console.log("[POST /api/profiles] Payload:", payload);
  console.log("[POST /api/profiles] User email:", user.email);

  if (!payload?.email || payload.email !== user.email) {
    console.error("[POST /api/profiles] Email mismatch - payload.email:", payload?.email, "user.email:", user.email);
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: payload.id,
      email: payload.email,
      username: payload.username,
      bio: payload.bio,
      role: payload.role,
      avatar_url: payload.avatar_url,
      marketing_emails: payload.marketing_emails,
      theme: payload.theme,
    })

    .select();

  if (error) {
    console.error("[POST /api/profiles] DB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("[POST /api/profiles] Success, data:", data);
  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(request) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload = null;
  try {
    payload = await request.json();
  } catch {
    payload = null;
  }

  if (!payload?.email || payload.email !== user.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") ?? payload?.id;

  if (!id) {
    return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });
  }

  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "삭제되었습니다." }, { status: 200 });
}
