import React from 'react';

import {SelectField, MenuItem, Card} from 'material-ui';

import './index.css';

class FileUploader extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  onFileInputChange = e => {
    const filePath = e.nativeEvent.target.value;
    this.setState({ filePath });
  }

  handleChangeParser = (e, index, value) => {
    this.setState({ parserValue: value });
  }

  resetForm = e => {
    this.refs.form.elements.files.value = '';

    this.setState({
      parserValue: null,
      filePath: null
    });
  }

  formSubmit = e => {
    const self = this;

    e.preventDefault();

    const form = self.refs.form;
    const formData = new FormData(form);

    formData.append('parser', self.state.parserValue);

    self.sendData(formData)
      .then(res => {
        console.log('------------------------------------------------');
        console.log(`Content-Type: ${res.contentType}`);
        console.log(`Content-Length: ${res.contentLength} bytes`);

        if (res.contentType.indexOf('application/json') !== -1) {
          console.log('Data: ', JSON.parse(res.data));
        }
        self.resetForm();
      })
      .catch(err => console.log(err));
  }

  sendData(formData) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.open('POST', 'http://localhost:1234/api/upload');

      xhr.send(formData);

      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
          return;
        }

        if(xhr.status !== 200) {
          reject(xhr.statusText);
        } else {
          resolve({
            data: xhr.response,
            contentType: xhr.getResponseHeader('Content-Type'),
            contentLength: xhr.getResponseHeader('Content-Length')
          });
        }
      }
    });
  }

  render() {
    return (
      <Card className="uploader-container">
        <form ref="form" onSubmit={this.formSubmit}>
          <div className="input-file-container">
            <label>
              <input type="file" name="files" onChange={this.onFileInputChange} />
              <div className="select-file-btn" type="button">Select file</div>
              <div className="file-info">{this.state.filePath || 'File is not selected'}</div>
            </label>
          </div>
          <SelectField
            floatingLabelText="Select parser"
            value={this.state.parserValue}
            onChange={this.handleChangeParser}
          >
            <MenuItem value={'debetCreditParser'} primaryText="Debet/Credit parser" />
            <MenuItem value={'otherParser'} primaryText="Other parser" />
          </SelectField>
          <div className="button-container">
            <button type="submit" disabled={!this.state.parserValue || !this.state.filePath}>Send</button>
            <button type="button" onClick={this.resetForm}>Clear</button>
          </div>
        </form>
      </ Card>
    );
  }
}

export default FileUploader;
