import Grid from './muiImports'

export default function DevicesContainer(props) {
  return (
    <Grid
      container
      spacing={0}
      alignItems="baseline"
      style={{ justifyContent: 'center', paddingBottom: '20px' }}
    >
      {props.children}
    </Grid>
  )
}
