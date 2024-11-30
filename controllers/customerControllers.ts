import { Request, Response } from "express";
import Customer from "../models/Customer";
import { Session } from "../models/Session";

export const addCustomer = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
          return res.status(400).json({ message: "Customer already exists" });
        }
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error adding customer", error });
  }
};

export const verifyCustomer = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const customer = await Customer.findOne({ email, password });
      if (!customer) {
        return res.status(401).json({ verified: false, message: "Invalid credentials" });
      }
  
      // Create a session
      const session = await Session.create({ data: customer });
      return res.status(200).json({ verified: true, sessionId: session._id });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error", error: err });
    }
  };

  export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving customers", error });
    }
};