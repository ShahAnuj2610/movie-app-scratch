
export const authConfig = {
  audience: process.env.AUTH_AUDIENCE,
  clientID: process.env.AUTH_CLIENT_ID,
  domain: process.env.AUTH_DOMAIN,
  redirectUri: 'https://localhost:1357/authenticate',
};

export const appBaseConfig = {
  url: process.env.APPBASE_URL,
  app: process.env.APPBASE_APP_NAME,
  credentials: process.env.APPBASE_APP_CREDENTIALS,
};
