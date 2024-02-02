const path = require('path');
const Tag = require(path.resolve(DB_MODEL,'tag'))
const dbconnect = require(path.resolve(__dirname,'..','dbconnect'))


module.exports ={

    'create':async (req,res) =>{

        await dbconnect()
        try {
            const tag = new Tag(req.body);
            await tag.save();
            res.status(201).json(tag);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },
    'search':async (req,res) =>{
        await dbconnect()
        try {
            const tags = await Tag.find();
            res.status(200).json(tags);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
}