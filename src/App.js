import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "./landingPage";
import ImportCountries from "./pages/importCountries/ImportCountries";
import ImportCountry from "./pages/importCountry";
import OpiRanking from "./pages/opiRanking/OpiRanking";
import Reports from "./pages/reports/Reports";
import ErrorComponent from "./pages/errorComponent/ErrorComponent";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import "./App.scss";
import Report from "./pages/reports/Report";

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <ErrorComponent>
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/countries" component={ImportCountries} />
              <Route path="/country" component={ImportCountry} />
              <Route path="/copi-ranking" component={OpiRanking} />
              <Route path="/reports" component={Reports} />
              <Route path="/report/:country" component={Report} />
            </Switch>
          </Router>
        </ErrorComponent>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
