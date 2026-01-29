import { Schema, Document, model } from "mongoose";


export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "superadmin";
  otp: number | null; 

}

const adminSchema = new Schema<IAdmin>(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"] 
    },
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      unique: true,
      lowercase: true,
      trim: true 
    },
    password: { 
      type: String, 
      required: [true, "Password is required"],
      minlength: 8 
    },
    role: { 
      type: String, 
      enum: ["admin", "superadmin"], 
      default: "admin" 
    },
    otp:{
        type:Number,
        default: null
    }
  },
  { 
    timestamps: true 
  }
);


const Admin = model<IAdmin>("Admin", adminSchema);

export default Admin;