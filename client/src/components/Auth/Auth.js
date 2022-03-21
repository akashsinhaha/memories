import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
 
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './icon';
import Input from './Input';
import { signin, signup } from '../../actions/auth';
import useStyles from './styles'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ isSignup, setIsSignup ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false); 
  const [ formData, setFormData ] = useState(initialState);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => (!prevShowPassword));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignup){
        //logic to signup the user
        dispatch(signup(formData, navigate))
    }else{
        //logic to signin the user
        dispatch(signin(formData, navigate))   
    }

  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
        dispatch({ type: 'AUTH', data: { result, token } });
        navigate('/');
    } catch (error) {
        console.log(error);
    }

  };

  const googleFailure = (error) => {
    console.log(error);
    console.log('Google sign in unsuccessful. Try Again.');
  };


  const switchMode = () => {
    setIsSignup((prevIsSignup) => (!prevIsSignup));
    setShowPassword(false);
  };

  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{ isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {   isSignup && (
                            <>
                            <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                            <Input name='lastName' label='Last Name' handleChange={handleChange}  half />

                            </>
                        )
                    }

                    <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                    <Input name='password' label='Password' handleChange={handleChange} type={ showPassword ? 'text' : 'password' } handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> }
                    
                    
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                        { isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='786785608406-13eavbmggfu2ppgoio4ks26ndio4huob.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button 
                            className={classes.googleButton} 
                            color='primary' fullWidth 
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<Icon />}
                            variant='contained'
                            > 
                            Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent='flex-end' >
                        <Grid item>
                            <Button onClick={switchMode} >
                                { isSignup ? "Already have an account? Sign In" : " Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid> 
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;