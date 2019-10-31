import React, { Component } from "react";
import * as $ from "jquery";
import Spinner from "../../layout/Spinner";
import Flag from "react-world-flags";
import { flags } from "../flags";
import { position } from "../position";

export class RaceResults extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      loading: true
    };
  }
  componentDidMount() {
    this.getResults();
  }
  getResults = () => {
    const id = this.props.raceid;
    const year = this.props.year
    console.log(year)
    var url = `https://ergast.com/api/f1/${year}/circuits/${id}/results.json`;
    $.get(url, data => {
      this.setState({
        results: data,
        loading: false
      });
    });
  };
  render() {
    if (this.state.loading === true) {
      return <Spinner />;
    }
    var results = this.state.results.MRData.RaceTable.Races[0].Results;
    return (
      <table className='responsive-table highlight'>
        <thead>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Team</th>
            <th>Result</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, i) => (
            <Results resultData={result} key={i} />
          ))}
        </tbody>
      </table>
    );
  }
}
class Results extends Component {
  if;
  render() {
    const { resultData } = this.props;
    const driverName =
      resultData.Driver.givenName + " " + resultData.Driver.familyName;
    const national = resultData.Driver.nationality;
    const position1 = resultData.position;

    if (resultData.Time !== undefined) {
      var time = resultData.Time.time;
    } else {
      time = "no time";
    }

    return (
      <tr>
        <td>{resultData.position}</td>
        <td>
          <Flag code={`${flags(national)}`} width="50" />
          {driverName}
        </td>
        <td>{resultData.Constructor.name}</td>
        <td>{time}</td>
        <td className={`${position(position1)}`}>{resultData.points}</td>
      </tr>
    );
  }
}

export default RaceResults;
