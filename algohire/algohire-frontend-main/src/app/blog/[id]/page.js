
'use client'
import {useState ,useEffect } from 'react'
import BlogComponent from '@/components/blog';
import axios from 'axios';
const BlogPage = ({params}) =>{

   
    const [blog, setBlog] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://algohire-backend.vercel.app/api/blog/${params.id}`);
          setBlog(response.data);
         
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
  
      fetchData();
    }, [params.id]);
  
    return (<div>

        { blog == null ? "loading ..": <BlogComponent withContent={true} blog={blog}/>}

    </div>)
}

export default  BlogPage