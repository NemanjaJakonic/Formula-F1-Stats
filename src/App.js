import React, { Component } from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import Drivers from './components/pages/Drivers';
import Teams from './components/pages/Teams';
import Races from './components/pages/Races';
import DriverDetails from './components/drivers/DriverDetails';
import RaceDetails from './components/races/RaceDetails';
import TeamDetails from './components/teams/TeamDetails';
import history from './history';
import './App.css';
import logo from './img/f1.png';
import drivers from './img/drivers.svg';
import races from './img/races.svg';
import teams from './img/teams.svg';
import home from './img/home.svg';

export class App extends Component {
  render() {
    return (
      <div className='row'>
        <Router history={history}>
          <div className='sidenavigation col s2'>
            <div className='center m-1 logo'>
              <div>
                <Link to='/'>
                  <img src={logo} width='150px' alt='' />
                </Link>
              </div>
              <h5>F1 Stats</h5>
            </div>
            <div className='center m-1 link'>
              <div>
                {' '}
                <img src={home} height='65px' alt='' />
              </div>
              <div>
                <Link to='/'>Home</Link>
              </div>
            </div>
            <div className='center m-1 link'>
              <div>
                {' '}
                <img src={drivers} height='65px' alt='' />
              </div>
              <div>
                <Link to='/drivers'>Drivers</Link>
              </div>
            </div>
            <div className='center m-1 link'>
              <div>
                <img src={teams} height='65px' alt='' />
              </div>
              <div>
                <Link to='/teams'>Teams</Link>
              </div>
            </div>
            <div className='center m-1 link'>
              <div>
                <img src={races} height='65px' alt='' />
              </div>
              <div>
                {' '}
                <Link to='/races'>Races</Link>
              </div>
            </div>
          </div>

          <Switch>
            <Route path='/' exact component={Home} />

            <Route path='/drivers' exact component={Drivers} />
            <Route path='/teams' exact component={Teams} />
            <Route path='/races' exact component={Races} />
            <Route path='/drivers/:year/:driver' component={DriverDetails} />
            <Route path='/teams/:year/:team' component={TeamDetails} />
            <Route path='/races/:year/:race' component={RaceDetails} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
