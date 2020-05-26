const fs = require('fs');

const {
  MIXPANEL_TOKEN,
  APPBASE_APP_CREDENTIALS,
  APPBASE_APP_NAME,
  APPBASE_URL,
  AUTH_AUDIENCE,
  AUTH_CLIENT_ID,
  AUTH_DOMAIN,
} = process.env;

console.log('Here', process.env);

const envVars = `
MIXPANEL_TOKEN=${MIXPANEL_TOKEN}
APPBASE_URL=${APPBASE_URL}
APPBASE_APP_NAME=${APPBASE_APP_NAME}
APPBASE_APP_CREDENTIALS=${APPBASE_APP_CREDENTIALS}
AUTH_AUDIENCE=${AUTH_AUDIENCE}
AUTH_CLIENT_ID=${AUTH_CLIENT_ID}
AUTH_DOMAIN=${AUTH_DOMAIN}
`;

fs.writeFileSync('./.env', envVars);
