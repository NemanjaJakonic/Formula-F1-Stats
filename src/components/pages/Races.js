import React, { Component } from 'react';
import Spinner from '../../layout/Spinner';
import * as $ from 'jquery';
import Race from '../races/Race';
import { Link } from 'react-router-dom';

export class Races extends Component {
  constructor() {
    super();

    this.state = {
      races: [],
      loading: true,
      search: '',
      value: 2019
    };
  }

  componentDidMount() {
    this.getRaces();
  }

  getDropList() {
    const tempYear = 1950;
    return Array.from(new Array(70), (v, i) => (
      <option key={i} value={tempYear + i}>
        {tempYear + i}
      </option>
    ));
  }
  getRaces = () => {
    var url = `https://ergast.com/api/f1/${this.state.value}/results/1.json`;
    $.get(url, data => {
      //         console.log(data);
      this.setState({
        races: data,
        loading: false
      });
    });
  };
  updateSearch = event => {
    this.setState({ search: event.target.value.substr(0, 15) });
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    this.getRaces();
    event.preventDefault();
  };
  render() {
    if (this.state.loading === true) {
      return <Spinner />;
    }
    var races = this.state.races.MRData.RaceTable.Races.filter(race => {
      return (
        race.raceName.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });
    return (
      <div className='col s10 right'>
        <nav className='grey darken-4'>
          <div className='nav-wrapper'>
            <div className='col s6'>
              <Link to='/' className='breadcrumb'>
                Home
              </Link>
              <Link to='#' className='breadcrumb disabled'>
                Races
              </Link>
            </div>
            <div className='col s5'>
              <input
                placeholder='Search races'
                type='text'
                label='Search Races'
                icon='search'
                onChange={this.updateSearch}
                value={this.state.search}
              />
            </div>
            <div className='col s1'>
              <i className='fas fa-search 2x'></i>
            </div>
            <div className='col s12'>
              <form onSubmit={this.handleSubmit}>
                <label>Choose year you want stats from:</label>

                <select
                  className='browser-default'
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  {this.getDropList()}
                </select>
                <input
                  type='submit'
                  value='Show results'
                  className='btn-results waves-effect waves-light btn white black-text'
                />
              </form>
            </div>

          
          </div>
        </nav>
        <h4 className='center'>Race calendar</h4>
        <table className='highlight'>
          <thead className='grey lighten-4'>
            <tr>
              <th>Round</th>
              <th>Grand Prix</th>
              <th>Circuit</th>
              <th>Date</th>

              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {races.map((race, i) => (
              <Race year={this.state.value} raceData={race} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Races;
