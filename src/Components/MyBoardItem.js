import React,{useState,useRef} from 'react'

const MyBoardItem = (props) => {
    const ref = useRef(null);
  const refClose = useRef(null);
    const [info1, setInfo1] = useState({title:"",imageUrl:""})
    const deleteBoard=()=>{
        const result=props.boards.filter((board)=>{return (board.id !== props.board_id)})
        props.setBoards(result)
    }

    const onChange2 = (e) => {
        setInfo1({...info1, [e.target.name]: e.target.value})
    }

    const handleClick3 = async (e) => {
        e.preventDefault();
        const result=props.boards.filter((board)=>{return (props.board_id !== board.id)})
        props.setBoards([...result,{id:props.board_id,user:props.user,board_image:info1.imageUrl,board_name:info1.title}])
        refClose.current.click();
      }

    const updateBoard=()=>{
        ref.current.click();
        setInfo1({ title: props.board_name, imageUrl: props.board_image })
    }
  return (
    <div>
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Board</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Update Title</label>
                <input type="text" className="form-control" name="title" value={info1.title} onChange={onChange2}/>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Update Image</label>
                <textarea className="form-control" name="imageUrl" rows="3" value={info1.imageUrl} onChange={onChange2}></textarea>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick3}>Save changes</button>
            </div>
          </div>
        </div>
      </div>  
          

        <div className="card" style={{width: "18rem", height: "22rem"}}>
          <img style={{height: "10rem"}} src={props.board_image!==""?props.board_image:"https://d.newsweek.com/en/full/2202468/special-presidential-envoy-climate-john-kerry.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Title: {props.board_name}</h5>
            <p className="card-text">
            Created By:<strong>{props.user}</strong>
            </p>
            <a target="_blank" rel="noreferrer" href="#" className="btn btn-sm btn-dark">
              Enter Board
            </a>
            <div className='mt-3'>
            <a href="#" className="btn btn-primary" onClick={deleteBoard}>
            <i className="fa-solid fa-trash-can"></i>
          </a>
          <a href="#" className="btn btn-primary mx-3" onClick={updateBoard}>
            <i className="fa-sharp fa-solid fa-file-pen"></i>
          </a>
            </div>
            
          </div>
        </div>

        
    </div>
  )
}

export default MyBoardItem