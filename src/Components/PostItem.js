import React,{useState,useEffect} from 'react'
 
const PostItem = (props) => {
  const [liked, setLiked] = useState(0)
  useEffect(() => {
    checkLiked();
  }, [])
  
  const checkLiked=()=>{
    
    let Arr=props.post.liked_users;
    const temp=Arr.filter((item)=>{return (item==sessionStorage.getItem('user'))})
    const len=(temp.length ? 1:0)
    setLiked(len)
    // console.log(liked)
    var element = document.getElementById(props.post._id);
    // console.log("Hello")
    if(len==1)
    {
      element.classList.add("active_heart")
    }
    else
    {
      element.classList.add("heart")
    }
    
  }

  // `http://localhost:5000/api/posts/likepost/${id}`
  const likepost = async (id,liked_users,likes) => {
    const response = await fetch(`https://myblogger-backend.onrender.com/api/posts/likepost/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({liked_users,likes}),
    });
    props.fetchallposts(sessionStorage.getItem('board_name'))

  }

  const LikeVideo=()=>{
      var element = document.getElementById(props.post._id);
      element.classList.toggle("active_heart");
      element.classList.toggle("heart");
      if(liked){
        let Arr=props.post.liked_users;
        let Arr1=Arr.filter((item)=>{return (sessionStorage.getItem('user')!=item)})
        likepost(props.post._id,Arr1,props.post.likes-1)
        setLiked(0);
      }
      else{
        let Arr=props.post.liked_users;
        Arr=[...Arr,sessionStorage.getItem('user')]
        likepost(props.post._id,Arr,props.post.likes+1)
        setLiked(1);
      } 
  }
  return (
    <div className='container my-3'>
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
            {/* <input type='checkbox'> */}
            <i className="fa-solid fa-heart" id={props.post._id} onClick={LikeVideo}></i>
          {/* </input> */}
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

export default PostItem