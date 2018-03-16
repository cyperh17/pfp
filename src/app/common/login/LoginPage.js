import React from 'react'
import { Grid, PageHeader } from 'react-bootstrap'

import LoginForm from './LoginForm'

const title = process.env.REACT_APP_WEBSITE_NAME
const LoginPage = () => {
  return (
    <Grid>
      <PageHeader
        className='text-center'
        style={{ paddingTop: '15px' }}
      >
        {title}
      </PageHeader>
      <LoginForm />
    </Grid>
  )
}

export default LoginPage
