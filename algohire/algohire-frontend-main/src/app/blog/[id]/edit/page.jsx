
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useForm ,Controller } from 'react-hook-form'
import AllowedRoles from '@/components/Auth'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
const Editpage = ({params}) =>{



    return (<>
           <AllowedRoles>
            <EditBlog  _id={params.id}/>
    </AllowedRoles>
        </>)
}


const EditBlog = ({_id}) =>{

    const [blog, Setblog] = useState(null); 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const Response = await axios.get(`https://algohire-backend.vercel.app/api/blog/${_id}`);
            Setblog(Response.data);
            
          } catch (error) {
            console.error('Error fetching data:', error.message);
           
          }
        };
    
        fetchData();
      }, [_id]);
    return (
            <>
        


                {blog==null? "loading..":<BlogForm blog={blog} />}
            </>
    )
}


import { useRouter } from 'next/navigation';    
const BlogForm = (props) => {
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); 

    const router = useRouter()
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
  
   let st =  props.blog.tags.map((t ) => {

       return t?._id
    })

    let sc = props.blog.category['_id']
    const defaultValues = {

        title:props.blog.title,
        img: props.blog.img,
        content : props.blog.content,
        tags: st,
        category:sc

    }
   
    const { handleSubmit, control, reset, register , } = useForm({
      defaultValues: defaultValues
    });
  
    const onSubmit = async (data) => {
        
            console.log( 'akdljflkajd',data ,)
            try{
                setLoading(true)
             let response =   await axios.put(`https://algohire-backend.vercel.app/api/blog/${props.blog._id}` , data)

             if (response.status == 200){


                toast.success('blog updated')
                router.refresh()
             }
             else{
                toast.error('something went wrong')
             }
               
            }   catch(err) {

                console.log(`error occured while creating the blog ${err}` )
            }
            setLoading(false)
    };
    
    const handleDelete = async () =>{

        try {
            let response = await axios.delete(`https://algohire-backend.vercel.app/api/blog/${props.blog._id}` )
            if (response.status==200){
                toast.success('deleted successfully')
                router.replace('/')
            }
            else{

                toast.error('something went wrong')
            }
        }
        catch(err) {
            console.log(`err occured while deleteing${err}`)
        }
    
      }
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Edit blog</h2>
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
            handleDelete={handleDelete}
            
          />
        )}
      </div>
    );
  };
  
 
  const RenderFormUi = (props) => {
    const { handleSubmit, register, onSubmit,  tags, categories, control ,handleDelete} = props;
  
    return (


        
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto relative py-8 z-0">

      <button onClick={handleDelete}  className='absolute top-0 right-0 py-3 px-5 bg-red-500 hover:bg-red-700 rounded-full'> Delete </button>
        <div className="m">
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

  export default Editpage