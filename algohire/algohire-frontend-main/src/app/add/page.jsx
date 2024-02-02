"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useForm ,Controller } from 'react-hook-form'
import AllowedRoles from '@/components/Auth'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
const AddBlogPage = () => {
  return (
    <>
    <AllowedRoles>
    <AddBlogComponent />
    </AllowedRoles>
    
   
    
    </>
  );
};
export default AddBlogPage
const AddBlogComponent = () => {
  return (
    <>
     
    

        <div>

            <BlogForm />
        </div>
     
    </>
  );
};



const BlogForm = () => {
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading state as true
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch data from the Tags API
          const tagsResponse = await axios.get('https://algohire-backend.vercel.app/api/tags');
          setTags(tagsResponse.data);
  
          // Fetch data from the Categories API
          const categoriesResponse = await axios.get('https://algohire-backend.vercel.app/api/categories');
          setCategories(categoriesResponse.data);
  
          // Set loading to false after data is fetched
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error.message);
          setLoading(false); // Set loading to false in case of an error
        }
      };
  
      fetchData();
    }, []);
  
    const { handleSubmit, control, reset, register } = useForm({
      defaultValues: {
        title: '',
        img: '',
        content: '',
        category: '',
        tags: [],
      },
    });
  
    const onSubmit = async (data) => {
        

            try{
                setLoading(true)
             let response =   await axios.post('https://algohire-backend.vercel.app/api/blog' , data)

             if (response.status == 201){


                toast.success('blog created')
                reset()
             }
             else{
                toast.error('something went wrong')
             }
               
            }   catch(err) {

                console.log(`error occured while creating the blog ${err}` )
            }
            setLoading(false)
    };
  
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
        {loading ? (
          'Loading...'
        ) : (
          <RenderFormUi
            handleSubmit={handleSubmit}
            control={control}
            register={register}
            tags={tags}
            categories={categories}
            onSubmit={onSubmit}
          />
        )}
      </div>
    );
  };
  
  const RenderFormUi = (props) => {
    const { handleSubmit, register, onSubmit, tags, categories, control } = props;
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            {...register('img')}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <select
            id="tags"
            multiple
            {...register('tags')}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            {tags.map((tag, index) => (
              <option key={index} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
  
        <div className="mb-4">
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <select
            id="categories"
            {...register('category')}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            {categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
  
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    );
  };
