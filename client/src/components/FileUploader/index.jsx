import React from 'react';

class FileUploader extends React.Component {
  submit = e => {
    e.preventDefault();

    const form = this.refs.form;

    const formData = new FormData(form);

    this.sendData(formData)
      .then(res => {
        console.log('------------------------------------------------');
        console.log(`Content-Type: ${res.contentType}`);
        console.log(`Content-Length: ${res.contentLength} bytes`);

        if (res.contentType.indexOf('application/json') !== -1) {
          console.log('Data: ', JSON.parse(res.data));
        }
        form.reset();
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
      <div className="uploader-container">
        <form ref="form" onSubmit={this.submit}>
          <input id="imageButton" type="file" name="files"></input>
          <input type="submit" value="Отправить" />
        </form>
      </div>
    );
  }
}

export default FileUploader;
