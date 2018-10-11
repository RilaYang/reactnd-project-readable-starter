import React, { Component } from 'react';
import shortid from 'shortid';
import { Menu } from 'semantic-ui-react';

class Nav extends Component {
    render() {
        const { categories, activeCategory, onClickHandler} = this.props;

        return(
            <Menu vertical fluid>
             {
                 categories.map((item) => {
                     return <Menu.Item key={shortid.generate()}
                                       name={item.name}
                                       active={activeCategory === item.name}
                                       onClick={onClickHandler}>{item.name}
                                       </Menu.Item>
                 })
             }
            </Menu>
        )
    }
}

export default Nav;
