import React, { Component } from "react";
import * as $ from "jquery";
import Spinner from "../../layout/Spinner";
import { position } from "../position";

export class DriverResults extends Component {
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
    const id = this.props.driverid;
    const year = this.props.year
    var url = `http://ergast.com/api/f1/${year}/drivers/${id}/results.json`;
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
    var results = this.state.results.MRData.RaceTable.Races;
    return (
      <table>
        <thead className='grey lighten-3'>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Team</th>
            <th>Grid</th>
            <th>Position</th>
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
  render() {
    const { resultData } = this.props;
    const position1 = resultData.Results[0].position;

    return (
      <tr>
        <td>{resultData.round}</td>
        <td>{resultData.raceName}</td>
        <td>{resultData.Results[0].Constructor.name}</td>
        <td>{resultData.Results[0].grid}</td>
        <td className={`${position(position1)}`}>{position1}</td>
      </tr>
    );
  }
}
export default DriverResults;
