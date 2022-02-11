import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.9hikx.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = await MongoClient.connect(uri);
    const db = await client.db();

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (e) {
    console.error(e);
  }
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
  const result = await db
    .collection("events")
    .find(filter, { projection: { _id: 0 } })
    .toArray();
  return result[0];
}

export async function addNewsletterEmail(userEmail) {
  const { db } = await connectToDatabase();
  return await db.collection("newsletter").insertOne({ email: userEmail });
}
