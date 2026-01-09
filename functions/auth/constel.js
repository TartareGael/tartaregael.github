export async function onRequestPost({ request, env }) {
  const { password } = await request.json();

  if (password === env.PASSWORD_CONSTEL) {
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: false }),
    { status: 401, headers: { "Content-Type": "application/json" } }
  );
}
