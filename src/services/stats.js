import axios from "axios";

export const getKpis = async () => {
  return await axios.get(process.env.REACT_APP_API_URL + "/stats/kpi");
};
