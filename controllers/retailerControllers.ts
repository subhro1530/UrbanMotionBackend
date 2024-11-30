import { Request, Response } from "express";
import  Retailer  from "../models/Retailer";
import { Session } from "../models/Session";

export const addRetailer = async (req: Request, res: Response) => {
  const { name, email, password, ...otherDetails } = req.body;

  try {
    const existingRetailer = await Retailer.findOne({ email });
    if (existingRetailer) {
      return res.status(400).json({ message: "Retailer already exists" });
    }

    const newRetailer = await Retailer.create({ name, email, password, ...otherDetails });
    return res.status(201).json({ message: "Retailer added successfully", retailer: newRetailer });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};

export const verifyRetailer = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const retailer = await Retailer.findOne({ email, password });
      if (!retailer) {
        return res.status(401).json({ verified: false, message: "Invalid credentials" });
      }
  
      // Create a session
      const session = await Session.create({ data: retailer });
      return res.status(200).json({ verified: true, sessionId: session._id });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error", error: err });
    }
  };

  export const getAllRetailers = async (req: Request, res: Response) => {
    try {
      const retailers = await Retailer.find({});
      return res.status(200).json({ retailers });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error", error: err });
    }
  };