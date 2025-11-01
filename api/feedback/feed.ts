import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase } from "../db/connect";

import Feedback from "../models/Feedback";

export default async function handler(req: VercelRequest, res: VercelResponse) {
await connectToDatabase();


  if (req.method === "POST") {
    const { message, type, page } = req.body;
    const feedback = await Feedback.create({
      message,
      type,
      page,
      userAgent: req.headers["user-agent"],
    });
    return res.status(201).json({ success: true, feedback });
  }

  if (req.method === "GET") {
    const feedbacks = await Feedback.find().sort({ timestamp: -1 });
    return res.status(200).json(feedbacks);
  }

  res.status(405).json({ error: "Method not allowed" });
}
