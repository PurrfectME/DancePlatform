import React, { useContext } from "react";
import { Redirect, Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from './components/header/header';
import storageHelper from "./helpers/storageHelper";
import Auth from './pages/auth';
import Choregraphers from "./pages/choreographers";
import Events from "./pages/events";
import Main from './pages/main';
import Places from "./pages/places";
import ProfileInfo from "./pages/profileInfo";
import UsersAccounting from "./pages/usersAccounting";
import WorkshopInfo from "./pages/workshopInfo";
import Workshops from "./pages/workshops";
import WorkshopsHistory from "./pages/workshopsHistory";

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
          <Route exact path="/users-accounting/:workshopId?" render={params => 
          <>
            {storageHelper.isAuthenticated() && storageHelper.isAdmin() ?
            <>
              <Header isAdmin={storageHelper.isAdmin()} isAuthenticated={storageHelper.isAuthenticated()} />
              <UsersAccounting {...params} />
            </>
            :
              <Redirect to='/' />
            }
          </>} />
          <Route exact path="/workshop-info/:id" render={() => 
          <>
            {storageHelper.isAuthenticated() ?
            <>
              <Header isAuthenticated={storageHelper.isAuthenticated()} />
              <WorkshopInfo />
            </>
            :
              <Redirect to='/login' />
            }
          </>} />
          <Route exact path="/places" render={() => 
          <>
            {storageHelper.isAuthenticated() && storageHelper.isAdmin() ?
            <>
              <Header isAdmin={storageHelper.isAdmin()} isAuthenticated={storageHelper.isAuthenticated()} />
              <Places />
            </>
            :
              <Redirect to='/' />
            }
          </>} />
          <Route exact path="/profile-info" render={() => 
          <>
            {storageHelper.isAuthenticated() ?
            <>
              <Header isAuthenticated={storageHelper.isAuthenticated()} />
              <ProfileInfo />
            </>
            :
              <Redirect to='/login' />
            }
          </>} />
          <Route exact path="/events" render={() => 
          <>
            {storageHelper.isAuthenticated() && storageHelper.isAdmin() ?
            <>
              <Header isAdmin={storageHelper.isAdmin()} isAuthenticated={storageHelper.isAuthenticated()} />
              <Events />
            </>
            :
              <Redirect to='/' />
            }
          </>} />
          <Route exact path="/choreographers" render={() => 
          <>
            {storageHelper.isAuthenticated() && storageHelper.isAdmin() ?
            <>
              <Header isAdmin={storageHelper.isAdmin()} isAuthenticated={storageHelper.isAuthenticated()} />
              <Choregraphers />
            </>
            :
              <Redirect to='/' />
            }
          </>} />
          <Route exact path="/workshops-history" render={() => 
          <>
            {storageHelper.isAuthenticated() && storageHelper.isAdmin() ?
            <>
              <Header isAdmin={storageHelper.isAdmin()} isAuthenticated={storageHelper.isAuthenticated()} />
              <WorkshopsHistory />
            </>
            :
              <Redirect to='/' />
            }
          </>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
