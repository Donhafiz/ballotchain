import { NextResponse } from "next/server";
import { SSO_PROVIDERS } from "@/lib/sso/providers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const provider = searchParams.get("provider");

  if (!provider || !SSO_PROVIDERS[provider as keyof typeof SSO_PROVIDERS]) {
    return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
  }

  const config = SSO_PROVIDERS[provider as keyof typeof SSO_PROVIDERS];
  const redirectUri = process.env.NEXT_PUBLIC_APP_URL + "/api/auth/sso/callback";
  
  const authUrl = config.authorizationURL
    .replace("{tenantId}", process.env.AZURE_TENANT_ID || "common")
    + "?client_id=" + config.clientId
    + "&redirect_uri=" + encodeURIComponent(redirectUri)
    + "&response_type=code"
    + "&scope=" + encodeURIComponent(config.scope);

  return NextResponse.redirect(authUrl);
}