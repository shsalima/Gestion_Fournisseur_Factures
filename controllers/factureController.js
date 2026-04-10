import Facture from "../models/Facture.js"
import Fournisseur from "../models/Fournisseur.js"



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

        const{ status,supplierId,page=1,limit=15}=req.query

        const filter={userId}

        if(status){
            filter.status=status

        }
        if(supplierId){
            filter.supplierId=supplierId
        }

        const skip=(page-1)*limit

        const facture=await Facture.find(filter)
        .populate("supplierId","name")
        .sort({createAt:-1})
        .skip(skip)
        .limit(Number(limit))


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
    res.status(200).json({ page: Number(page),factues});
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



