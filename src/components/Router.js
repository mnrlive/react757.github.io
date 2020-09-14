import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Country from "./components/Country";

const Router = () => (
  <BrowserRouter>
    <Switch>
      
      <Route path="/recipe/:id" component={Country} />
    </Switch>
  </BrowserRouter>
);

export default Router;



