import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthService from '../services/authService';
import DialogBox from '../components/dialog/dialog';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://vk.com/dianapitalenko">
        Diana Pitalenko
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Auth(props) {
  const classes = useStyles();
  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {props.actionName}
        </Typography>
        <form className={classes.form} noValidate>
        {props.actionName === 'Регистрация' ? <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Имя пользователя"
            name="username"
            onChange={e => setUsername(e.target.value)}
          /> : <></>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Адрес почты"
            name="email"
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              if(props.actionName === 'Регистрация'){
                setIsError(false);
                AuthService.register({email, password, username}).then(x => {
                  history.push('/login');
                }).catch(err => {
                  if(err.status == 400){
                    setErrorMessage('Вы ввели неверные данные для регистрации');
                    setIsError(true);
                  }
                  if(err.status == 403){
                    setErrorMessage('Вам запрещено делать этот запрос');
                    setIsError(true);
                }
                  else if(err.status == 500){
                    setErrorMessage('Непредвиденная ошибка. Обратитесь к Администратору');
                    setIsError(true);
                  }
              })
            }
              
              else{
                setIsError(false);
                AuthService.login({email, password}).then(x => {
                  localStorage.setItem('token', x.token);
                  localStorage.setItem('user', JSON.stringify(x.user));
                  history.push('/');
                }).catch(err => {
                  if(err.status == 401){
                    setErrorMessage('Вы ввели неверные данные для аутентификации');
                    setIsError(true);
                  }
                  if(err.status == 403){
                    setErrorMessage('Вам запрещено делать этот запрос');
                    setIsError(true);
                }
                  else if(err.status == 500){
                    setErrorMessage('Непредвиденная ошибка. Обратитесь к Администратору');
                    setIsError(true);
                  }
              });
              }
            }}
          >
            {props.actionName}
          </Button>
        </form>
        {isError ? <DialogBox isError={isError} message={errorMessage}/> : <></>}
        
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}