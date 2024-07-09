import { OAuth2RequestError } from "arctic";
import { google, lucia } from "$lib/server/auth";
import type { RequestEvent } from "@sveltejs/kit";
import { StatusCodes as HTTP } from "http-status-codes";
import { generateId } from "lucia";
import { createAndSetSession } from "$lib/server/authUtils";
import type { GoogleUser } from "$lib/DB";
import {
  getIfOAuthExits,
  getIfUserExists,
  insertNewUser,
  updateUserOAuth,
} from "$lib/server/dbUtils";

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");
  const codeVerifier = event.cookies.get("google_oauth_code_verifier");
  const storedState = event.cookies.get("google_oauth_state") ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    !codeVerifier ||
    state !== storedState
  ) {
    return new Response(null, {
      status: HTTP.BAD_REQUEST,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const googleUserResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser: GoogleUser = await googleUserResponse.json();
    // TODO: verify email first
    const existingGoogleUser = await getIfUserExists(googleUser.email);
    if (existingGoogleUser) {
      // * Check if the user already has a Google OAuth account linked
      const existingOAuthAccount = await getIfOAuthExits(
        "google",
        existingGoogleUser
      );
      if (!existingOAuthAccount) {
        await updateUserOAuth(existingGoogleUser);
      }
      await createAndSetSession(lucia, existingGoogleUser.id, event.cookies);
    } else {
      const newUser = await insertNewUser(googleUser);
      console.log("newUser ", newUser);
      await createAndSetSession(lucia, newUser.id, event.cookies);
    }
    return new Response(null, {
      status: HTTP.MOVED_TEMPORARILY,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: HTTP.BAD_REQUEST,
      });
    }
    return new Response(null, {
      status: HTTP.INTERNAL_SERVER_ERROR,
    });
  }
}
