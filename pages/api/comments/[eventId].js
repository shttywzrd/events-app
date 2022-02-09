function handler(req, res) {
  const eventId = req.query;

  if (req.method === "GET") {
    res.status(200).json({ message: "Success", comments: shit });
  }
  if (req.method === "POST") {
    res.status(200).json({ message: "Comment added" });
  }
  if (req.method && req.method !== "HEAD") {
    res.status(405).json({ message: `Method ${req.method} is not supported.` });
  }
  res.status(400).json({ message: "Bad request" });
}

export default handler;
