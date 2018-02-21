import React from 'react';

import FileUploader from '../FileUploader';

import './index.css';

function MainContent() {
  return (
    <div className="content-wrapper">
      <h1>Welcome to "Crazy parser"</h1>
      <FileUploader />
    </div>
  );
}

export default MainContent;
