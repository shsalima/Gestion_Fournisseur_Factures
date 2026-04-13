import Facture from "../models/Facture.js"
import Fournisseur from "../models/Fournisseur.js"
import Paiement from "../models/Paiement.js"



export const createFacture= async(req,res)=>{
    try{

        const {supplierId,amount,dueDate,description}=req.body
        const userId=req.user.id
    
        const facture=await Facture.create({
            userId,
            supplierId,
            amount,
            dueDate,
            description
        })
    
        return res.status(201).json({message:"facture created",facture})
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    
}

export const getFactures=async (req,res)=>{
    try{

        const userId=req.user.id
        

        const{ status,supplierId}=req.query

        const filter={userId}


        if(status){
            filter.status=status

        }
        if(supplierId){
            filter.supplierId=supplierId
        }

        

        const facture=await Facture.find(filter)
        .populate("supplierId","name")
        .sort({createAt:-1})
       


        const factues= facture.map((f)=>({
            id:f._id,
            suplierId : f.supplierId._id,
            supplierName: f.supplierId.name,
            amount:f.amount,
            dueDate:f.dueDate,
            description: f.description,
            status: f.status,
            totalPaid: f.totalPaid,
            remainingAmount: f.amount - f.totalPaid,
            createdAt: f.createdAt,



        } )
    )
    res.status(200).json({factues});
    }catch (error) {
    res.status(500).json({ message: error.message });
  }
}



export const getFactureId = async (req, res) => {
  try {
    const facture = await Facture.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).populate("supplierId", "name");

    if (!facture) {
      return res.status(404).json({ message: "Facture non trouvé" });
    }

    res.status(200).json({
      id: facture._id,
      supplierId: facture.supplierId._id,
      supplierName: facture.supplierId.name,
      amount: facture.amount,
      dueDate: facture.dueDate,
      description: facture.description,
      status: facture.status,
      totalPaid: facture.totalPaid,
      remainingAmount: facture.amount - facture.totalPaid,
      createdAt: facture.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateFacture = async (req, res) => {
  try {
    const facture = req.facture;

    
    if (facture.status === "paid") {
      return res.status(422).json({
        message: "impossible de modifier une facture payée",
      });
    }

    const { dueDate, description } = req.body;

 
   
    if (dueDate) facture.dueDate = dueDate;
    if (description) facture.description = description;

    const updatedFacture = await facture.save();

    return res.status(200).json({
      message: "facture modifier avec succés",
      facture: updatedFacture,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};



export const deleteFacture = async (req, res) => {
  try {
    const facture = req.facture;

 
    const payments = await Paiement.find({ factureId: facture._id });

    if (payments.length > 0) {
      return res.status(422).json({
        message:
          "suppression impossible des paiements existent pour cette facture",
      });
    }

  
    await facture.deleteOne();

    return res.status(200).json({
      message: "facture supprimée succés",
    });

   

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};






