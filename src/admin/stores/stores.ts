import {SidebarStore} from './SidebarStore';
import {StoresStore} from './StoresStore';
import {SettingsStore} from './SettingsStore';

const stores = {
  $sidebar: new SidebarStore(),
  $stores: new StoresStore(),
  $settings: new SettingsStore(),
};

export {stores};
