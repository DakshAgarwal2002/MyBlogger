import React,{useState,useEffect,useRef} from 'react'
import MyPostItem from './MyPostItem'
const Myposts = () => {
  useEffect(() => {
    fetchyourposts(sessionStorage.getItem('user'))
  }, [])
  const [posts, setPosts] = useState([])

  // http://localhost:5000/api/posts/fetchyourposts
  const fetchyourposts = async (user) => {
    const response = await fetch(`https://myblogger-backend.onrender.com/api/posts/fetchyourposts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user}),
    });
    const json = await response.json()
    // console.log(json)
    setPosts(json);
  }
  return (
    <div className='my-3'>
      <h1 className='text-center'>My Posts</h1>
      {posts.length===0 && <h3>No Posts</h3>}
        {posts.length!==0 && posts.map((post)=>{
          return <MyPostItem post={post} fetchyourposts={fetchyourposts} posts={posts}/>
        })}
    </div>
  )
}

export default Myposts