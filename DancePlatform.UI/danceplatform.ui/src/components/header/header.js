import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
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

  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
              <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
                <Button color="inherit">
                    Все мастер-классы
                </Button>
              </Link>
              {props.isAdmin ? 
              <>
                <Link className={classes.title} to="/users-accounting" style={{ textDecoration: 'none', color: 'white' }}>
                  <Button color="inherit">
                      Учёт пользователей
                  </Button>
                </Link>

                <Button style={{textDecoration: 'none', color: 'white'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenu}>
                  Дополнительные действия
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                      <Button href='/places' color="inherit">
                        Управление студиями
                      </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button href='/choreographers' color="inherit">
                      Управление хореографами
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                      <Button href='/events' color="inherit">
                        Календарь событий
                      </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                      <Button href='/workshops-history' color="inherit">
                        История мастер-классов
                      </Button>
                  </MenuItem>
                </Menu>

              </>
              :
              <>
                <Link className={classes.title} to="/workshops" style={{ textDecoration: 'none', color: 'white' }}>
                  <Button color="inherit">
                      Мои мастер-классы
                  </Button>
                </Link>
                
                <Link className={classes.title} to="/profile-info" style={{ textDecoration: 'none', color: 'white' }}>
                  <Button color="inherit">
                        Личный кабинет
                      </Button>
                </Link>
              </>
                    }
          </Typography>
            
            {props.isAuthenticated ? 
              <>
              <Typography variant="h6" className={classes.menuButton}>Добро пожаловать, {storageHelper.getCurrentUserName()}</Typography>
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