import React from "react";
import { Link } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import { firebaseLogout } from "../../../firebase";

const AdminNav = () => {
  const links = [
    { title: "Matches", linkTo: "/admin_matches" },
    { title: "Add Matches", linkTo: "/admin_matches/edit_match" },
    { title: "Players", linkTo: "/admin_players" },
    { title: "Add Players", linkTo: "/admin_players/edit_players" }
  ];

  const style = {
    color: "#ffffff",
    fontWeight: "300",
    borderBottom: "1px solid #353535"
  };

  const renderItems = () =>
    links.map(({ title, linkTo }) => (
      <Link to={linkTo} key={title}>
        <ListItem button style={style}>
          {title}
        </ListItem>
      </Link>
    ));
  return (
    <div>
      {renderItems()}
      <ListItem button style={style} onClick={firebaseLogout}>
        Log Out
      </ListItem>
    </div>
  );
};

export default AdminNav;
