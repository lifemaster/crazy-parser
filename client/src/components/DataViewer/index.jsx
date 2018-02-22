import React from 'react';
import { connect } from 'react-redux';

import { Card } from 'material-ui';
import ReactTable from 'react-table';

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
          <ReactTable
            data={props.data.credit.data}
            filterable
            defaultPageSize={10}
            showPaginationTop
            showPaginationBottom
            defaultFilterMethod={(filter, row) => {
              return row[filter.id].indexOf(filter.value) >= 0;
            }}
            columns={[
              {
                Header: 'Счет',
                accessor: 'accountNumber',
                sortMethod: (a, b) => {
                  const triadas1 = a.split('-').map(value => +value);
                  const triadas2 = b.split('-').map(value => +value);

                  if (triadas1[0] === triadas2[0]) {
                    return triadas1[1] > triadas2[1] ? 1 : -1;
                  } else {
                    return triadas1[0] > triadas2[0] ? 1 : -1;
                  }
                }
              },
              {
                Header: 'Контрагент',
                accessor: 'contragent'
              },
              {
                Header: 'Сумма',
                accessor: 'amount',
                sortMethod: (a, b) => {
                  return +a > +b ? 1 : -1
                }
              }
            ]}
          />

          <p className="total">{props.data.credit.total.title} {props.data.credit.total.amount}</p>
        </div>

        <div className="table-container">
          <h3>Дебет</h3>
          <ReactTable
            data={props.data.debet.data}
            filterable
            defaultPageSize={10}
            showPaginationTop
            showPaginationBottom
            defaultFilterMethod={(filter, row) => {
              return row[filter.id].indexOf(filter.value) >= 0;
            }}
            columns={[
              {
                Header: 'Счет',
                accessor: 'accountNumber',
                sortMethod: (a, b) => {
                  const triadas1 = a.split('-').map(value => +value);
                  const triadas2 = b.split('-').map(value => +value);

                  if (triadas1[0] === triadas2[0]) {
                    return triadas1[1] > triadas2[1] ? 1 : -1;
                  } else {
                    return triadas1[0] > triadas2[0] ? 1 : -1;
                  }
                }
              },
              {
                Header: 'Контрагент',
                accessor: 'contragent'
              },
              {
                Header: 'Сумма',
                accessor: 'amount',
                sortMethod: (a, b) => {
                  return +a > +b ? 1 : -1
                }
              }
            ]}
          />

          <p className="total">{props.data.debet.total.title} {props.data.debet.total.amount}</p>
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
