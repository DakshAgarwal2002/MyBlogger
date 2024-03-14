import React,{useState,useRef} from 'react'

const MyPostItem = (props) => {

  const ref = useRef(null);
  const refClose = useRef(null);
  const [modNote, setModNote] = useState({post_title:"",description:"",image_url:""})

  const onChange2 = (e) => {
    setModNote({...modNote, [e.target.name]: e.target.value})
}
// http://localhost:5000/api/posts/updatepost/${id}
const updatepost = async (id, title, description, image_url) => {
  const response = await fetch(`https://myblogger-backend.onrender.com/api/posts/updatepost/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({title, description, image_url}),
  });
  props.fetchyourposts(sessionStorage.getItem('user'))
  
}

const handleClick3 = async (e) => {
  e.preventDefault();
  updatepost(props.post._id,modNote.post_title,modNote.description,modNote.image_url)
  refClose.current.click();
}

const updatePost=()=>{
  ref.current.click();
  setModNote({post_title:props.post.post_title,description:props.post.description,image_url:props.post.image_url})
}



  const deletepost = async (id) => {
    const response = await fetch(`https://myblogger-backend.onrender.com/api/posts/deletepost/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const json = response.json;
    console.log(json)
    props.fetchyourposts(sessionStorage.getItem('user'))
  }


  return (
    <div className='container my-3'>

<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Post</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Update Post Title</label>
                <input type="text" className="form-control" name="post_title" value={modNote.post_title} onChange={onChange2}/>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Update Description</label>
                <textarea className="form-control" name="description" rows="3" value={modNote.description} onChange={onChange2}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Update Image</label>
                <textarea className="form-control" name="image_url" rows="3" value={modNote.image_url} onChange={onChange2}></textarea>
              </div>
              

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick3}>Save changes</button>
            </div>
          </div>
        </div>
      </div>  


    <div className="card mb-2">
            <div className="row align-items-center">
              <div className="col-sm-2">
                <img src={props.post.image_url} alt={props.post.post_title} width="100%"/>
              </div>

              <div className="col-sm-10">
                <div className="card-body">
                  <p className='d-flex justify-content-between'>
                  <h5 className="card-title">{props.post.post_title}</h5>
                  <div className='mt-3'>
            <a className="btn btn-primary" >
            <i className="fa-solid fa-trash-can" onClick={()=>{deletepost(props.post._id)}}></i>
          </a>
          <a className="btn btn-primary mx-3" >
            <i className="fa-sharp fa-solid fa-file-pen" onClick={updatePost}></i>
          </a>
            </div>
                  {/* <i class="fa-solid fa-cart-shopping" onClick={()=>{addBook(props.Book.title,props.Book.authors[0],props.Book.measurements.english.lexile ? Math.trunc(props.Book.measurements.english.lexile/12): "10",props.Book.published_works[0].cover_art_url)}}></i> */}
                  </p>
                  
                  

                  <p className="my-1 text-muted">
                    <strong>User:</strong> {props.post.user}
                    
                  </p>

                  <p className="my-1">
                    <strong>Post Description:</strong>
                  </p>
                  <p className="my-1">
                  {props.post.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
  )
}

export default MyPostItem