
'use client'
import useAuth from "@/hooks/useAuth";
import Link from 'next/link'
import { useState ,useEffect } from "react";
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";
const BlogComponent = (props) =>{

    const { title, content, category, tags, img  ,_id } =props.blog;
    const {userToken }  = useAuth()

    return (
      <div className="max-w-md mx-auto grow bg-white p-8 my-4 rounded-md shadow-md relative  h-full">

        <div className="absolute top-0 right-0 m-5"> 
        
          { userToken?   <Link href={`/blog/${_id}/edit`}> &#9998;</Link>:""}
         </div>
        <h2 className="text-2xl font-bold mb-4"> {title}  </h2>
        
        {img && <img src={img} alt={title} className="mb-4 w-full rounded-md" />}
        
        {props.withContent == true ? <div className="mb-4" dangerouslySetInnerHTML={{ __html: content }} />: "" }
      
  
        <div className="mb-4">
          <strong>Category:</strong> {category.name}
        </div>
  
        <div className="mb-4">
          <strong>Tags:</strong> {tags.map(tag => tag.name).join(', ')}
        </div>


        {props.withContent == true ?<CommentsList blogId={_id}/>: "" }
        {props.withContent == true ? <CommentForm blogId={_id} />: "" }
      </div>
    );
}



const CommentsList = ({ blogId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/comment/${blogId}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          console.error('Error fetching comments:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    fetchComments();
  }, [blogId]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments:</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id} className="border p-4 mb-2">
            {comment.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CommentForm = ({ blogId }) => {
  const [description, setDescription] = useState('');
  const router = useRouter()
  const handleSendComment = async () => {
    try {
      const response = await fetch('https://algohire-backend.vercel.app/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blog: blogId,
          description: description,
        }),
      });

      if (response.ok) {
        // Assuming you have a toast library like react-toastify
        toast.success('Comment posted successfully!');
        setDescription('');
        router.refresh()
      } else {
        console.error('Error sending comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending comment:', error.message);
    }
  };

  return (
    <div className="mt-8">
      <label htmlFor="commentDescription" className="block text-sm font-medium text-gray-700">
        Comment:
      </label>
      <textarea
        id="commentDescription"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        rows="4"
      ></textarea>
      <button
        onClick={handleSendComment}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Send Comment
      </button>
    </div>
  );
};
export default BlogComponent