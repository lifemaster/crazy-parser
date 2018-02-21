import React from 'react';

import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';

import './index.css';

const topbarStyles = {
  background: '#000'
};

const toolbarTitleStyles = {
  color: '#FFF'
};

function AppHeader() {
  return (
    <Toolbar style={topbarStyles}>
      <ToolbarGroup>
        <img className="logo" src="./images/radiation.png" alt="logo" width="40" height="40" />
        <ToolbarTitle text="Crazy parser" style={toolbarTitleStyles} />
      </ToolbarGroup>
    </Toolbar>
  );
}

export default AppHeader;
