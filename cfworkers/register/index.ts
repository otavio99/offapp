import meaning from "meaning-of-life";

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response(meaning)
}
