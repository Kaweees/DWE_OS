import React, { useState, useEffect } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/system/Box";
import { mainListItems, secondaryListItems } from "./listItems";
import DWELogo_white from "../images/DWELogo_white.svg";
import { Grid, Typography, Divider } from "@mui/material";
import WifiMenu from "./WifiMenu";
import CssBaseline from "@mui/material/CssBaseline";
import ListSubheader from "@mui/material/ListSubheader";
import { lightTheme, darkTheme } from "../themes";
import DevicesContainer from "./DevicesContainer";
import packageBackend from "../package.backend.json";
import Container from "@mui/material/Container";
import { makePostRequest } from "../utils/utils";
import DeviceCard from "./DeviceCard";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { io } from "socket.io-client";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Dashboard(props) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") == "dark" ? darkTheme : lightTheme
  );
  const toggleTheme = () => {
    const newTheme = theme.palette.mode === "dark" ? lightTheme : darkTheme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme.palette.mode);
  };
  const [exploreHD_cards, setExploreHD_cards] = useState([]);
  const [other_cards, setOther_cards] = useState([]);
  const [socket, setSocket] = useState(io());
  console.log("socket", socket);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const addCard = device => {
    if (device.caps.driver) {
      // takes the prevState, and using the `spread` operator
      // appends the new Card to the new array
      // to update the state
      setExploreHD_cards(prevState => [
        ...prevState,
        <DeviceCard key={exploreHD_cards.length} device={device} />,
      ]);
    } else {
      setOther_cards(prevState => [
        ...prevState,
        <DeviceCard key={other_cards.length} device={device} />,
      ]);
    }
  };
  const addDevices = devices => {
    for (let device of devices) {
      addCard(device);
    }
  };
  const removeDevice = device => {
    let devicePath = device.devicePath;
    // modifies state using the "previous state"
    // rather than directly modifying current state variable
    if (device.caps.driver) {
      setExploreHD_cards(prevState =>
        prevState.filter(card => {
          return card.props.device.devicePath != devicePath;
        })
      );
    } else {
      setOther_cards(prevState =>
        prevState.filter(card => {
          return card.props.device.devicePath != devicePath;
        })
      );
    }
  };

  useEffect(() => {
    // Add event listeners to handle device connection status updates
    socket.on("connect", () => {
      console.log("connect");
      fetch("/devices")
        .then(response => response.json())
        .then(devices => addDevices(devices));
    });
    socket.on("disconnect", () => {
      console.log("disconnect");
      fetch("/devices")
        .then(response => response.json())
        .then(devices => {
          for (let device of devices) {
            removeDevice(device);
          }
        });
    });
    socket.on("added", addedDevices => {
      console.log("added", addedDevices);
      for (let device of addedDevices) {
        addCard(device);
      }
    });
    socket.on("removed", removedDevices => {
      console.log("removed", removedDevices);
      for (let device of removedDevices) {
        removeDevice(device);
      }
    });
  }, []);

  const updateTheme = e => {
    localStorage.setItem("theme", e.target.checked ? "dark" : "light");
    setTheme(e.target.checked ? darkTheme : lightTheme);
  };
  const resetSettings = () => {
    makePostRequest("/resetSettings", {}, () => window.location.reload());
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position='absolute' open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: "20px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              display='flex'
              flexDirection='row'
              alignItems='center'
              spacing={2}
              style={{ width: "100%" }}
            >
              <Box style={{ marginTop: "5px" }} sx={{ pr: 3 }}>
                <img
                  src={DWELogo_white}
                  style={{ height: 30 }}
                  alt='DWE Logo'
                />
              </Box>
              <Typography component='h1' variant='h6' color='inherit' noWrap>
                Home
              </Typography>
              <Divider
                orientation='vertical'
                sx={{ mx: 3 }}
                style={{ backgroundColor: "white", height: 40, width: 3 }}
              />
              <Typography
                component='h1'
                variant='h6'
                color='inherit'
                noWrap
              ></Typography>
              <Typography
                component='h1'
                variant='h6'
                color='inherit'
                noWrap
              ></Typography>
              <Typography component='h1' variant='h6' color='inherit' noWrap>
                Stereo
              </Typography>
              <Divider
                orientation='vertical'
                sx={{ mx: 3 }}
                style={{ backgroundColor: "white", height: 40, width: 3 }}
              />
              <Typography component='h1' variant='h6' color='inherit' noWrap>
                ML/AI
              </Typography>
              <Divider
                orientation='vertical'
                sx={{ mx: 3 }}
                style={{ backgroundColor: "white", height: 40, width: 3 }}
              />
              <Typography component='h1' variant='h6' color='inherit' noWrap>
                Simulation
              </Typography>
            </Box>
            <Grid justifyContent='flex-end'>
              <WifiMenu />
            </Grid>
            <PowerSettingsNewIcon />
            {props.children}
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <ListItemText
              style={{
                textAlign: "center",
                padding: "auto",
              }}
              primary={"DWE OS Pre-Alpha"}
              secondary={"Version: " + packageBackend.version}
            />
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component='nav'>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
              <ListSubheader fontWeight='fontWeightBold' component='div' inset>
                Options
              </ListSubheader>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon
                  paddingY='auto'
                  paddingX='auto'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    theme.palette.mode === "dark" ? "Light Theme" : "Dark Theme"
                  }
                />
              </ListItemButton>
              <ListItemButton onClick={resetSettings}>
                <ListItemIcon
                  paddingY='auto'
                  paddingX='auto'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  <RestartAltIcon
                    paddingY='auto'
                    paddingX='auto'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  />
                </ListItemIcon>
                <ListItemText primary='Reset Settings' />
              </ListItemButton>
            </React.Fragment>
          </List>
        </Drawer>
        <Box
          component='main'
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} style={{ paddingTop: "16px" }}>
              {/* DeviceCards */}
              <div style={{ minHeight: "14px" }} />
              <div style={{ height: "calc(100vh - 14px)" }}>
                <DevicesContainer>
                  {exploreHD_cards}
                  {other_cards}
                </DevicesContainer>
              </div>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
