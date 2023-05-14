// routes to different pages
import routes from './routes'

// Filter the routes into two categories: Devices and Communications
const getRoutes = (routes) => {
  const devicesRoutes = routes.filter((route) => route.category === 'Devices')
  const communicationsRoutes = routes.filter(
    (route) => route.category === 'Communications'
  )
  return (
    <React.Fragment>
      <Divider sx={{ my: 1 }} />
      <ListSubheader fontWeight="fontWeightBold" component="div" inset>
        Devices
      </ListSubheader>
      {devicesRoutes.map((route) => {
        if (route.route) {
          return (
            <Route
              exact
              path={route.route}
              element={route.component}
              key={route.key}
            >
              <ListItemButton>
                <ListItemIcon
                  paddingY="auto"
                  paddingX="auto"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {route.icon}
                </ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </Route>
          )
        }
      })}
      <ListSubheader fontWeight="fontWeightBold" component="div" inset>
        Communications
      </ListSubheader>
      {communicationsRoutes.map((route) => {
        if (route.route) {
          return (
            <Route
              exact
              path={route.route}
              element={route.component}
              key={route.key}
            >
              <ListItemButton>
                <ListItemIcon
                  paddingY="auto"
                  paddingX="auto"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {route.icon}
                </ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </Route>
          )
        }
      })}
      <Divider sx={{ my: 1 }} />
    </React.Fragment>
  )
}

export default getRoutes(routes)
