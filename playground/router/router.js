async function router(fastify, _opts) {
  fastify.get("/get", async (request, reply) => {
    const callbackName = request.query.cb;
    return reply.header("Content-Type", "text/javascript").send(`${callbackName}(${JSON.stringify({ hello: "world" })})`);
  });
  fastify.get("/", async (_request, reply) => {
    return reply.sendFile("index.html");
  });
}
export default router;
