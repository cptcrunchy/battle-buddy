import { lucia } from "$lib/server/auth";
import { redirect, type RequestEvent } from "@sveltejs/kit";
import { StatusCodes as HTTP } from "http-status-codes";

export async function GET(event: RequestEvent): Promise<Response> {
  if (!event.locals.session) {
    redirect(HTTP.MOVED_TEMPORARILY, "/login");
  }

  await lucia.invalidateSession(event.locals.session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
    path: ".",
    ...sessionCookie.attributes,
  });

  event.cookies.delete("google_oauth_state", { path: "." });
  event.cookies.delete("google_oauth_code_verifier", { path: "." });

  redirect(HTTP.MOVED_TEMPORARILY, "/");
}
