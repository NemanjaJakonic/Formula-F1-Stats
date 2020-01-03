import React, { Component } from "react";
import Spinner from "../../layout/Spinner";
import * as $ from "jquery";
import Team from "../teams/Team";
import { Link } from "react-router-dom";

export class Teams extends Component {
  constructor() {
    super();

    this.state = {
      teams: [],
      loading: true,
      search: "",
      value: 2019
    };
  }

  componentDidMount() {
    this.getTeams();
  }
  getDropList() {
    const tempYear = 1950;
    return Array.from(new Array(70), (v, i) => (
      <option key={i} value={tempYear + i}>
        {tempYear + i}
      </option>
    ));
  }
  getTeams = () => {
    var url = `https://ergast.com/api/f1/${this.state.value}/constructorStandings.json`;
    $.get(url, data => {
      this.setState({
        teams: data,
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
    this.getTeams();
    event.preventDefault();
  };

  render() {
    if (this.state.loading === true) {
      return <Spinner />;
    }
    var teams = this.state.teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.filter(
      team => {
        return (
          team.Constructor.name
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1
        );
      }
    );
    return (
      <div className="col s10 right">
        <nav className="grey darken-4">
          <div className="nav-wrapper">
            <div className="col s6">
              <Link to="/" className="breadcrumb">
                Home
              </Link>
              <Link to="#" className="breadcrumb disabled">
                Teams
              </Link>
            </div>
            <div className="col s5">
              <input
                placeholder="Search teams"
                type="text"
                label="Search Teams"
                icon="search"
                onChange={this.updateSearch}
                value={this.state.search}
              />
            </div>
            <div className="col s1">
              <i className="fas fa-search 2x"></i>
            </div>
            <div className="col s12">
              <form onSubmit={this.handleSubmit}>
                <label>Choose year you want stats from:</label>

                <select
                  className="browser-default"
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  {this.getDropList()}
                </select>
                <input
                  type="submit"
                  value="Show results"
                  className="btn-results waves-effect waves-light btn white black-text"
                />
              </form>
            </div>
           
          
          </div>
        </nav>
        <h4 className="center">Constructors Championship standings</h4>
        <table className="highlight">
          <thead className="grey lighten-3">
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Details</th>

              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, i) => (
              <Team year={this.state.value} teamData={team} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Teams;
