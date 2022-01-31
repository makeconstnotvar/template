import {OperatorsMultiStore} from "./OperatorsMultiStore";
import {operatorApi} from "api/operatorApi";

class SupervisorsMultiStore extends OperatorsMultiStore {
  fetchMethod = operatorApi.getSupervisors;
}

export {SupervisorsMultiStore}
