import React, { Component, PropTypes } from 'react';
import { Table, Input } from 'antd';
import _ from 'lodash';
import reqwest from 'reqwest';

class CoreDataTable_MainTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],  // 这里配置默认勾选列
            data: [],
            // pagination: {
            //     total:5,
            //     showSizeChanger: true,
            //     onShowSizeChange(current, pageSize) {
            //         console.log('Current: ', current, '; PageSize: ', pageSize);
            //     },
            // },
            loading: false,
        };

        // this.handleTableChange = this.handleTableChange.bind(this);
        // this.onSelectChange = this.onSelectChange.bind(this);

    };

    // handleTableChange(pagination, filters, sorter) {
    //     const pager = this.state.pagination;
    //     pager.current = pagination.current;
    //     this.setState({
    //         pagination: pager,
    //     });
    //     this.props.filterTable(pagination, filters, sorter);

    // };

    // onSelectChange(selectedRowKeys) {
    //     console.log('selectedRowKeys changed: ', selectedRowKeys);
    //     this.setState({ selectedRowKeys });
    // };

    componentDidMount() {
        // this.fetch();
        this.props.filterTable();
    };

    render() {
        // console.log(this.props);
        
        const rowSelection = this.props.selectable?{
            selectedRowKeys: this.props.selectedRowKeys,
            onChange: this.props.onSelectChange,
        }
        :null;

        var columns=_.filter(this.props.columns, function(column){
            return !column.hide;
        });

        return (
            <div>
                <Table columns={columns} bordered={true}
                    rowKey={record => record.NO}
                    dataSource={this.props.dataSource}
                    rowSelection={rowSelection}
                    pagination={this.props.pagination}
                    loading={this.state.loading}
                    onChange={this.props.handleTableChange}
                    />
            </div>
        );
    }
}

CoreDataTable_MainTable.propTypes = {

};

export default CoreDataTable_MainTable;
