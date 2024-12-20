import React, { useEffect, useState } from 'react'
import PostService from '../services/post.service'
import Swal from 'sweetalert2'
import Post from '../components/Post'

const Home = () => {
  const [posts , setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getPosts()
        if(response.status === 200){
          setPosts(response.data)
        }
      } catch (error) {
        Swal.fire({
                title: "Home",
                text: error?.response?.data?.message || error.message,
                icon: "error",
              });
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <div className='flex flex-col space-y-6'>
        {
          posts.length > 0 && posts.map((post, index) => {
            return <Post key ={index} {...post}/>
          })
        }
      </div>
    </>
  )
}

export default Home