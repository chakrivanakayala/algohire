const path = require('path');
const Category = require(path.resolve(DB_MODEL,'categories'))
const dbconnect = require(path.resolve(__dirname,'..','dbconnect'))

module.exports ={
    'create': async (req,res) =>{

        await dbconnect()
        try {
            const category = new Category(req.body);
            await category.save();
            res.status(201).json(category);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },
    search : async (req,res) =>{
        await dbconnect()
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
}