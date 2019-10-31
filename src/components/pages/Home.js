import React, { Component } from 'react';
import formula from '../../img/formula.jpg';
import flag from '../../img/flag.gif'

export class Home extends Component {


  render() {
    return (
      <div className='col s10 right center'>
        <div>
        <div></div><img src={flag} alt='' />
          <h1>Welcome to Formula F1 Stats</h1>
          

          <img src={formula} alt='' />
         
         
         
        </div>
      </div>
    );
  }
}

export default Home;
