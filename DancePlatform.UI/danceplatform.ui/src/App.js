import React, { useContext } from "react";
import { Redirect, Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from './components/header/header';
import storageHelper from "./helpers/storageHelper";
import Auth from './pages/auth';
import Main from './pages/main';
import UsersAccounting from "./pages/usersAccounting";
import Workshops from "./pages/workshops";

function App() {

  return (
    <div className="App">
      <BrowserRouter basename='/'>
        
        <Switch>
          <Route exact path="/" render={() => 
          <>
            <Header isAdmin={storageHelper.isAdmin()} isAuthenticated={storageHelper.isAuthenticated()} />
            <Main />
          </>} />
          <Route exact path='/login' render={() => 
          <>
            <Header isAuthenticated={storageHelper.isAuthenticated()} />
            <Auth actionName="Войти" />
          </>}/>
          <Route exact path='/register' render={() => 
          <>
            <Header isAuthenticated={storageHelper.isAuthenticated()} />
            <Auth actionName="Регистрация" />
          </>}/>
          <Route exact path="/workshops" render={() => 
          <>
            <Header isAuthenticated={storageHelper.isAuthenticated()} />
            <Workshops />
          </>} />
          <Route exact path="/users-accounting" render={() => 
          <>
            <Header isAdmin={storageHelper.isAdmin()} isAuthenticated={storageHelper.isAuthenticated()} />
            <UsersAccounting />
          </>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
