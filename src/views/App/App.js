import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from '../Login/Login';
import Brand from '../Brand/Brand';
import Car from '../Car/Car';
import Station from '../Station/Station';
import Trip from '../Trip/Trip';
import Ticket from '../Ticket/Ticket';

import LogoutModal from './LogoutModal';
import Sidebar from './Sidebar';
import Nav from './Nav';
import useToken from './useToken';

function App() {
  const {token, setToken} = useToken();
  console.log('token', typeof token);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div id="wrapper">
      <Router>
        <Sidebar />
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Nav />
            {/* <!-- Begin Page Content --> */}

            <Switch>
              <Route exact path="/" render={() => <Redirect to="/brand" />} />
              <Route path="/brand" component={Brand} />
              <Route path="/car" component={Car} />
              <Route path="/station" component={Station} />
              <Route path="/trip" component={Trip} />
              <Route path="/ticket" component={Ticket} />
            </Switch>

            {/* <!-- End Page Content --> */}
          </div>
        </div>
        {/* End Content Wrapper */}
        <LogoutModal />
      </Router>
    </div>
  );
}

export default App;
