
"use client"
import Image from "next/image";
import { useState, useEffect ,useMemo } from "react";
import axios from 'axios'


export default function Home() {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://algohire-backend.vercel.app/api/blog');
        setBlogs(response.data);
        const tagsResponse = await axios.get('https://algohire-backend.vercel.app/api/tags');
        setTags(tagsResponse.data);

        const categoriesResponse = await axios.get('https://algohire-backend.vercel.app/api/categories');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Blogs</h1>

      {blogs == null ? <p>Loading...</p> : <Blogs blogs={blogs} tags={tags} categories={categories} />}
    </div>
  );
}

// Blogs.js

import BlogComponent from '@/components/blog';
import Link from 'next/link'
const Blogs = (props) => {
  const { blogs, tags, categories } = props;
  const [filterTitle, setFilterTitle] = useState('');
  const [filterTags, setFilterTags] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const categoryMatch = filterCategories.length === 0 || filterCategories.includes(blog.category._id);
      const tagsMatch =
        filterTags.length === 0 || filterTags.every((tag) => blog.tags.some((blogTag) => blogTag._id === tag));
      const titleMatch = filterTitle ? blog.title.toLowerCase().includes(filterTitle.toLowerCase()) : true;

      return categoryMatch && tagsMatch && titleMatch;
    });
  }, [blogs, filterTitle, filterTags, filterCategories]);

  const handleCategoryChange = (e) => {
    setFilterCategories(Array.from(e.target.selectedOptions, (option) => option.value));
  };

  const handleTagChange = (e) => {
    setFilterTags(Array.from(e.target.selectedOptions, (option) => option.value));
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex justify-between mb-4">
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700">Category:</label>
          <select
            id="categories"
            multiple
            value={filterCategories}
            onChange={handleCategoryChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            {categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700">Tags:</label>
          <select
            id="tags"
            multiple
            value={filterTags}
            onChange={handleTagChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            {tags.map((tag, index) => (
              <option key={index} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Filtered Blogs */}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-5">
        {filteredBlogs.map((blog, index) => (
          <Link key={index} href={`blog/${blog._id}`}>
          <BlogComponent key={index} blog={blog} withContent={false} />


          </Link>
        ))}
      </div>
    </div>
  );
};
