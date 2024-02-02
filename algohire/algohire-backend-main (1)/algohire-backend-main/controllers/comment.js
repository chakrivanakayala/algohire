
const path = require('path');
const Comment = require(path.resolve(DB_MODEL,'comment'))
const dbconnect = require(path.resolve(__dirname,'..','dbconnect'))


module.exports = {

    'create':async (req,res) =>{
       await dbconnect()
        try {
            const comment = new Comment(req.body);
            await comment.save();
            res.status(201).json(comment);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },
    'find': async (req,res) =>{
        await dbconnect()
        try {
            const blogId = req.params.blogId;
            const comments = await Comment.find({ blog: blogId });
            res.status(200).json(comments);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
}