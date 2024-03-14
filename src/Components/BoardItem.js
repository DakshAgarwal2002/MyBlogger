import React from 'react'
import { NavLink} from 'react-router-dom'
const BoardItem = (props) => {
  return (
    <div>
        <div className="card" style={{width: "18rem", height: "20rem"}}>
          <img style={{height: "10rem"}} src={props.board_image!==""?props.board_image:"https://d.newsweek.com/en/full/2202468/special-presidential-envoy-climate-john-kerry.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Title: {props.board_name}</h5>
            <p className="card-text">
            Created By:<strong>{props.user}</strong>
            </p>
            <NavLink rel="noreferrer" to="/board" className="btn btn-sm btn-dark" 
            onClick={()=>{sessionStorage.setItem('board_name', props.board_name)
            sessionStorage.setItem('user', props.user)
            sessionStorage.setItem('board_image', props.board_image!==""?props.board_image:"https://d.newsweek.com/en/full/2202468/special-presidential-envoy-climate-john-kerry.jpg")}}>
              Enter Board
            </NavLink>
          </div>
        </div>
      </div>
  )
}

export default BoardItem