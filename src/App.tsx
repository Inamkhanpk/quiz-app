import React, { useState } from "react";
import QuestionPage from "./components/QuestionPage";
import UserData from "./components/Userdata";
import './App.css'
import { makeStyles } from '@material-ui/core/styles';
import bg from './images/quiz-night-2.jpg'


const useStyles = makeStyles((theme) =>({
  

bgimage:{    
      
  //[theme.breakpoints.down('xs')]: {
    backgroundImage: `url(${bg})`,
    maxWidth: '100%',
    height:900,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover' ,
    backgroundAttachment: 'fixed',
  //},

  // [theme.breakpoints.up('md')]: {
  //   backgroundImage: `url(${bg})`,
  //   width:'100%',
  //   height:'auto',
  //   backgroundPosition: 'center',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover' ,
  //   backgroundAttachment: 'fixed',
  // },
  
   
}
}));
export default function App() {
  const classes = useStyles();

  const [registered, setRegistered] = useState(false);
  const [user, setUser] = useState({});
   console.log(registered)
  return (
    <div className={classes.bgimage}>
      
        {!registered ? (
          <UserData setRegistered={setRegistered} setUser={setUser} />
        ) : (
          <QuestionPage userData={user} />
        )}
      
    </div>
  );
}