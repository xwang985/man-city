import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../hoc/AdminLayout";
import { firebasePlayers, firebaseLogout } from "../../../firebase";
import { firebaseLooper } from "../../ui/misc";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  LinearProgress
} from "@material-ui/core";

class AdminPlayers extends Component {
  state = { isLoading: true, players: [] };

  componentDidMount() {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot);

      this.setState({ isLoading: false, players });
    });
  }

  render() {
    return (
      <AdminLayout>
        <>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Number</TableCell>
                  <TableCell>NO.</TableCell>
                  <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.players
                  ? this.state.players.map((player, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Link to={`/admin_players/edit_players/${player.id}`}>
                            {player.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin_players/edit_players/${player.id}`}>
                            {player.lastname}
                          </Link>
                        </TableCell>
                        <TableCell>{player.number}</TableCell>
                        <TableCell>{player.position}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Paper>
          <div className="admin_progress">
            {this.state.isLoading ? (
              <LinearProgress thickness={7} style={{ color: "#98e5c9" }} />
            ) : null}
          </div>
        </>
      </AdminLayout>
    );
  }
}

export default AdminPlayers;
