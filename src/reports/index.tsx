import React from "react";
import {Router} from "@reach/router";
import {Provider} from "mobx-react";
import {render} from "react-dom";

import {stores as reportStores} from "reports/stores/stores";
import {stores} from "commons/stores/stores";
import {HomePage} from "reports/pages/HomePage";

import {Layout} from "reports/pages/Layout";
import {ReportPage} from "reports/pages/ReportPage";


const App = () => {
  return (
    <Provider {...stores} {...reportStores} >
      <Router primary={false} className="router">
        <HomePage path="/"/>
        <Layout path="/reports">
          <ReportPage path="/:reportCode"/>
          <ReportPage path="/"/>
        </Layout>
      </Router>
    </Provider>
  )
}

render(<App/>, document.querySelector('#root'));