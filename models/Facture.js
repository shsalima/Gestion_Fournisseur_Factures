import mongoose from "mongoose";

const factureSchema = new mongoose.Schema(
  {
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fournisseur",
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
    dueDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["unpaid", "partially_paid", "paid"],
      default: "unpaid",
    },
    totalPaid: {
  type: Number,
  default: 0,
},
  },
  { timestamps: true }
);

export default mongoose.model("Facture", factureSchema);