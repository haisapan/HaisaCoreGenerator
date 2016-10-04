// import {DataTable } from 'antd/lib/';
// import 'antd/dist/antd.css'; 
import React, {Component, PropTypes} from 'react';
import { Form, Table, Icon, Card, Row } from 'antd';

import reqwest from 'reqwest';

import CoreDataTable_SearchBar from './CoreDataTable_SearchBar/CoreDataTable_SearchBar';
import CoreDataTable_ToolBar from './CoreDataTable_ToolBar/CoreDataTable_ToolBar';
import CoreDataTable_MainTable from './CoreDataTable_MainTable/CoreDataTable_MainTable';

class CoreDataTable extends Component {

    constructor(props) {
        super(props);
        this.filterTable = this.filterTable.bind(this);
        this.state = {
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


filterTable(pagination = {}, filters, sorter = {}){
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