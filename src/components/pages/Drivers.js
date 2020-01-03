import React from "react";
import Spinner from "../../layout/Spinner";
import * as $ from "jquery";
import Driver from "../drivers/Driver";
import { Link } from "react-router-dom";

class Drivers extends React.Component {
  constructor() {
    super();

    this.state = {
      drivers: [],
      loading: true,
      search: "",
      value: 2019
    };
  }

  componentDidMount() {
    this.getDrivers();
  }

  getDropList() {
    const tempYear = 1950;
    return Array.from(new Array(70), (v, i) => (
      <option key={i} value={tempYear + i}>
        {tempYear + i}
      </option>
    ));
  }

  getDrivers = () => {
    var url = `https://ergast.com/api/f1/${this.state.value}/driverStandings.json`;
    $.get(url, data => {
      this.setState({
        drivers: data,
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
    this.getDrivers();
    event.preventDefault();
  };

  render() {
    if (this.state.loading === true) {
      return <Spinner />;
    }
    var drivers = this.state.drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings.filter(
      driver => {
        return (
          (driver.Driver.familyName + driver.Driver.givenName)
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
                Drivers
              </Link>
            </div>

            <div className="col s5">
              <input
                placeholder="Search drivers"
                type="text"
                label="Search Drivers"
                icon="search"
                onChange={this.updateSearch}
                value={this.state.search}
              />
            </div>
            <div className="col s1">
              <i className="fas fa-search 2x"></i>
            </div>
          </div>
        </nav>
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
        <h4 className="center">Drivers Championship standings</h4>
        <table className="highlight responsive-table">
          <thead className="grey lighten-3">
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, i) => (
              <Driver year={this.state.value} driverData={driver} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Drivers;
