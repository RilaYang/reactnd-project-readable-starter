import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Menu,
} from 'semantic-ui-react'

const headerContainerStyle = {
  backgroundColor: '#02b3e4',
  border: '0.125rem solid transparent',
  borderRight: '0.125rem solid #02ccba',
  borderLeft: '0.125rem solid #02b3e4',
  backgroundImage: 'linear-gradient(to right, #02b3e4 0%, #02ccba 100%)'
}

export const DefaultHeader = () => {
  return (
    <Menu fixed="top" inverted style={headerContainerStyle}>
      <Container>
        <Menu.Item header>
          Udacity Readable
        </Menu.Item>
        <Menu.Item as={Link} to={'/'}>Home</Menu.Item>
      </Container>
    </Menu>
  )
}

DefaultHeader.displayName = 'DefaultHeader'

export default DefaultHeader
