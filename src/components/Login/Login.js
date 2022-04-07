import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { userContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';

const app = initializeApp(firebaseConfig);

const LoginFrom = styled('div')(({ theme }) => ({
  width: 500,
  border:'1px solid black',
  margin: '10px auto',
  padding:'5px 20px',
  paddingBottom:'30px',
  [theme.breakpoints.down('md')]: {
    width:'85%',
    margin:'5px auto',
  },
}))
const LoginUsingFbAndGoogle = styled('div')(({ theme }) => ({
  width: 500,
  margin: '10px auto',
  padding:'5px 20px',
  paddingBottom:'30px',
  [theme.breakpoints.down('md')]: {
    width:'85%',
    margin:'5px auto',
  },
}))

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [newUser, setNewUser] = useState(false);
    const inputStyle = {
      width:'100%',
      margin:'5px 0px'
    }

    const handleLoginWithGoogle =()=>{
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const {displayName,email,photoURL} = user;
        const newLoginUser = {
          name:displayName,
          email:email,
          img:photoURL
        }
        setLoggedInUser(newLoginUser);
        navigate(from, { replace: true });
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
    }
    
    return (
      <>
        <LoginFrom>
          <h2>{newUser ? 'Create an account' : 'Login' }</h2>
          <small style={{color:'red'}}>Only login with google is working</small>
          <form>
           {newUser && <TextField style={inputStyle} type="text" label="Name" variant="standard" />}
            <TextField style={inputStyle} type="email" label="Username or Email" variant="standard" />
            <TextField style={inputStyle} type="password" label="Password" variant="standard" />
            {newUser && <TextField style={inputStyle} type="password" label="Confirm Password" variant="standard" />}
            {!newUser && <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
            <Checkbox />
            <label>Remember me</label>
            </div>
            <Link
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Forgot Password
          </Link>
          </Box>}
          <Button variant="contained" style={{ backgroundColor:'rgba(105, 70, 244, 1)', '&:hover':{backgroundColor: 'rgba(69, 27, 237, 1)'}, padding:'10px', marginTop:'20px', width:'100%' }}>{newUser ? "Create an account" : "Login"}</Button>
          <p style={{textAlign:'center'}}>{newUser ? "Already have an account?" : "Don't have an account?"} 
          <span
            style={{color:'royalblue', cursor:'pointer'}}
            onClick={() => {
              setNewUser(!newUser)
            }}
          >
            {newUser ? " Login" : " Create an account"}
          </span>
          </p>
          </form>
        </LoginFrom>
        <LoginUsingFbAndGoogle>
          <fieldset style={{borderWidth:'1px 0 0 0'}}><legend style={{margin:'auto'}}>Or</legend></fieldset>
          <Button style={{width:'100%', border:'1px solid black', borderRadius:'20px', padding:'0px' }}><FacebookOutlinedIcon style={{fontSize:'40px', marginRight:'50px'}} />Continue with Facebook</Button>
          <Button style={{width:'100%', border:'1px solid black', borderRadius:'20px', padding:'0px', marginTop:'15px' }} onClick={handleLoginWithGoogle}><GoogleIcon style={{fontSize:'40px', marginRight:'50px'}} />Continue with Google</Button>
        </LoginUsingFbAndGoogle>
      </>
    );
};

export default Login;