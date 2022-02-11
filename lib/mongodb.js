import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.9hikx.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

export async function connectToDatabase() {
  if (global.connection) return global.connection;
  if (!global.connectionPromise) {
    global.connectionPromise = MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  const client = await global.connectionPromise;
  const db = await client.db();
  global.connection = {
    client,
    db,
  };
  return global.connection;
}

export async function getFeaturedEvents() {
  const { db } = await connectToDatabase();
  return await db
    .collection("events")
    .find({ isFeatured: true }, { projection: { _id: 0 } })
    .limit(20)
    .toArray();
}

export async function getAllEvents() {
  const { db } = await connectToDatabase();
  return await db
    .collection("events")
    .find({}, { projection: { _id: 0 } })
    .limit(20)
    .toArray();
}

export async function getEventById(id) {
  const { db } = await connectToDatabase();
  const result = await db
    .collection("events")
    .find({ id: id }, { projection: { _id: 0 } })
    .toArray();
  return result[0];
}

export async function getFilteredEvents(filter) {
  const { db } = await connectToDatabase();
  console.log(filter);
  return await db
    .collection("events")
    .find(filter, { projection: { _id: 0 } })
    .toArray();
}

export async function addNewsletterEmail(userEmail) {
  const { db } = await connectToDatabase();
  return await db.collection("newsletter").insertOne({ email: userEmail });
}
