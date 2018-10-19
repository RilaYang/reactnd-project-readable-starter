import React from 'react'
import CategoriesHeader from './CategoriesHeader'
import PostsView from './PostsView'

import {Route} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 600,
    position: 'relative',
    minHeight: 200,
  },
})

const App = ({ classes }) => (
  <div className={classes.root}>
    <Route path="/:categoryName?" render={(props) => (
      <CategoriesHeader {...props}/>
    )}/>
    <PostsView />
  </div>
)

export default withStyles(styles, { withTheme: true })(App);
