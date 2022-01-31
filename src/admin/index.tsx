import React from "react";
import {render} from "react-dom";

import {Router} from "@reach/router";
import {Provider} from "mobx-react";

import {stores as adminStores} from "admin/stores/stores";
import {stores} from "commons/stores/stores";

import {AdminLayout} from "admin/pages/AdminLayout";
import {StoresPage} from "admin/pages/StoresPage";
import {SettingsPage} from "admin/pages/SettingsPage";

const App = () => {
  return (
    <Provider {...stores} {...adminStores}>
      <Router primary={false} className="router">
        <AdminLayout path="/admin" exact>
          <StoresPage path="/stores"/>
          <SettingsPage path="/settings"/>
        </AdminLayout>
      </Router>
    </Provider>
  )
}

render(<App/>, document.querySelector('#root'));