import React from 'react';
import { connect } from 'react-redux';

import { Card } from 'material-ui';

import DebetCreditTable from '../DebetCreditTable';

import "react-table/react-table.css";

import './index.css';

function DataViewer(props) {
  return (
    <Card className="container">
      <h2>{props.data.info.title}</h2>
      <p>{props.data.info.begin.title}: {props.data.info.begin.value}</p>
      <p>{props.data.info.end.title}: {props.data.info.end.value}</p>

      <div className="tables">
        <div className="table-container">
          <h3>Кредит</h3>
          <DebetCreditTable
            data={props.data.credit.data}
            total={props.data.credit.total}
          />
        </div>

        <div className="table-container">
          <h3>Дебет</h3>
          <DebetCreditTable
            data={props.data.debet.data}
            total={props.data.debet.total}
          />
        </div>
      </div>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    data: state.parsedData
  }
}

const DataViewerContainer = connect(mapStateToProps)(DataViewer);

export default DataViewerContainer;
