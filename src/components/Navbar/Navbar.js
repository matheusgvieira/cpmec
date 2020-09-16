import React, { Component } from 'react';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { sideDrawerOpen: false };
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => ({ sideDrawerOpen: !prevState.sideDrawerOpen }));
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    const { sideDrawerOpen } = this.state;
    let backdrop;

    if (sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={sideDrawerOpen} />
        {backdrop}
      </div>
    );
  }
}

export default Navbar;
