import { addNewsletterEmail, connectToDatabase } from "../../lib/mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    await addNewsletterEmail(userEmail);

    res.status(201).json({ message: "Signed Up!" });
  }
}

export default handler;
