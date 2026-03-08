import itemModel from '../models/itemModel.js'

export const createItem = async (req, res,next) => {
    try { 
        const { name, description, category, price, rating, hearts, } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` :"" ;

        const total = Number(price) * 1;

        const newItem = new itemModel({
            name,
            description,
            category,
            price,
            rating,
            hearts,
            total,
            imageUrl
        })

        const saved = await newItem.save();
        res.status(201).json(saved)
       
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: "Item with this name already exists" });
        }
        
    }
};

//  GET FUNCTION TO GET ALL THE ITEMS
export const getItems = async (req, res, next) => {
    try {
        const items = await itemModel.find().sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (err) {
        next(err);
    }
}

// DELETE FUNCTION TO DELETE AN ITEM
export const deleteItem = async (req, res, next) => {
    try {
        const removed = await itemModel.findByIdAndDelete(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ success: true, message: "Item deleted" });
    } catch (err) {
        next(err);
    }
}
