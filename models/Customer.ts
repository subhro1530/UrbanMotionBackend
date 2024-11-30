import mongoose, { Schema, Document } from "mongoose";

interface ICustomer extends Document {
  name: string;
  carCurrentlyBookedId: mongoose.Types.ObjectId | null;
  email: string;
  password: string;
  drivingLicenseId: string;
  verificationType: "aadhar" | "pan";
  verificationId: string;
}

const customerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  carCurrentlyBookedId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", default: null },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  drivingLicenseId: { type: String, required: true },
  verificationType: { type: String, enum: ["aadhar", "pan"], required: true },
  verificationId: { type: String, required: true },
});

export default mongoose.model<ICustomer>("Customer", customerSchema);