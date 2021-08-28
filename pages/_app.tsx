import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { AppBar, Typography, CssBaseline, Toolbar, Container, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
})

const FarmingPlannerApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>周回計画計算機</title>
      </Head>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" className={classes.title}>
            周回計画計算機
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Component {...pageProps} />
      </Container>
    </>
  )
}

export default FarmingPlannerApp
