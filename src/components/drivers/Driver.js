import React from "react";
import Flag from "react-world-flags";
import history from "../../history";
import { flags } from "../flags";

class Driver extends React.Component {
  getDriverDetails = e => {
    let linkTo = "/drivers/" + e.target.dataset.year+ "/"+ e.target.dataset.itemid;
    console.log(e.target.dataset.year)
    history.push(linkTo);

  };

  render() {
    const { driverData, year } = this.props;
    console.log(year)
    const driverName =
      driverData.Driver.givenName + " " + driverData.Driver.familyName;
    const national = driverData.Driver.nationality;

    return (
      <tr>
        <td>{driverData.position}</td>
        <td>
          <Flag code={`${flags(national)}`} width="50" />
          <button
            className="btn-flat red-text text-darken-2"
            onClick={this.getDriverDetails}
            data-itemid={driverData.Driver.driverId}
            data-year={year}
          >
            {driverName}
          </button>
        </td>
        <td>{driverData.Constructors[0].name}</td>
        <td>{driverData.points}</td>
      </tr>
    );
  }
}

export default Driver;
