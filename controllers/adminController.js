import User from "../models/User.js";




 export const getClients = async(req, res) => {
    const clients =await User.find({role:"client"}).select("-password")
    return res.status(200).json(clients)
}

