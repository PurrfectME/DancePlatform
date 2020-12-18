import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import storageHelper from '../../helpers/storageHelper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   setIsAuthenticated(storageHelper.isAuthenticated());
  // })

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                <Button color="inherit">
                    Главная
                </Button>
            </Link>
            <Link className={classes.title} to="/workshops" style={{ textDecoration: 'none', color: 'white' }}>
                <Button color="inherit">
                    Мои мастер-классы
                </Button>
              </Link>
          </Typography>
            
            {props.isAuthenticated ? 
              <>
              <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                <Button onClick={() => {
                  localStorage.clear();
                }} color="inherit">
                    Выйти
                </Button>
              </Link>
              </>
            :
            <>
            <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                <Button color="inherit">
                    Войти
                </Button>
            </Link>
            <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
                <Button color="inherit">
                    Регистрация
                </Button>
            </Link>
            </>}
            
        </Toolbar>
      </AppBar>
    </div>
  );
}