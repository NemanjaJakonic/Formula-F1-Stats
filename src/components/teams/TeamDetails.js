import React, { Component } from "react";
import * as $ from "jquery";
import Spinner from "../../layout/Spinner";
import TeamResults from "./TeamResults";
import { Link } from "react-router-dom";
import { flags } from "../flags";
import Flag from "react-world-flags";

export class TeamDetails extends Component {
  constructor() {
    super();
    this.state = {
      team: [],
      loading: true
    };
  }
  componentDidMount() {
    this.getTeams();
  }
  getTeams = () => {
    const id = this.props.match.params.team;
    var year = this.props.match.params.year;
    var url = `https://ergast.com/api/f1/${year}/constructors/${id}/constructorStandings.json`;
    $.get(url, data => {
      this.setState({
        team: data,
        loading: false
      });
    });
  };
  render() {
    if (this.state.loading === true) {
      return <Spinner />;
    }
    var team = this.state.team.MRData.StandingsTable.StandingsLists[0]
      .ConstructorStandings[0];
    var year = this.props.match.params.year;
    return (
      <div className="col s10 right">
        <nav className="grey darken-4">
          <div className="nav-wrapper">
            <div className="col s12">
              <Link to="/" className="breadcrumb">
                Home
              </Link>
              <Link to="/teams" className="breadcrumb">
                Teams
              </Link>
              <Link to="#" className="breadcrumb disabled">
                {team.Constructor.name}
              </Link>
              <Link to="/teams" className="right">
                Back
              </Link>
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col m3 s12">
            <table>
              <thead>
                <tr>
                  <th>Name:</th>
                  <th>
                    {team.Constructor.name}
                    <Flag
                      code={`${flags(team.Constructor.nationality)}`}
                      width="40"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Country:</td>
                  <td>{team.Constructor.nationality}</td>
                </tr>
                <tr>
                  <td>Position:</td>
                  <td>{team.position}</td>
                </tr>
                <tr>
                  <td>Points:</td>
                  <td>{team.points}</td>
                </tr>
                <tr>
                  <td>History:</td>
                  <td>
                    <a
                      href={`${team.Constructor.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col m1"></div>

          <div className="col m8 s12">
            <h5 className="center">Team Results - {year}</h5>
            <TeamResults
              teamid={this.props.match.params.team}
              year={this.props.match.params.year}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TeamDetails;
