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

        const rowSelection = this.props.selectable ? {
            selectedRowKeys: this.props.selectedRowKeys,
            onChange: this.props.onSelectChange,
        }
            : null;

        var columns = _.filter(this.props.columns, function (column) {
            return !column.hide;
        });

        /**********************针对固定Option的情况。暂不支持Url加载Option****************** */
        var selectColumns = _.filter(this.props.columns, { controlType: "select" });
        for (var i = 0; i < selectColumns.length; i++) {
            var column = selectColumns[i];
            // TODO 考虑使用if(column.renderDataIndex){
            if (column.controlBasicInfo && column.controlBasicInfo.items) {
                column.render = function (value, row, index) {//要闭包，否则会出问题  //TODO 或许可以直接用column.controlBaseInfo
                    // return <span>{row[this.renderDataIndex]}</span>;
                    var columnInfo = _.find(this.controlBasicInfo.items, { value: value });
                    return columnInfo.name;
                }.bind(column);
            }
        }

        var radioColumns = _.filter(this.props.columns, { controlType: "radio" });
        for (var i = 0; i < radioColumns.length; i++) {
            var column = radioColumns[i];
            // TODO 考虑使用if(column.renderDataIndex){
            if (column.controlBasicInfo && column.controlBasicInfo.items) {
                column.render = function (value, row, index) {//要闭包，否则会出问题  //TODO 或许可以直接用column.controlBaseInfo
                    // return <span>{row[this.renderDataIndex]}</span>;
                    var columnInfo = _.find(this.controlBasicInfo.items, { value: value });
                    return columnInfo.name;
                }.bind(column);
            }
        }

        return (
            <div>
                <Table columns={columns} bordered={true}
                    rowKey={record => record.NO}
                    dataSource={this.props.dataSource}
                    rowSelection={rowSelection}
                    pagination={this.props.pagination}
                    loading={this.props.loading}
                    onChange={this.props.handleTableChange}
                    />
            </div>
        );
    }
}

CoreDataTable_MainTable.propTypes = {

};

export default CoreDataTable_MainTable;
