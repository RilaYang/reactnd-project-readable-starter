import React, { Fragment } from 'react'
import {
  Container
} from 'semantic-ui-react'

import DefaultHeader from './DefaultHeader'

export const DefaultLayout = (props) => {
  return (
    <Fragment>
        <Container textAlign={'center'}>
          <DefaultHeader />
        </Container>
        { props.children }       
    </Fragment>
  )
}

export default DefaultLayout
