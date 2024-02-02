

const path = require('path');
const Blog = require(path.resolve(DB_MODEL,'blog'))
const dbconnect = require(path.resolve(__dirname,'..','dbconnect'))

module.exports = {

    'create': async (req,res) =>{

        await dbconnect()
        try {
            const blog = new Blog(req.body);
            await blog.save();
            res.status(201).json(blog);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },
    
    'search':async (req,res) =>{
        await dbconnect()
        try {
            const blogs = await Blog.find().populate('category').populate('tags');
            res.status(200).json(blogs);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },

    'find': async (req,res)=>{
        await dbconnect()
        try {
            const blogId = req.params.blogId;
            const blog = await Blog.findById(blogId).populate('category' ,).populate('tags');
            if (!blog) {
              return res.status(404).json({ message: 'Blog not found' });
            }
            await blog.incrementViews();
            res.status(200).json(blog);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },

    'update':async (req,res) =>{
        await dbconnect()
        try {
            const blogId = req.params.blogId;
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
            if (!updatedBlog) {
              return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json(updatedBlog);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },
    'delete': async (req,res) =>{
        await dbconnect()
        try {
            const blogId = req.params.blogId;
            const deletedBlog = await Blog.findByIdAndDelete(blogId);
            if (!deletedBlog) {
              return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json({ message: 'Blog deleted successfully' });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
}