import * as React from 'react'
import {
  LightbulbIcon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SettingsOutlinedIcon,
  SignalWifi0BarOutlinedIcon,
  StorageOutlinedIcon,
  VideoCameraBackOutlinedIcon,
} from './muiImports'

export const mainListItems = (
  <React.Fragment>
    <ListSubheader fontWeight="fontWeightBold" component="div" inset>
      Devices
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon
        paddingY="auto"
        paddingX="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <VideoCameraBackOutlinedIcon
          paddingY="auto"
          paddingX="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        />
      </ListItemIcon>
      <ListItemText primary="Cameras" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon
        paddingY="auto"
        paddingX="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <LightbulbIcon
          paddingY="auto"
          paddingX="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        />
      </ListItemIcon>
      <ListItemText primary="Lights" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon
        paddingY="auto"
        paddingX="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <SettingsOutlinedIcon
          paddingY="auto"
          paddingX="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        />
      </ListItemIcon>
      <ListItemText primary="Misc" />
    </ListItemButton>
  </React.Fragment>
)

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader fontWeight="fontWeightBold" component="div" inset>
      Communications
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon
        paddingY="auto"
        paddingX="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <SignalWifi0BarOutlinedIcon
          paddingY="auto"
          paddingX="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        />
      </ListItemIcon>
      <ListItemText primary="Wi-Fi" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon
        paddingY="auto"
        paddingX="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <StorageOutlinedIcon
          paddingY="auto"
          paddingX="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        />
      </ListItemIcon>
      <ListItemText primary="Wired" />
    </ListItemButton>

  </React.Fragment>
)
