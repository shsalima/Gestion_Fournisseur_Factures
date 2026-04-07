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

const Fournisseur=mongoose.model("Fournisseur", fournisseurSchema);
export default Fournisseur;