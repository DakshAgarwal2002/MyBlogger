import React, { useState, useContext,useRef } from 'react'
import AppContext from '../context/AppContext'
import BoardItem from './BoardItem'
import MyBoardItem from './MyBoardItem'
const Home = () => {
    const context = useContext(AppContext)
    const { setUserName, userName,boards, setBoards} = context;
    const [user, setUser] = useState("daksh2002")
    const [user1, setUser1] = useState("daksh2002")
    const [info, setInfo] = useState({title:"",imageUrl:""})
    const [boardID, setBoardID] = useState(3)
    const [search, setSearch] = useState("")
    const [searchItem, setSearchItem] = useState([])
    
    const onChange = (e) => {
        setUser(e.target.value)
    }
    const onChange2 = (e) => {
        setInfo({...info, [e.target.name]: e.target.value})
    }
    const onChange3 = (e) => {
        setSearch(e.target.value)
        const temp=boards.filter((item)=>{
            const searchTerm = search.toLowerCase();
            const fullName = item.board_name.toLowerCase();
            return (
                fullName.startsWith(searchTerm))})
                console.log(temp);
        setSearchItem(temp);
        
    }
    const handleClick = async (e) => {
        e.preventDefault();
        sessionStorage.setItem('user', user)
        setUserName(user)
        setUser1(user)
        setUser("")
    }
    const handleClick2 = async (e) => {
        e.preventDefault()
        const image_url=info.imageUrl;
        const title=info.title;
        const board_id=boardID;
        setBoards([...boards,{id:board_id,user:user1,board_image:image_url,board_name:title}])
        setBoardID(boardID+1);
        setInfo({title:"",imageUrl:""})
    }
    return (
        <div className='container my-3'>
            <div className='container my-3 border p-3 mb-2 bg-secondary text-white'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label"><h1>Enter User Name</h1></label>
                    <input type="text" className="form-control" id="user" name="user" value={user} onChange={onChange} />
                </div>
                <div className="my-2">
                    <button type="submit" className="btn btn-primary mb-3" onClick={handleClick}>Save User</button>
                </div>

                <div className='d-flex justify-content-center'>
                <div className='col-3'>
                <div className="input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping">Search</span>
  <input type="text" className="form-control" onChange={onChange3}/>
</div>
                </div>
                </div>
            </div>
            
            {searchItem.length!==0 && 
            <>
            <h1 className='text-center'>Searched Boards</h1>
            <div className='row'>
        {searchItem.map((board)=>{
          return <div className='col-md-4 my-3 d-flex justify-content-center'>
          <BoardItem  board_name={board.board_name} board_image={board.board_image!==""? board.board_image:""} user={board.user}/>
          </div>
        })}
        </div>
            </>}
            
            <h1 className='text-center'>All Boards</h1>  
            <div className='row'>
        {boards.map((board)=>{
          return <div className='col-md-4 my-3 d-flex justify-content-center'>
          <BoardItem  board_name={board.board_name} board_image={board.board_image!==""? board.board_image:""} user={board.user}/>
          </div>
        })}
        </div>

        <div className='container my-3'>
            <h1>Add Board</h1>
            <div className="input-group flex-nowrap mt-3">
  <span className="input-group-text" id="addon-wrapping">Board Title</span>
  <input type="text" className="form-control" aria-label="Username" aria-describedby="addon-wrapping" name="title" value={info.title} onChange={onChange2}/>
</div>
<div className="input-group flex-nowrap mt-3">
  <span className="input-group-text" id="addon-wrapping">Image URL</span>
  <input type="text" className="form-control" aria-label="Username" aria-describedby="addon-wrapping" name="imageUrl" value={info.imageUrl} onChange={onChange2}/>
</div>
<div className="my-2">
                    <button type="submit" className="btn btn-primary mb-3" onClick={handleClick2}>Add Board</button>
            </div>
            </div>
        <h1 className='text-center'>Your Boards</h1>  
            <div className='row'>
        {boards.filter((board1)=>{return (board1.user === user1)}).map((board,index)=>{
          return <div className='col-md-4 my-3 d-flex justify-content-center col'>
          <MyBoardItem BOARD={board} setBoards={setBoards} board_id={board.id} board_name={board.board_name} board_image={board.board_image!==""? board.board_image:""} user={board.user} boards={boards}/>
          </div>
        })}
        </div>
        </div>
    )
}

export default Home