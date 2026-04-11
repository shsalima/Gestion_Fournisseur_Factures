// models/payment.js

import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    factureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facture",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,

    },

    paymentDate: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },

    mode_paiement: {
      type: String,
      required: true,
      enum: ["espéces", "chéque", "virement"],
    },
  },
  {
    timestamps: true, 
  }
);
const Paiement=mongoose.model("Paiement",paymentSchema)

export default Paiement