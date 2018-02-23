import React from 'react';

import ReactTable from 'react-table';

function DebetCreditTable(props) {
  return (
    <div>
      <ReactTable
        data={props.data}
        filterable
        defaultPageSize={10}
        showPaginationTop
        showPaginationBottom
        defaultFilterMethod={(filter, row) => {
          return row[filter.id].indexOf(filter.value) >= 0;
        }}
        columns={[
          { Header: 'Счет', accessor: 'accountNumber' },
          { Header: 'Контрагент', accessor: 'contragent' },
          { Header: 'Сумма', accessor: 'amount' }
        ]}
      />

      <p className="total">{props.total.title} {props.total.amount}</p>
    </div>
  );
}

export default DebetCreditTable;
