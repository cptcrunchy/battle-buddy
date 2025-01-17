// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { PrismaClient } from "@prisma/client/extension";
import type { User, Session } from "lucia";
import type { GoogleUser } from "./routes/login/google/callback/+server";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: User | null;
      session: Session | null;
      userInfo: GoogleUser | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  var prisma: PrismaClient;
}

export {};
