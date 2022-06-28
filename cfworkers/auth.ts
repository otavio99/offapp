

export async function authenticate (request) {
  const { getAllowList } = require('./allowlist.ts');
  const token = request.headers.get('Authorization');
  const { jwtVerify } = require('jose');
  const { createRemoteJWKSet } = require('jose');
  const keypromise = await fetch("https://dev-qy-iakti.us.auth0.com/.well-known/jwks.json");
  const jwks = createRemoteJWKSet(new URL('https://dev-qy-iakti.us.auth0.com/.well-known/jwks.json'));
  const { payload, protectedHeader } = await jwtVerify(token.replaceAll('"',''), jwks, {
    iss: 'dev-qy-iakti.us.auth0.com/',
    aud: 'eEBy63jCkRcKBsKpAfOWit5hg8JgZzpG'
  });

  return getAllowList().includes(payload.nickname);
}
