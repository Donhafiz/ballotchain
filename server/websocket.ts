import { createServer } from "http";
import { Server } from "socket.io";
import { parse } from "url";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  // Track connected clients
  const rooms = new Map<string, Set<string>>();

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join election room
    socket.on("join-election", (electionId: string) => {
      socket.join(electionId);
      if (!rooms.has(electionId)) rooms.set(electionId, new Set());
      rooms.get(electionId)!.add(socket.id);
      io.to(electionId).emit("viewer-count", rooms.get(electionId)!.size);
    });

    // Leave election room
    socket.on("leave-election", (electionId: string) => {
      socket.leave(electionId);
      rooms.get(electionId)?.delete(socket.id);
      io.to(electionId).emit("viewer-count", rooms.get(electionId)?.size || 0);
    });

    // Vote cast event
    socket.on("vote-cast", (data: { electionId: string; candidateId: string }) => {
      io.to(data.electionId).emit("new-vote", {
        candidateId: data.candidateId,
        timestamp: new Date().toISOString(),
      });
    });

    // Live results update
    socket.on("results-update", (data: { electionId: string; results: any }) => {
      io.to(data.electionId).emit("live-results", data.results);
    });

    // Chat messages for election observers
    socket.on("chat-message", (data: { electionId: string; message: string; user: string }) => {
      io.to(data.electionId).emit("chat-message", {
        user: data.user,
        message: data.message,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on("disconnect", () => {
      rooms.forEach((clients, room) => {
        clients.delete(socket.id);
        io.to(room).emit("viewer-count", clients.size);
      });
    });
  });

  const PORT = process.env.PORT || 8000;
  server.listen(PORT, () => {
    console.log(`BallotChain server running on port ${PORT}`);
  });
});