export async function onRequestPost({ request, env }) {
  const { password } = await request.json();

  if (password === env.PASSWORD_CONSTEL) {
    return new Response("OK", {
      headers: {
        "Set-Cookie":
          "constel_access=true; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Strict"
      }
    });
  }

  return new Response("Unauthorized", { status: 401 });
}
