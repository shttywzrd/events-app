import { addComment, getComments } from "../../../lib/mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    const userName = req.body.name;
    const commentText = req.body.text;

    if (
      !userEmail ||
      userEmail.trim() === "" ||
      !userEmail.includes("@") ||
      !userName ||
      userName.trim() === "" ||
      !commentText ||
      commentText.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid comment data" });
      return;
    }

    await addComment(req.query.eventId, {
      email: userEmail,
      name: userName,
      text: commentText,
    });

    res.status(201).json({ message: "Comment added" });
  }
  if (req.method === "GET") {
    const comments = await getComments(req.query.eventId);
    res.status(201).json(comments);
  }
}

export default handler;
