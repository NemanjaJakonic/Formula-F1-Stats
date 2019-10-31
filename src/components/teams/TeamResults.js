import React, { Component } from "react";
import * as $ from "jquery";
import Spinner from "../../layout/Spinner";
import { position } from "../position";

export class TeamResults extends Component {
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
    const id = this.props.teamid;
    const year = this.props.year;
    var url = `https://ergast.com/api/f1/${year}/constructors/${id}/results.json`;
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
      <table className="responsive-table">
        <thead className="grey lighten-4">
          <tr>
            <th>Round</th>
            <th>Grand Prix</th>
            <th>{results[0].Results[0].Driver.familyName}</th>
            <th>{results[0].Results[1].Driver.familyName}</th>
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
  render() {
    const { resultData } = this.props;
    const points =
      parseInt(resultData.Results[0].points) +
      parseInt(resultData.Results[1].points);
    const position1 = resultData.Results[0].position;
    const position2 = resultData.Results[1].position;

    return (
      <tr>
        <td>{resultData.round}</td>
        <td>{resultData.raceName}</td>
        <td className={`${position(position1)}`}>{position1}</td>
        <td className={`${position(position2)}`}>{position2}</td>
        <td>{points}</td>
      </tr>
    );
  }
}
export default TeamResults;
