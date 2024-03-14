import React,{useState,useEffect,useRef} from 'react'
import PostItem from './PostItem'

const Board = () => {
  const ref = useRef(null);
  const refClose = useRef(null);
  const [newNote, setNewNote] = useState({post_title:"",description:"",image_url:""})
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [searchItem, setSearchItem] = useState([])
  useEffect(() => {
    fetchallposts(sessionStorage.getItem('board_name'))
  }, [])
  

  const onChange3 = (e) => {
    setSearch(e.target.value)
    const temp=posts.filter((item)=>{
        const searchTerm = search.toLowerCase();
        const fullName = item.post_title.toLowerCase();
        return (
            fullName.startsWith(searchTerm))})
            console.log(temp);
    setSearchItem(temp);
    
}
// http://localhost:5000/api/posts/fetchallposts
  const fetchallposts = async (board_name) => {
    const response = await fetch(`https://myblogger-backend.onrender.com/api/posts/fetchallposts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({board_name}),
    });
    const json = await response.json()
    // console.log(json)
    setPosts(json);
  }

  const addpost = async (user, board_name, post_title,description,image_url) => {
    const response = await fetch(`https://myblogger-backend.onrender.com/api/posts/addpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user, board_name, post_title,description,image_url}),
    });
    setNewNote({post_title:"",description:"",image_url:""})
    fetchallposts(sessionStorage.getItem('board_name'))
  }


  const onChange2 = (e) => {
    setNewNote({...newNote, [e.target.name]: e.target.value})
}

const handleClick3 = async (e) => {
    e.preventDefault();
    addpost(sessionStorage.getItem('user'),sessionStorage.getItem('board_name'),newNote.post_title,newNote.description,newNote.image_url)
    refClose.current.click();
  }

  const addPost=()=>{
    ref.current.click();
}
  return (
    <div className='my-3'>

<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal1">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add Post</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Add Post Title</label>
                <input type="text" className="form-control" name="post_title" value={newNote.post_title} onChange={onChange2}/>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Add Description</label>
                <textarea className="form-control" name="description" rows="3" value={newNote.description} onChange={onChange2}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Add Image</label>
                <textarea className="form-control" name="image_url" rows="3" value={newNote.image_url} onChange={onChange2}></textarea>
              </div>
              

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick3}>Save changes</button>
            </div>
          </div>
        </div>
      </div>  

        <div className="card BoardCard">
          <div className="card-body" style={{ backgroundImage:`url(${sessionStorage.getItem('board_image')})`,height:'10rem',color:'white' }}>
            <h1 className='text-center mb-4'>{sessionStorage.getItem('board_name')}</h1>
            <h6>Created by: {sessionStorage.getItem('user')}</h6>
            <div className='d-flex justify-content-center'>
                <div className='col-3'>
                <div className="input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping">Search</span>
  <input type="text" className="form-control" onChange={onChange3}/>
</div>
                </div>
                </div>
          </div>
        </div>

        {searchItem.length!==0 && 
            <>
            <h1 className='text-center'>Searched Boards</h1>
        {searchItem.map((post)=>{
          return <PostItem post={post}/>
        })}
            </>}


        <div className='container my-3'>
        <h3 className='mt-3'>Add Posts: <i class="fa-solid fa-plus add_icon" onClick={addPost}></i> </h3>
        </div>
        {posts.length===0 && <h3>No Posts</h3>}
        {posts.length!==0 && posts.map((post)=>{
          return <PostItem post={post} setPosts={setPosts} fetchallposts={fetchallposts}/>
        })}
    </div>
  )
}

export default Board