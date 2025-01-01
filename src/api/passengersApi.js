import axios from "axios";
//Retrieve the information from ICA API
//for the number of passengers cleared at Singapore Checkpoints.[PhyoMin]
const datasetId = "d_e78db35440a41c0baff4e5f669532bd9";
const BASE_URL =
  "https://data.gov.sg/api/action/datastore_search?resource_id=" + datasetId;
const passengersApi = axios.create({ baseURL: BASE_URL });

export default passengersApi;
