/// <reference types="@sveltejs/kit" />

interface Locals {
    session: import("svelte-kit-cookie-session").Session<{
      username: string;
      id: string;
      avatarUrl: string;
      email: string;
    }>;
  }
  
  type RequestHandler<Body = unknown> = import("@sveltejs/kit").RequestHandler<
    Locals,
    Body
  >;
  