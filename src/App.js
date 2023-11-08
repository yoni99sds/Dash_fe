// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider for Redux
import store from './store'; // Import your Redux store
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import InfluencerPerformancePage from './components/Admin/InfluencerPerformancePage';
import InfluencerPage from './components/Admin/InfluencerPage';
import PatientStatusPage from './components/Admin/PatientStatusPage';
import UserPage from './components/Admin/UserPage';
import PatientPage from './components/Admin/PatientPage';
import AdminPage from './components/Admin/AdminPage';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/admin/influencer-performance" component={InfluencerPerformancePage} />
          <Route path="/admin/influencers" component={InfluencerPage} />
          <Route path="/admin/patient-status" component={PatientStatusPage} />
          <Route path="/admin/users" component= {UserPage} />
        <Route path="/admin/patients" component={PatientPage }/>
        <Route path="/admin/admins" component={AdminPage}/>
     
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
