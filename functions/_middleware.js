export async function onRequest(context) {
  const { request, next } = context;

  const url = new URL(request.url);

  // On protège uniquement la page constel-mentorat
  if (url.pathname.startsWith("/constel-mentorat")) {
    const cookie = request.headers.get("cookie") || "";

    // Si le cookie n'est PAS présent → login
    if (!cookie.includes("constel_auth=ok")) {
      return Response.redirect(
        "https://gael-tartare.fr/login-constel-mentorat",
        302
      );
    }
  }

  // Sinon on laisse passer
  return next();
}
