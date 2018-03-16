import React from 'react'
import { Grid, PageHeader } from 'react-bootstrap'

import OfferCreate from '../components/OfferCreate'

export default function OfferCreatePage () {
  return (
    <Grid>
      <PageHeader>
        Создание нового финансового предложения
      </PageHeader>
      <OfferCreate />
    </Grid>
  )
}
