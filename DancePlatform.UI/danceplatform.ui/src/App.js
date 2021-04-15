import React, { useContext } from "react";
import { Redirect, Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from './components/header/header';
import storageHelper from "./helpers/storageHelper";
import Auth from './pages/auth';
import Main from './pages/main';
import Places from "./pages/places";
import ProfileInfo from "./pages/profileInfo";
import UsersAccounting from "./pages/usersAccounting";
import WorkshopInfo from "./pages/workshopInfo";
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
          <Route exact path="/workshop-info/:id" render={() => 
          <>
            <Header isAuthenticated={storageHelper.isAuthenticated()} />
            <WorkshopInfo />
          </>} />
          <Route exact path="/places" render={() => 
          <>
            <Header isAdmin={storageHelper.isAdmin()} isAuthenticated={storageHelper.isAuthenticated()} />
            <Places />
          </>} />
          <Route exact path="/profile-info" render={() => 
          <>
            <Header isAdmin={storageHelper.isAdmin()} isAuthenticated={storageHelper.isAuthenticated()} />
            <ProfileInfo />
          </>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
