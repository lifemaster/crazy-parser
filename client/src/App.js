import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MainApp from './components/MainApp';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <MainApp />
      </MuiThemeProvider>
    );
  }
}

export default App;
