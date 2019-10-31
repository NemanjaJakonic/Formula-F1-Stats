import React, { Component } from 'react';
import * as $ from 'jquery';
import Spinner from '../../layout/Spinner';
import RaceQualifying from './RaceQualifying';
import RaceResults from './RaceResults';
import Flag from 'react-world-flags';
import { flags } from '../flags';
import { Link } from 'react-router-dom';

export class RaceDetails extends Component {
  constructor() {
    super();
    this.state = {
      race: [],

      loading: true
    };
  }
  componentDidMount() {
    this.getRace();
  }
  getRace = () => {
    const id = this.props.match.params.race;
    var year = this.props.match.params.year;
    console.log(year);
    var url = `https://ergast.com/api/f1/${year}/circuits/${id}.json`;
    $.get(url, data => {
      this.setState({
        race: data,
        loading: false
      });
    });
  };
  render() {
    if (this.state.loading === true) {
      return <Spinner />;
    }
    var year = this.props.match.params.year;
    var race = this.state.race.MRData.CircuitTable.Circuits[0];
    const national = race.Location.country;
    return (
      <div className='col s10 right'>
        <nav className='grey darken-4'>
          <div className='nav-wrapper'>
            <div className='col s12'>
              <Link to='/' className='breadcrumb'>
                Home
              </Link>
              <Link to='/races' className='breadcrumb'>
                Races
              </Link>
              <Link to='#' className='breadcrumb disabled'>
                {race.circuitName}
              </Link>
              <Link to='/races' className='right'>
                Back
              </Link>
            </div>
          </div>
        </nav>
        <div className='row'>
          <div className='col s3'>
            <div className='m-2'>
              <Flag code={`${flags(national)}`} width='200' />
            </div>
            <table>
              <thead>
                <tr>
                  <th> Name:</th>
                  <th> {race.circuitName} </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Country: </td>
                  <td>{race.Location.country}</td>
                </tr>
                <tr>
                  <td>Location: </td>
                  <td>{race.Location.locality}</td>
                </tr>
                <tr>
                  <td>Full Report</td>
                  <td>
                    <a
                      href={`${race.url}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <i className='fas fa-external-link-alt'></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='col s4'>
            <h5>Qualifying Results - {year}</h5>
            <RaceQualifying
              raceid={this.props.match.params.race}
              year={this.props.match.params.year}
            />
          </div>
          <div className='col s1'></div>
          <div className='col s4'>
            <h5>Race Results - {year}</h5>
            <RaceResults
              raceid={this.props.match.params.race}
              year={this.props.match.params.year}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RaceDetails;
