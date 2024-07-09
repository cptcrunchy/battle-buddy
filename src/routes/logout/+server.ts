import { lucia } from "$lib/server/auth";
import { deleteSessionCookie } from "$lib/server/authUtils";
import { redirect, type RequestEvent } from "@sveltejs/kit";
import { StatusCodes as HTTP } from "http-status-codes";

export async function GET(event: RequestEvent): Promise<Response> {
  if (!event.locals.session) {
    redirect(HTTP.MOVED_TEMPORARILY, "/login");
  }

  await lucia.invalidateSession(event.locals.session.id);
  await deleteSessionCookie(lucia, event.cookies);

  redirect(HTTP.MOVED_TEMPORARILY, "/");
}
