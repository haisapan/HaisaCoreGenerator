// import {DataTable } from 'antd/lib/';
// import 'antd/dist/antd.css'; 
import React, {Component, PropTypes} from 'react';
import { Form, Table, Icon, Card, Row } from 'antd';

import reqwest from 'reqwest';

import CoreDataTable_SearchBar from './CoreDataTable_SearchBar/CoreDataTable_SearchBar';
import CoreDataTable_ToolBar from './CoreDataTable_ToolBar/CoreDataTable_ToolBar';
import CoreDataTable_MainTable from './CoreDataTable_MainTable/CoreDataTable_MainTable';

// const columns = [{
//   title: '姓名',
//   dataIndex: 'name',
//   key: 'name',
//   width: '40%',
// }, {
//   title: '年龄',
//   dataIndex: 'age',
//   key: 'age',
//   width: '30%',
// }, {
//   title: '住址',
//   dataIndex: 'address',
//   key: 'address',
//   width: '30%',
// }];

// const data = [{
//   key: 1,
//   name: 'a',
//   age: 32,
//   address: '我是a',
//   children: [{
//     key: 11,
//     name: 'aa',
//     age: 33,
//     address: '我是aa',
//   }, {
//     key: 12,
//     name: 'ab',
//     age: 33,
//     address: '我是ab',
//     children: [{
//       key: 121,
//       name: 'aba',
//       age: 33,
//       address: '我是aba',
//     }],
//   }, {
//     key: 13,
//     name: 'ac',
//     age: 33,
//     address: '我是ac',
//     children: [{
//       key: 131,
//       name: 'aca',
//       age: 33,
//       address: '我是aca',
//       children: [{
//         key: 1311,
//         name: 'acaa',
//         age: 33,
//         address: '我是acaa',
//       }, {
//         key: 1312,
//         name: 'acab',
//         age: 33,
//         address: '我是acab',
//       }],
//     }],
//   }],
// }, {
//   key: 2,
//   name: 'b',
//   age: 32,
//   address: '我是b',
// }];



class CoreDataTable extends Component {

    constructor(props) {
        super(props);
        this.filterTable = this.filterTable.bind(this);
        this.state={
            pagination: {},
        };
    };

    handleTableChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
    });
};
fetch(params = {}) {
    console.log('请求参数：', params);
    this.setState({ loading: true });
    reqwest({
        url: 'http://api.randomuser.me',
        method: 'get',
        data: {
            results: 10,
                ...params,
            },
type: 'json',
        })
        .then(data => {
    const pagination = this.state.pagination;
    // Read total count from server
    // pagination.total = data.totalCount;
    pagination.total = 200;
    this.setState({
        loading: false,
        data: data.results,
        pagination,
    });
});
  };


onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
};


filterTable(pagination={}, filters, sorter={}){
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
    });
};

fetch(params = {}) {
    console.log('请求参数：', params);
    this.setState({ loading: true });
    reqwest({
        url: 'http://api.randomuser.me',
        method: 'get',
        data: {
            results: 10,
            ...params,
      },
type: 'json',
    }).then(data => {
    const pagination = this.state.pagination;
    // Read total count from server
    // pagination.total = data.totalCount;
    pagination.total = 200;
    this.setState({
        loading: false,
        data: data.results,
        pagination,
    });
});
  };

render() {
        
    var CoreDataTable_SearchBarForm = Form.create()(CoreDataTable_SearchBar);

    return (
        <div className="core-table">
            <Row>
                <Card  span="20">
                    <Card>
                        <CoreDataTable_SearchBarForm columns={this.props.config.columns} filterTable={this.filterTable}></CoreDataTable_SearchBarForm>
                    </Card>

                    {//<CoreDataTable_ToolBar ></CoreDataTable_ToolBar>
                    }
                    <CoreDataTable_MainTable filterTable={this.filterTable}></CoreDataTable_MainTable>
                </Card>
            </Row>
        </div>
    );
}
}

CoreDataTable.propTypes = {

};

export default CoreDataTable;

// ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);