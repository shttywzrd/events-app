import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.9hikx.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

let client;
let clientPromise;

export async function connectToDatabase() {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export default clientPromise;

export async function getFeaturedEvents() {
  const client = await connectToDatabase();
  const db = client.db();
  return await db
    .collection("events")
    .find({ isFeatured: true }, { projection: { _id: 0 } })
    .limit(20)
    .toArray();
}

export async function getAllEvents() {
  const client = await connectToDatabase();
  const db = client.db();
  return await db
    .collection("events")
    .find({}, { projection: { _id: 0 } })
    .limit(20)
    .toArray();
}

export async function getEventById(id) {
  const client = await connectToDatabase();
  const db = client.db();
  const result = await db
    .collection("events")
    .find({ id: id }, { projection: { _id: 0 } })
    .toArray();
  return result[0];
}

export async function getFilteredEvents(filter) {
  const client = await connectToDatabase();
  const db = client.db();
  return await db
    .collection("events")
    .find(filter, { projection: { _id: 0 } })
    .toArray();
}

export async function addNewsletterEmail(userEmail) {
  const client = await connectToDatabase();
  const db = client.db();
  return await db.collection("newsletter").insertOne({ email: userEmail });
}

export async function addComment(eventId, commentData) {
  const client = await connectToDatabase();
  const db = client.db();
  return await db.collection("comments").insertOne({
    id: eventId,
    email: commentData.email,
    username: commentData.name,
    text: commentData.text,
  });
}

export async function getComments(eventId) {
  const client = await connectToDatabase();
  const db = client.db();
  return await db
    .collection("comments")
    .find({ id: eventId }, { projection: { _id: 0 } })
    .toArray();
}
