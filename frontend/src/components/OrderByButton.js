import React, { Component } from 'react'
import * as R from 'ramda'

import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import TableSortLabel from '@material-ui/core/TableSortLabel'

const styles = theme => ({
    sortButton: {
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        marginTop: 10,
        marginLeft: 14,
        fontSize: 18,
    },
})

class OrderByButton extends Component {
    state = {
        direction: 'desc',
    }

    toggleClickHandler = (prop) => {
        const { direction } = this.state
        const { toggleClickHandler } = this.props

        switch(direction) {
            case "desc":
                this.setState({ direction: "asc" })
                toggleClickHandler(prop)
            break
            case "asc":
            default:
                this.setState({ direction: "desc" })
                toggleClickHandler(prop)
            break
        }
    }

    render() {
        const { direction } = this.state
        const { orderBy, classes } = this.props

        return (
            <IconButton variant="raised" className={classes.sortButton} >
                <TableSortLabel
                    className={classes.sortLabel}
                    active={!R.isNil(orderBy.prop)}
                    direction={direction}
                    onClick={() => this.toggleClickHandler({orderBy: orderBy.prop, direction })}
                >
                    {orderBy.text}
                </TableSortLabel>
            </IconButton>
        )
    }
}

export default withStyles(styles, { withTheme: true })(OrderByButton)