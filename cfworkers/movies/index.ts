addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === "OPTIONS") {
    return handleOptions(request)
  }

  //verify user token before handling the request
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

  ///remove this if not necessary
  // try {
  //   console.log("test")
  // } catch (error) {
  //   if (error.message.includes("exp")){
  //     return new Response(null, {
  //       status: 401,
  //       headers: {
  //         ...corsHeaders,
  //       }
  //     })
  //   }
  // }

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
  const value = await MOVIE_KV.list();
  const persistedMovies = JSON.parse(JSON.stringify(value.keys));
  let result = [];

  try {
    for (let i = 0; i < persistedMovies.length; i++) {
      const key = persistedMovies[i].name;
      const movie = await MOVIE_KV.get(key);
      result.push(movie);
    }
  } catch (error) {
    console.log(error)
  }

  return new Response(JSON.stringify(result), {
    headers: {
      ...corsHeaders,
    }
  })
}

//check if movie is already persisted, if so, then it should be 'update',
  // the timestamp of the object should be considered in case of dispute
// if not, then it should be 'add'
// if its deleted, then 'delete'
  // its deleted if exists in kv but not in the resource received (movies)
  // so all movies should be loaded in the localStorage for the user in the first login
  // in order to maintain consistency
async function handlePost(request) {
  const body = await request.json();
  const movies = JSON.parse(body);
  const value = await MOVIE_KV.list();
  const persistedMovies = JSON.parse(JSON.stringify(value.keys));

  try {
    // 1 - add
    //dunno what to do here,
    add(movies, persistedMovies);

    // JSON.parse(body).forEach((movie) => {
    //   const persistMovie = async () => {
    //     await MOVIE_KV.put(movie.id, JSON.stringify(movie))
    //   }
    //   persistMovie();
    // })
  } catch (error) {
    console.log(error)
  }

  // await MOVIE_KV.put('name', body['name']);
  return new Response(JSON.stringify(body), {
    headers: {
      ...corsHeaders,
    }
  })
}

async function add(movie, persistedMovies) {
  for (let i = 0; i < persistedMovies.length; i++) {
    // const key = persistedMovies[i].name;
    // const moviePersiste = await MOVIE_KV.get(key);
    // let moviesFiltered = movies.filter(() => {})
  }
}
// async function update(movie) {
// }
// async function delete(movie) {
// }
