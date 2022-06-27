import meaning from "meaning-of-life";

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === "OPTIONS") {
    return handleOptions(request)
  } else if (request.method === "GET") {
    return handleGet(request)
  } else {
    return new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    })
  }
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
}

function handleOptions(request) {
  if (request.headers.get("Origin") !== null &&
      request.headers.get("Access-Control-Request-Method") !== null &&
      request.headers.get("Access-Control-Request-Headers") !== null) {
    // Handle CORS pre-flight request.
    return new Response(null, {
      headers: corsHeaders
    })
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        "Allow": "GET, HEAD, POST, OPTIONS",
      }
    })
  }
}

async function handleGet(request) {
  const token = request.headers.get('Authorization');
  const { jwtVerify } = require('jose');
  const { createRemoteJWKSet } = require('jose');
  const keypromise = await fetch("https://dev-qy-iakti.us.auth0.com/.well-known/jwks.json");
  const jwks = createRemoteJWKSet(new URL('https://dev-qy-iakti.us.auth0.com/.well-known/jwks.json'));
  const { payload, protectedHeader } = await jwtVerify(token.replaceAll('"',''), jwks, {
    iss: 'dev-qy-iakti.us.auth0.com/',
    aud: 'eEBy63jCkRcKBsKpAfOWit5hg8JgZzpG'
  })

  console.log(payload.nickname)

  return new Response(JSON.stringify(meaning), {
    headers: {
      ...corsHeaders,
    }
  })
}
