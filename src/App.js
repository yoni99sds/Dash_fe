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
import UserDashboard from "./components/User/UserDashboard"
import PromoCodeForm from './components/Admin/PromoCodeForm';
import ReferralLinkForm from './components/Admin/ReferralLinkForm';
import ReferralLinksList from './components/Admin/ReferralLinksList';
import PromoCodes from './components/Admin/PromoCodes';
import Signup from './components/Auth/SignUp';
import PatientRegistration from './components/User/PatientRegistration';
import PatientsPage from './components/User/PatientsPage';
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
          <Route
            path="/signup"
            component={Signup}
            isAuthenticated={isAuthenticated}
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

          <PrivateRoute path="/create-promo-code" 
          component={PromoCodeForm}
           isAuthenticated={isAuthenticated} />
          
          <PrivateRoute path="/promo-codes-list" 
          component={PromoCodes}
           isAuthenticated={isAuthenticated} />
          
          <PrivateRoute path="/referral-links" 
          component={ReferralLinksList}
          isAuthenticated={isAuthenticated} />
          
          <PrivateRoute path="/create-referral-link" 
          component={ReferralLinkForm}
          isAuthenticated={isAuthenticated} />

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
          <PrivateRoute
            path="/patient/registration"
            component={PatientRegistration}
            isAuthenticated={isAuthenticated}
          />
            <PrivateRoute
            path="/user/patients"
            component={PatientsPage}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute path="/admin/admin" 
          component={AdminPage} 
          isAuthenticated={isAuthenticated} />
          
          <PrivateRoute
          path="/influencer/dashboard/:id"  
          component={InfluencerDashboard}
          isAuthenticated={isAuthenticated}
          />
         
          <PrivateRoute
            path="/influencer/performance/:id" 
            component={InfluencerPerformance}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/influencer/registrations"
            component={InfluencerRegistrations}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/user/dashboard"
            component={UserDashboard}
            isAuthenticated={isAuthenticated}
          />
        
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
