import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

const connect = async () => {
    mongoServer = await MongoMemoryServer.create();

    const mongoUri = mongoServer.getUri();
    mongoose.connect(mongoUri);
};

const close = async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
};

const clear = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};

export { connect, close, clear };
