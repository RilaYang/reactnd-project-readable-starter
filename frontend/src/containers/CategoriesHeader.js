import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectCategory, getAllPosts, getAllCategories, selectPost } from '../actions'
import capitalize from 'capitalize'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = theme => ({
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  link: {
    textDecoration: 'none'
  }
})

class CategoriesHeader extends Component {
  state = {
    anchorEl: null,
    selectedIndex: 1,
  };

  handleClickMenuIcon = event => this.setState({ anchorEl: event.currentTarget })

  handleMenuItemClick = (event, index) => this.setState({ selectedIndex: index, anchorEl: null })
  
  handleMenuItemClick = (event, index) => this.setState({ selectedIndex: index, anchorEl: null })

  handleClose = () => this.setState({ anchorEl: null })

  componentDidMount() {
    const { selectCategory, getAllCategories, getAllPosts, selectPost, match, history } = this.props
    const { categoryName = "all categories" } = match.params

    getAllCategories()
      .then(() => getAllPosts())
      .then(() => selectCategory(categoryName))

    history.listen((location, done) => {
      const [ , categoryName, postId] = location.pathname.split("/")

      selectCategory(categoryName ? categoryName : "all categories")
      selectPost(postId)
    })
  }

  render() {
    const { selectCategory, categories, classes } = this.props
    const { anchorEl } = this.state;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon onClick={this.handleClickMenuIcon} />
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {categories.map((category, idx) => (
                <Link 
                  key={category.key}
                  className={classes.link}
                  to={`/${category.path}`} 
                  onClick={() => selectCategory(category.name)}
                >
                  <MenuItem
                    className={classes.menuItem}
                    key={category.key}
                    selected={idx === this.state.selectedIndex}
                    onClick={event => this.handleMenuItemClick(event, idx)}
                  >
                    {capitalize.words(category.name)}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Readable
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

CategoriesHeader.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired
}

const mapStateToProps = state => ({
  categories: state.categories.list,
})

const mapDispatchToProps = (dispatch) => ({
  selectCategory: (categoryName) => dispatch(selectCategory(categoryName)),
  selectPost: postId => dispatch(selectPost(postId)),
  getAllCategories: () => dispatch(getAllCategories()),
  getAllPosts: () => dispatch(getAllPosts())
})

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesHeader));
