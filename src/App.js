// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import PrivateRoute from './components/Auth/PrivateRoute'; 
import InfluencerPerformancePage from './components/Admin/InfluencerPerformancePage';
import InfluencerPage from './components/Admin/InfluencerPage';
import PatientStatusPage from './components/Admin/PatientStatusPage';
import UserPage from './components/Admin/UserPage';
import PatientPage from './components/Admin/PatientPage';
import AdminPage from './components/Admin/AdminPage';
import InfluencerDashboard from './components/Influencer/InfluencerDashboard';
import InfluencerPerformance from './components/Influencer/InfluencerPerformance';
import InfluencerRegistrations from './components/Influencer/InfluencerRegistrations';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Login {...props} setAuthenticated={setAuthenticated} />}
          />
         
          <PrivateRoute
            path="/admin/dashboard"
            component={AdminDashboard}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/admin/influencer-performance"
            component={InfluencerPerformancePage}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/admin/influencers"
            component={InfluencerPage}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/admin/patient-status"
            component={PatientStatusPage}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute path="/admin/users"
          component={UserPage} 
          isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/admin/patients"
            component={PatientPage}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute path="/admin/admin" 
          component={AdminPage} 
          isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/influencer/dashboard"
            component={InfluencerDashboard}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/influencer/performance"
            component={InfluencerPerformance}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/influencer/registrations"
            component={InfluencerRegistrations}
            isAuthenticated={isAuthenticated}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
