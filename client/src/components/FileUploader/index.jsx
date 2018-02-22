import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SelectField, MenuItem, Card } from 'material-ui';

import { setParser, setParsedData } from '../../actions';

import './index.css';

class FileUploader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filePath: null,
      isParseError: false
    };
  }

  onFileInputChange = e => {
    const filePath = e.nativeEvent.target.value;
    this.setState({ filePath });
  }

  handleChangeParser = (e, index, value) => {
    this.props.changeParserValue(value);
  }

  resetForm = e => {
    this.refs.form.elements.files.value = '';

    this.setState({ filePath: null, isParseError: false });

    this.props.changeParserValue('');
  }

  formSubmit = e => {
    const self = this;

    e.preventDefault();

    const form = self.refs.form;
    const formData = new FormData(form);

    formData.append('parser', self.props.parserValue);

    self.sendData(formData)
      .then(res => {
        self.setState({ isParseError: false });

        if (res.contentType.indexOf('application/json') !== -1) {
          console.log('Data: ', JSON.parse(res.data));
          self.props.changeParsedData(JSON.parse(res.data));
        } else {
          self.setState({ isParseError: true });
          self.props.changeParsedData({});
          console.log(res.data);
        }
        self.resetForm();
      })
      .catch(err => {
        self.setState({ isParseError: true });
        self.props.changeParsedData(null);
        console.log(err);
      });
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

          { this.state.isParseError ? <p className="alert-message">Data parse error</p> : '' }

          <div className="input-file-container">
            <label>
              <input type="file" name="files" onChange={this.onFileInputChange} />
              <div className="select-file-btn" type="button">Select file</div>
            </label>
            <div className="file-info">{this.state.filePath || 'File is not selected'}</div>
          </div>

          <SelectField
            floatingLabelText="Select parser"
            value={this.props.parserValue}
            onChange={this.handleChangeParser}
          >
            <MenuItem value={'debetCreditParser'} primaryText="Debet/Credit parser" />
            <MenuItem value={'otherParser'} primaryText="Other parser" />
          </SelectField>

          <div className="button-container">
            <button type="submit" disabled={!this.props.parserValue || !this.state.filePath}>Parse</button>
            <button type="button" onClick={this.resetForm}>Clear</button>
          </div>

        </form>
      </ Card>
    );
  }
}

FileUploader.propTypes = {
  parserValue: PropTypes.string.isRequired,
  changeParserValue: PropTypes.func.isRequired,
  changeParsedData: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    parserValue: state.selectedParser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeParserValue: parserValue => dispatch(setParser(parserValue)),
    changeParsedData: parsedData => dispatch(setParsedData(parsedData))
  }
}

const FileUploaderContainer = connect(mapStateToProps, mapDispatchToProps)(FileUploader);

export default FileUploaderContainer;
