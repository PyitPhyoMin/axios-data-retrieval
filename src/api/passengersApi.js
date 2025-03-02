import axios from "axios";
//Retrieve the information from ICA API
//for the number of passengers cleared at Singapore Checkpoints.[PhyoMin]
/* const datasetId = "d_e78db35440a41c0baff4e5f669532bd9";
const BASE_URL =
  "https://data.gov.sg/api/action/datastore_search?resource_id=" + datasetId; */

  // using DotNetCore API which is hosted on Render.com
  const BASE_URL =
  "https://webdotnetcoreapi-2.onrender.com/get-data";
  const passengersApi = axios.create({ baseURL: BASE_URL });

export default passengersApi;
