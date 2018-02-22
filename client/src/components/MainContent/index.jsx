import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FileUploader from '../FileUploader';
import DataViewer from '../DataViewer';

import './index.css';

function MainContent(props) {
  return (
    <div className="content-wrapper">
      <h1>Welcome to "Crazy parser"</h1>
      <FileUploader />
      {props.parsedData ? <DataViewer /> : ''}
    </div>
  );
}

MainContent.propTypes = {
  parsedData: PropTypes.object
};

function mapStateToProps(state) {
  return {
    parsedData: state.parsedData
  }
}

const MainContentContainer = connect(mapStateToProps)(MainContent);

export default MainContentContainer;
