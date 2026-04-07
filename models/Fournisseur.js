import mongoose from "mongoose";

const fournisseurSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

  
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      address: {
        type: String,
      },
  

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Fournisseur", fournisseurSchema);