import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase } from "../db/connect";

import Feedback from "../models/Feedback";

export default async function handler(req: VercelRequest, res: VercelResponse) {
await connectToDatabase();


  if (req.method === "POST") {
    const { message, type } = req.body;
    await Feedback.create({ message, type: type || "log" });
    return res.status(200).json({ status: "logged" });
  }

  res.status(405).json({ error: "Method not allowed" });
}
