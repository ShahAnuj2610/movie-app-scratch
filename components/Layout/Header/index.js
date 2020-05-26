import React, { Component } from 'react';
import { Button, Drawer } from 'antd';
import Link from 'next/link';
import { headerCls, drawerCls } from './styles';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';

class Header extends Component {
  state = {
    visible: false,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div css={headerCls}>
        <nav className="menuBar">
          <div className="logo">
            <Link href="/">
              <img src="/static/images/logo@1x.png" alt="logo" />
            </Link>
          </div>
          <div className="menuCon">
            <div className="leftMenu">
              <LeftMenu />
            </div>
            <div className="rightMenu">
              <RightMenu />
            </div>
            <Button className="barsMenu" onClick={this.showDrawer}>
              <span className="barsBtn" />
            </Button>
            <Drawer
              css={drawerCls}
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={visible}
            >
              <LeftMenu />
              <RightMenu mode="vertical" onClose={this.onClose} />
            </Drawer>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
