import React, {Component, PropTypes} from 'react';
import { Table, Input } from 'antd';
// import 'whatwg-fetch';
import reqwest from 'reqwest';

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    // width: '20%',
}, {
        title: '性别',
        dataIndex: 'gender',
        sorter: true,
        // filters: [
        //     { text: 'Male', value: 'male' },
        //     { text: 'Female', value: 'female' },
        // ],
        // width: '20%',
    }, {
        title: '邮箱',
        dataIndex: 'email',

        // render: email => {
        //     return <Input type="text" defaultValue={email} style={{ maxWidth: 200 }}/>;
        // }
    }];

class CoreDataTable_MainTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],  // 这里配置默认勾选列
            data: [],
            pagination: {},
            loading: false,
        };

        this.handleTableChange = this.handleTableChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);

    };

    handleTableChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.props.filterTable(pagination, filters, sorter);

    };

    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    componentDidMount() {
        // this.fetch();
        this.props.filterTable();
    };

    render() {

        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <div>
                <Table columns={columns} bordered={true}
                    rowKey={record => record.registered}
                    dataSource={this.state.data}
                    rowSelection={rowSelection}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    />
            </div>
        );
    }
}

CoreDataTable_MainTable.propTypes = {

};

export default CoreDataTable_MainTable;
