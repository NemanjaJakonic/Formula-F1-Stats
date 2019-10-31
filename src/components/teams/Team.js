import React from 'react';
import history from '../../history';
import Flag from 'react-world-flags';
import { flags } from '../flags';

class Team extends React.Component {
  getTeamDetails = e => {
    let linkTo = '/teams/' + e.target.dataset.year+ "/"+ e.target.dataset.itemid;
    history.push(linkTo);
  };
  render() {
    const { teamData, year} = this.props;
    const national = teamData.Constructor.nationality;
    return (
      <tr>
        <td>{teamData.position}</td>
        <td>
          <Flag code={`${flags(national)}`}  width='50' />
          {teamData.Constructor.name}
        </td>
        <td>
          {' '}
          <button
            className='btn-flat red-text text-darken-2'
            onClick={this.getTeamDetails}
            data-itemid={teamData.Constructor.constructorId}
            data-year={year}
          >
            Details 
          </button>
          <i className="fas fa-external-link-alt"></i>
        </td>
        <td>{teamData.points}</td>
      </tr>
    );
  }
}

export default Team;
