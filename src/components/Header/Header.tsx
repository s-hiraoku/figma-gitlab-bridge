import React from "react";
import { AppBar, Toolbar, IconButton, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button component="div">{title}</Button>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
