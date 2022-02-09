import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.9hikx.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
    );
    const db = client.db();
    await db.collection("newsletter").insertOne({ email: userEmail });
    await client.close();
    res.status(201).json({ message: "Signed Up!" });
  }
}

export default handler;
