import React, { Component } from "react";
import * as $ from "jquery";
import Spinner from "../../layout/Spinner";
import DriverResults from "./DriverResults";
import driverimage from "../../img/driver.svg";
import Flag from "react-world-flags";
import { flags } from "../flags";
import { Link } from "react-router-dom";

class DriverDetails extends Component {
  constructor() {
    super();
    this.state = {
      driver: [],

      loading: true
    };
  }
  componentDidMount() {
    this.getDrivers();
  }

  getDrivers = () => {
    const id = this.props.match.params.driver;
    var year = this.props.match.params.year
    console.log(year)
    var url = `http://ergast.com/api/f1/${year}/drivers/${id}/driverStandings.json`;
    $.get(url, data => {
      this.setState({
        driver: data,
        loading: false
      });
    });
  };
  render() {
    if (this.state.loading === true) {
      return <Spinner />;
    }
    var year = this.props.match.params.year;
    var driver = this.state.driver.MRData.StandingsTable.StandingsLists[0]
      .DriverStandings[0];
      
    return (
      <div className="col s10 right">
        <nav className="grey darken-4 row">
         
            <div className="col s12">
              <Link to="/" className="breadcrumb">
                Home
              </Link>
              <Link to="/drivers" className="breadcrumb">
                Drivers
              </Link>
              <Link to="#" className="breadcrumb disabled">
                {driver.Driver.givenName} {driver.Driver.familyName}
              </Link>
              <Link to='/drivers' className='right' >Back</Link>
            </div>
           
          
        </nav>
        <div className="row">
          <div className="col s3">
            <div className="m-1">
              <img src={driverimage} height="120px" alt="" />
            </div>
            <table>
              <thead>
                <tr>
                  <th>Name:</th>
                  <th>
                    {driver.Driver.givenName} {driver.Driver.familyName}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Country:</td>
                  <td>
                    {driver.Driver.nationality}
                    <Flag
                      code={`${flags(driver.Driver.nationality)}`}
                      width="40"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Team:</td><td>{driver.Constructors[0].name}</td>
                </tr>
                <tr>
                  <td>Birth: </td>
                  <td>{driver.Driver.dateOfBirth}</td>
                </tr>
                <tr>
                  <td>Biography :</td>
                  <td>
                    <a
                      href={`${driver.Driver.url}`}
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
          <div className="col s1"></div>
          <div className="col s8">
            <h5 className='center'>Driver Results - {year}</h5>
            <DriverResults driverid={this.props.match.params.driver} year={this.props.match.params.year} />
          </div>
        </div>
      </div>
    );
  }
}

export default DriverDetails;
