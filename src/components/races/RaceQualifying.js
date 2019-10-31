import React, { Component } from 'react';
import * as $ from 'jquery';
import Spinner from '../../layout/Spinner';
import Flag from 'react-world-flags';
import { flags } from '../flags';

export class RaceQualifying extends Component {
  constructor() {
    super();

    this.state = {
        results: [],
        loading: true
    }


}
componentDidMount() {
  this.getResults();
}
getResults = () => {
  const id = this.props.raceid;
  const year = this.props.year
  var url = `https://ergast.com/api/f1/${year}/circuits/${id}/qualifying.json`;
  $.get(url, (data) => {
    
      this.setState({
          results: data,
          loading: false
      });
  });

}
  render() {
    if (this.state.loading === true) {
      return <Spinner />;
  }
  var results = this.state.results.MRData.RaceTable.Races[0].QualifyingResults;
    return (
      <table className='responsive-table highlight'>
      <thead>
          <tr>
              <th>Position</th>
              <th>Driver</th>
              <th>Team</th>
              <th>Best Time</th>
              

          </tr>
      </thead>
      <tbody>
          {results.map((result, i) => <Results resultData={result} key={i} />)}
      </tbody>
  </table>
    )
  }
}
class Results extends Component {

  render() {
    
      const { resultData } = this.props;
      const driverName = resultData.Driver.givenName + ' ' + resultData.Driver.familyName;
      const national = resultData.Driver.nationality;
      var best_time = resultData.Q3;
      if (resultData.Q3<resultData.Q1 && resultData.Q3<resultData.Q2 ) {
        best_time = resultData.Q3
      } else if (resultData.Q2 < resultData.Q1 && resultData.Q2<resultData.Q3) {
        best_time = resultData.Q2
      } else {
        best_time = resultData.Q1
      }
      return (
          <tr>
              <td>{resultData.position}</td>
              <td> <Flag code={`${flags(national)}`}  width='50' />{driverName}</td>
              <td>{resultData.Constructor.name}</td>
              <td>{best_time}</td>
            
          </tr>

      )
  }
}

export default RaceQualifying
