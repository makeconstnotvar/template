import {cancelableGet, host} from "./utils";
import axios from "axios";

const operatorApi = {
  async getOperators(params, executor) {
    if (params)
      params.isSupervisor = false;
    return cancelableGet('/operator/operators')(params, executor);
  },
  async getSupervisors(params) {
    params.isSupervisor = true;
    let response = await axios.get(`${host}/operator/operators`, {params});
    return response.data;
  },
}
export {operatorApi}