import { createServer } from "http";
import app from "./app";

function normalizePort(val: string) {
  let port = parseInt(val, 10);

  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

let port = normalizePort(process.env.PORT || "3000");

app.set("port", port);
const server = createServer(app);

server.listen(port);

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== "listen") throw error;

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);

    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);

    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  console.log("Listening on " + bind);
}

server.on("error", onError);
server.on("listening", onListening);
