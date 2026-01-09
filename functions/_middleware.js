export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // 🔐 Page protégée
  if (url.pathname === "/constel-mentorat") {
    const cookie = request.headers.get("Cookie") || "";

    if (!cookie.includes("constel_access=true")) {
      return Response.redirect(
        `${url.origin}/login-constel-mentorat`,
        302
      );
    }
  }

  return next();
}
