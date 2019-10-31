import React from 'react';
import history from '../../history';
import Flag from 'react-world-flags';
import { flags } from '../flags';

class Race extends React.Component {
  getRaceDetails = e => {
    let linkTo = "/races/" + e.target.dataset.year+ "/"+ e.target.dataset.itemid;
    console.log(e.target.dataset.year)
    history.push(linkTo);
  };
  render() {
    const { raceData, year } = this.props;
    console.log(year)
    const driverName =
      raceData.Results[0].Driver.givenName +
      ' ' +
      raceData.Results[0].Driver.familyName;
    const national = raceData.Circuit.Location.country;
    const drivernational = raceData.Results[0].Driver.nationality
    return (
      <tr>
        <td>{raceData.round}</td>
        <td>
          <Flag code={`${flags(national)}`} width='50' />{' '}
          <button
            className='btn-flat red-text text-darken-2'
            onClick={this.getRaceDetails}
            data-itemid={raceData.Circuit.circuitId}
            data-year={year}
          >
    {raceData.raceName}
          </button>
          
        </td>
        <td>{raceData.Circuit.circuitName}</td>
        <td>{raceData.date}</td>
        <td><Flag code={`${flags(drivernational)}`}  width='50' />{' '}{driverName}</td>
      </tr>
    );
  }
}

export default Race;
