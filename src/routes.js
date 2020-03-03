import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./components/admin/Dashboard";
import AdminMatchs from "./components/admin/matches";
import AddEditMatches from "./components/admin/matches/AddEditMatch";
import AdminPlayers from "./components/admin/players";
import AddEditPlayers from "./components/admin/players/AddEditPlayers";
import Home from "./components/home";
import PrivateRoutes from "./components/outRoutes/privateRoutes";
import PublicRoutes from "./components/outRoutes/publicRoutes";
import Signin from "./components/signin";
import Layout from "./hoc/Layout";
import TheTeam from "./components/theTeam";
import TheMatches from "./components/theMatches";
import NotFound from "./components/ui/NotFound";

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PublicRoutes {...props} exact component={Home} path="/" />
        <PublicRoutes {...props} exact component={TheTeam} path="/the_team" />
        <PublicRoutes
          {...props}
          exact
          component={TheMatches}
          path="/the_matches"
        />
        <PublicRoutes
          restricted={true}
          exact
          {...props}
          component={Signin}
          path="/signin"
        />
        <PrivateRoutes
          {...props}
          exact
          component={Dashboard}
          path="/dashboard"
        />
        <PrivateRoutes
          {...props}
          exact
          component={AdminMatchs}
          path="/admin_matches"
        />
        <PrivateRoutes
          {...props}
          exact
          component={AddEditMatches}
          path="/admin_matches/edit_match/:id"
        />
        <PrivateRoutes
          {...props}
          exact
          component={AddEditMatches}
          path="/admin_matches/edit_match"
        />
        <PrivateRoutes
          {...props}
          exact
          component={AdminPlayers}
          path="/admin_players"
        />
        <PrivateRoutes
          {...props}
          exact
          component={AddEditPlayers}
          path="/admin_players/edit_players/:id"
        />
        <PrivateRoutes
          {...props}
          exact
          component={AddEditPlayers}
          path="/admin_players/edit_players"
        />
        <PublicRoutes {...props} exact component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
