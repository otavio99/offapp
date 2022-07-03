addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === "OPTIONS") {
    return handleOptions(request)
  }

  const { authenticate } = require("./../auth.ts");
  const res = await authenticate(request);
  if (!res) {
    return new Response(null, {
      status: 403,
      statusText: "Forbidden, user does not have permission",
      headers: {
        ...corsHeaders,
      }
    })
  }

  if (request.method === "GET" ) {
    return handleGet(request)
  } else if (request.method === "POST") {
    return handlePost(request)
  } else if (request.method === "HEAD") {
    return new Response(null, {
      status: 200,
      headers: {
        ...corsHeaders,
      }
    })
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
  "Access-Control-Allow-Headers": "Content-Type,Authorization,Access-Control-Allow-Origin",
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
  return new Response(JSON.stringify("42"), {
    headers: {
      ...corsHeaders,
    }
  })
}

async function handlePost(request) {
  const body = await request.json();

  // await TESTKV.put('name', body['name']);
  return new Response(JSON.stringify(body), {
    headers: {
      ...corsHeaders,
    }
  })
}
