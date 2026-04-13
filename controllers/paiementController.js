import Paiement from "../models/Paiement.js"




export const createPaiement = async (req, res) => {
  try {
    const facture = req.facture;
    const { amount, paymentDate, mode_paiement, note } = req.body;

   
    const payments = await Paiement.find({
      factureId: facture._id,
    });

    const totalPaid = payments.reduce(
      (sum, p) => sum + p.amount,
      0);

    const remainingAmount = facture.amount - totalPaid;

    
    if (amount > remainingAmount) {
      return res.status(422).json({
        message: `Montant dépasse le restant: ${remainingAmount}`,
      });
    }

    
    const paiement = await Paiement.create({
      factureId: facture._id,  
      userId: req.user.id,     
      amount,
      paymentDate,
      mode_paiement,
      note,
    });

  
    const newTotal = totalPaid + amount;

    facture.totalPaid = newTotal;
    facture.remianingAmount = facture.amount - newTotal; 

    if (newTotal === facture.amount) {
      facture.status = "paid";
    } else {
      facture.status = "partially_paid";
    }

    await facture.save();

    return res.status(201).json({
      message: "paiement créé avec succès",
      paiement,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const getPaiementByFacture = async (req, res) => {
  try {
    const facture = req.facture;


    const paiements = await Paiement.find({factureId: facture._id,});


    const totalPaid = paiements.reduce((sum, p) => sum + p.amount, 0);

   
    const remianingAmount = facture.amount - totalPaid;

    return res.status(200).json({
      payments: paiements.map((p) => ({
        id: p._id,
        factureId: p.factureId,
        userId: p.user,
        amount: p.amount,
        paymentDate: p.paymentDate,
        mode_paiement: p.mode_paiement,
        createdAt: p.createdAt,
      })),

      result: {
        totalPaid,
        remianingAmount,
        status: facture.status,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};