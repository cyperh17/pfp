import React from 'react'
import { Grid, PageHeader } from 'react-bootstrap'

import OfferList from '../components/OfferList'

export default function OfferListPage () {
  return (
    <Grid>
      <PageHeader>
        Список финансовых предложений
      </PageHeader>
      <OfferList />
    </Grid>
  )
}
