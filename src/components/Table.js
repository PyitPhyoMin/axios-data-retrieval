import styles from "./Table.module.css";
//Show the information in table format.[PhyoMin]
function Table({
  list,
  formatNumberWithCommas,
  totalArrivalPassengers,
  totalDepartPassengers,
}) {
  return (
    <div>
      <table
        className={styles.table}
        hidden={list === undefined || list.length === 0}
      >
        <thead>
          <tr>
            <th>No.</th>
            <th>Year</th>
            <th>Arrival Passengers</th>
            <th>Departure Passengers</th>
          </tr>
        </thead>
        <tbody>
          {list !== undefined &&
            list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.year}</td>
                <td>{formatNumberWithCommas(item.arrivalPassengersCount)}</td>
                <td>{formatNumberWithCommas(item.departPassengersCount)}</td>
              </tr>
            ))}
          <tr>
            {/* Show the total number for X years.[PhyoMin] */}
            <td colSpan="2" className={styles.alignColumn}>
              Total
            </td>
            <td>{totalArrivalPassengers}</td>
            <td>{totalDepartPassengers}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default Table;
