import { useState } from "react";
import passengersApi from "../api/passengersApi";
import Table from "./Table";
import styles from "./View.module.css";

let totArrivalPassengers = 0;
let totDepartPassengers = 0;

function View() {
  const [passengers, setPassengers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const pageHeader = "Number of Passengers cleared at Singapore Checkpoints";

  //Get the data from the API and process to display on user interface.[PhyoMin]
  const getPassengers = async () => {
    try {
      setIsLoading(true);
      const response = await passengersApi.get();

      const passengers = setDataFormat(response.data.result.records);
      setMinYear(
        passengers.reduce(
          (min, passenger) => (passenger.year < min ? passenger.year : min),
          passengers[0].year
        )
      );
      setMaxYear(
        passengers.reduce(
          (max, passenger) => (passenger.year > max ? passenger.year : max),
          passengers[0].year
        )
      );
      setPassengers(passengers);

      totArrivalPassengers = formatNumberWithCommas(
        totalArrivalPassengers(passengers)
      );
      totDepartPassengers = formatNumberWithCommas(
        totalDepartPassengers(passengers)
      );

      return passengers;
    } catch (error) {
      console.log("Getting Error...", error);
    } finally {
      setIsLoading(false);
    }
  };
  //Map the variables format as per necessary for application.[PhyoMin]
  function setDataFormat(apiData) {
    return apiData.map((passenger) => ({
      id: passenger._id,
      year: passenger.year,
      arrivalPassengersCount: passenger.arrival_passengers_count,
      departPassengersCount: passenger.depart_passengers_count,
    }));
  }

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  //Calculate the total number of passengers for arrival.[PhyoMin]
  function totalArrivalPassengers(passengers) {
    const passengersCount = passengers.reduce(
      (total, passenger) => total + Number(passenger.arrivalPassengersCount),
      0
    );
    return passengersCount;
  }
  //Calculate the total number of passengers for departure.[PhyoMin]
  function totalDepartPassengers(passengers) {
    const passengersCount = passengers.reduce(
      (total, passenger) => total + Number(passenger.departPassengersCount),
      0
    );
    return passengersCount;
  }

  return (
    <div>
      <h1>{pageHeader}</h1>
      {passengers !== undefined && passengers.length > 0 && (
        <h2>
          From {minYear} to {maxYear}
        </h2>
      )}
      <button className={styles.dataButton} onClick={getPassengers}>
        Retrieve Information
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table
          list={passengers}
          formatNumberWithCommas={formatNumberWithCommas}
          totalArrivalPassengers={totArrivalPassengers}
          totalDepartPassengers={totDepartPassengers}
        />
      )}
    </div>
  );
}
export default View;
