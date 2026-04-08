import Fournisseur from "../models/Fournisseur.js";

export const createFournissoeur = async (req, res) => {
  try {
    const { name, email, phone, adress } = req.body;
    const fournisseur = await Fournisseur.create({
      name,
      email,
      phone,
      adress,
      user: req.user._id,
    });
    return res
      .status(201)
      .json({ message: "fournisseur creé avec succés", fournisseur });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFournisseurs = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;

    const query = { user: req.user._id };

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const suppliers = await Fournisseur.find(query)
      .select("name email phone address createdAt")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return res.status(200).json({
      page: parseInt(page),
      limit: parseInt(limit),
      fournisseurs: suppliers,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getSupplier = (req, res) => {
  res.status(200).json(req.fournisseur);
};

export const deleteFournisseur = async (req, res) => {
  try {
    const fournisseur = req.fournisseur;

    await fournisseur.deleteOne();
    res.status(200).json({ message: "fournisseur supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const modifierFournisseur = async (req, res) => {
  try {
    const { name, email, phone, adress } = req.body;

    const fournisseur = req.fournisseur;

    fournisseur.name = name || fournisseur.name;
    fournisseur.email = email || fournisseur.email;
    fournisseur.adress = adress || fournisseur.adress;
    fournisseur.phone = phone || fournisseur.phone;

    fournisseur.save();
    return res
      .status(200)
      .json({ message: "modifier avec succe", fournisseur });
  } catch (err) {
    console.log(err);
    console.log(err);

    res.status(500).json({ message: err.message });
  }
};
