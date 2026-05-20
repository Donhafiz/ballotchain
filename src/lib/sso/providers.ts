// Enterprise SSO Configuration
// Supports: SAML 2.0, OIDC, Azure AD, Okta, Google Workspace

export const SSO_PROVIDERS = {
  azure: {
    name: "Azure AD",
    icon: "🔷",
    issuer: "https://login.microsoftonline.com/{tenantId}/v2.0",
    authorizationURL: "https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize",
    tokenURL: "https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token",
    clientId: process.env.AZURE_CLIENT_ID,
    scope: "openid profile email",
  },
  okta: {
    name: "Okta",
    icon: "🔵",
    issuer: "https://{yourOktaDomain}/oauth2/default",
    authorizationURL: "https://{yourOktaDomain}/oauth2/default/v1/authorize",
    tokenURL: "https://{yourOktaDomain}/oauth2/default/v1/token",
    clientId: process.env.OKTA_CLIENT_ID,
    scope: "openid profile email",
  },
  google: {
    name: "Google Workspace",
    icon: "🟡",
    issuer: "https://accounts.google.com",
    authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenURL: "https://oauth2.googleapis.com/token",
    clientId: process.env.GOOGLE_CLIENT_ID,
    scope: "openid profile email",
  },
};

export interface SSOUser {
  email: string;
  firstName: string;
  lastName: string;
  provider: string;
  providerId: string;
}

export async function handleSSOCallback(provider: string, code: string): Promise<SSOUser> {
  const config = SSO_PROVIDERS[provider as keyof typeof SSO_PROVIDERS];
  if (!config) throw new Error("Unknown SSO provider");

  // Exchange code for token
  const tokenRes = await fetch(config.tokenURL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: config.clientId!,
      redirect_uri: process.env.NEXT_PUBLIC_APP_URL + "/api/auth/sso/callback",
    }),
  });
  const tokens = await tokenRes.json();

  // Get user info
  const userRes = await fetch(config.issuer + "/userinfo", {
    headers: { Authorization: "Bearer " + tokens.access_token },
  });
  const userInfo = await userRes.json();

  return {
    email: userInfo.email,
    firstName: userInfo.given_name || userInfo.name?.split(" ")[0],
    lastName: userInfo.family_name || userInfo.name?.split(" ").slice(1).join(" "),
    provider,
    providerId: userInfo.sub || userInfo.id,
  };
}