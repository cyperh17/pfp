import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'react-bootstrap'
import { HashRouter } from 'react-router-dom'

import OfferProfile from '../components/OfferProfile'

export default function OfferListPage ({ match: { params } }) {
  return (
    <Grid>
      <HashRouter hashType='noslash'>
        <OfferProfile id={params.id} />
      </HashRouter>
    </Grid>
  )
}

OfferListPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
}
