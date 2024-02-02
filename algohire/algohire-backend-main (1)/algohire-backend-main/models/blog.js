const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  img:{
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
});
blogSchema.methods.incrementViews = async function () {
  this.views += 1;
  await this.save();
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
