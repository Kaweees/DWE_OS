// Material Dashboard 2 React layouts
import Cameras from 'layouts/cameras'
import Lights from 'layouts/lights'
import Misc from 'layouts/misc'
import WiFi from 'layouts/wifi'
import Wired from 'layouts/wired'

// @mui icons
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SignalWifi0BarOutlinedIcon from '@mui/icons-material/SignalWifi0BarOutlined'
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined'

import LightbulbIcon from '@mui/icons-material/Lightbulb'

const routes = [
  {
    category: 'Devices',
    type: 'collapse',
    name: 'Cameras',
    key: 'cameras',
    icon: (
      <VideoCameraBackOutlinedIcon
        paddingY="auto"
        paddingX="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      />
    ),
    route: '/devices/cameras',
    component: <Cameras />,
  },
  {
    category: 'Devices',
    type: 'collapse',
    name: 'Lights',
    key: 'lights',
    icon: (
      <LightbulbIcon
        paddingY="auto"
        paddingX="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      />
    ),
    route: '/devices/lights',
    component: <Lights />,
  },
  {
    category: 'Devices',
    type: 'collapse',
    name: 'Misc',
    key: 'misc',
    icon: (
      <SettingsOutlinedIcon
        paddingY="auto"
        paddingX="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      />
    ),
    route: '/devices/misc',
    component: <Misc />,
  },
  {
    category: 'Communications',
    type: 'collapse',
    name: 'WiFi',
    key: 'wifi',
    icon: (
      <SignalWifi0BarOutlinedIcon
        paddingY="auto"
        paddingX="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      />
    ),
    route: '/communications/wifi',
    component: <WiFi />,
  },
  {
    category: 'Communications',
    type: 'collapse',
    name: 'Wired',
    key: 'wired',
    icon: (
      <StorageOutlinedIcon
        paddingY="auto"
        paddingX="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      />
    ),
    route: '/communications/wired',
    component: <Wired />,
  },
]

export default routes
