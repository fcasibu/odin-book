import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export default async function initializeMongoServer() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri);

  mongoose.connection.on("error", (e) => {
    if (e.message.code === "ETIMEDOUT") {
      mongoose.connect(mongoUri);
    }
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
}
