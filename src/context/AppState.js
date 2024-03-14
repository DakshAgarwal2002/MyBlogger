import React,{useState} from 'react'
import AppContext from './AppContext'

const AppState = (props) => {
    const [userName, setUserName] = useState("daksh2002")
    const [boards, setBoards] = useState([
      {id:1,user:"DakshAgarwal2002" , board_image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQldPRKUgisCyRnmgUXvl7hH9g7tT5VzwxCjQ&usqp=CAU", board_name:"Science", },
      {id:2,user:"SharvanSharma1999" , board_image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROq8rIJ1-12gs6dhETtOTMMc3KS94t6nOJmQ&usqp=CAU", board_name:"Sports"}
  ])
  return (
    <AppContext.Provider value={{userName,setUserName,boards,setBoards}}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppState