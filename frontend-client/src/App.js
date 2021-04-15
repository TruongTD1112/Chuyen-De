import {BrowserRouter as Router,Switch} from "react-router-dom"
import PrivateRoute from '../src/components/auth/PrivateRoute'
import PublicRoute from '../src/components/auth/PrivateRoute'
import Index from '../src/pages/index'
import Home from '../src/pages/home'
import Login from '../src/pages/login'
import SignUp from '../src/pages/signup'
import BookManagement from '../src/pages/book-management'

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute exact = {true} path="/client" component={Index}/>
        <PublicRoute exact = {true} path="/client/login" component={Login}/>
        <PublicRoute exact = {true} path="/client/signup" component={SignUp}/>
        <PrivateRoute exact = {true} path="/client/home" component={Home}/>
        <PrivateRoute exact = {true} path="/client/book-management" component={BookManagement}/>
      </Switch>
    </Router>
  );
}

export default App;
