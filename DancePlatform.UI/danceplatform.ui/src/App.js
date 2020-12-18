import logo from './logo.svg';
import { Redirect, Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from './components/header/header';
import Auth from './pages/auth';
import Main from './pages/main';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/'>
        <Header />

        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path='/login' render={() => <Auth actionName="Войти" />}/>
          <Route exact path='/register' render={() => <Auth actionName="Регистрация" />}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
