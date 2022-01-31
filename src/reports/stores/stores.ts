import {ReportsStore} from './ReportsStore';
import {ReportStore} from './ReportStore';
import {SupervisorsMultiStore} from './SupervisorsMultiStore';
import {CallCenterStore} from './CallCenterStore';
import {OperatorsMultiStore} from './OperatorsMultiStore';
import {QueryStore} from './QueryStore';
import {TicketFlagsStore} from './TicketFlagsStore';
import {ModalStoresStore} from './ModalStoresStore';
import {ClusterStore} from './ClusterStore';
import {MacroRegionStore} from './MacroRegionStore';
import {IntervalsStore} from "./IntervalsStore";

const stores = {
  $reports: new ReportsStore(),
  $report: new ReportStore(),
  $supervisorsMulti: new SupervisorsMultiStore(),
  $operatorsMulti: new OperatorsMultiStore(),
  $callCenter: new CallCenterStore(),
  $query: new QueryStore(),
  $ticketFlags: new TicketFlagsStore(),
  $modalStores: new ModalStoresStore(),
  $cluster: new ClusterStore(),
  $macroRegion: new MacroRegionStore(),
  $intervals: new IntervalsStore(),
};

export {stores};
