import React from 'react';

import {Toolbar, ToolbarTitle} from 'material-ui';

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
      <ToolbarTitle
        text="Crazy parser"
        style={toolbarTitleStyles}
      />
    </Toolbar>
  );
}

export default AppHeader;
