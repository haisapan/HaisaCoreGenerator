// import {DataTable } from 'antd/lib/';
// import 'antd/dist/antd.css'; 
import React, { Component, PropTypes } from 'react';
import { Form, Table, Icon, Card, Row, Modal, Select, Radio } from 'antd';
import _ from 'lodash';
import reqwest from 'reqwest';
import moment from 'moment';

import CoreDataTable_SearchBar from './SearchBar/SearchBar';
import CoreDataTable_ToolBar from './ToolBar/ToolBar';
import CoreDataTable_MainTable from './MainTable/MainTable';
import EditForm from './EditForm/EditForm';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


/** CoreDataTable组件，根据config自动生成页面
 * 
 *  使用：<CoreDataTable config={tableConfig.coreTable}></CoreDataTable>
 *  config数据示例见： db.json
 *  •可以传递CoreTable的props 到antd Table来实现定制
 *  部分Props说明：
 *  •∷pagination: true/false/paginiation配置  。配置不同的时候，数据源不同，但是要求前台支持True/False两种模式
 *  •∷ToolBarExtension  =<div>ToolBar拓展</div>
 *  •∷SearchBarExtension  =<div>SearchBar拓展</div> 
 *  •∷
 */

class CoreDataTable extends Component {

    constructor(props) {
        super(props);

        /**
         * 绑定this
         */
        this.filterTable = this.filterTable.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        
        this.onSelectChange = this.onSelectChange.bind(this);
        this.resetFormToEmpty = this.resetFormToEmpty.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);

        /**设置state */
        this.state = {
            // pagination: {},  //分页信息
            pagination: {
                total: 0,
                pageSizeOptions: ["5", "10", "20", "50", "100"],
                showSizeChanger: true,
                onShowSizeChange(current, pageSize) {
                    console.log('Current: ', current, '; PageSize: ', pageSize);
                },
            },
            editVisible: false, //编辑框是否可见，目前为modal内编辑，后续支持行内编辑
            selectedRowKeys: [],
            selectEditRow: null,
            isAdd: true
        };

        /**传递给toolbar的函数集合 */
        this.toolBarFunc = {
            addNewItem: this.addNewItem,
            editItem: this.editItem,
            deleteItem: this.deleteItem
        };

    };

    /**选中表格的某些行 */
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    handleTableChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.filterTable(pagination, filters, sorter);

    };

    /**查询表格数据 */
    filterTable(pagination = {}, filters, sorter = {}) {
        // debugger;
        this.fetch({
            pageSize: pagination.pageSize || 10,
            page: pagination.current || 1,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
    });
};

fetch(params = {}) {
    console.log('请求参数：', params);
    this.setState({ loading: true });

    reqwest({
        url: this.props.config.queryUrl,//'http://api.randomuser.me',
        method: 'get',
        crossOrigin: true,
        data: {
            // results: 10,
            ...params,
            },
type: 'json',
        })
        .then(result => {
    console.log("表数据", result);
    const pagination = this.state.pagination;
    // Read total count from server
    // pagination.total = data.totalCount;
    pagination.total = result.total;
    this.setState({
        loading: false,
        dataSource: result.data,  //TODO改成result.data
        pagination,
        selectedRowKeys: [],  //再次load数据时清空已选择的行
        selectEditRow: null,
    });
});
  };

addRow(rowData = {}) {
    console.log('创建：', rowData);

    reqwest({
        url: this.props.config.addUrl || this.props.config.queryUrl,
        method: 'post',
        crossOrigin: true,
        data: rowData,
        type: 'json',
    })
        .then(result => {
            console.log("创建成功", result);
            // this.state.dataSource[0]=rowData;
            // this.state.dataSource.splice(this.state.dataSource.length-1,1);
            this.state.dataSource = _.dropRight(this.state.dataSource, 1);
            this.state.dataSource.splice(0, 0, rowData);
            // this.state.dataSource=_.tail(this.state.dataSource);
            Modal.success({
                title: '提示',
                content: '更新成功!',
            });
            this.setState({
                loading: false,
                dataSource: this.state.dataSource

            });
            // const pagination = this.state.pagination;
            // // Read total count from server
            // // pagination.total = data.totalCount;
            // pagination.total = 200;
            // this.setState({
            //     loading: false,
            //     data: data,
            //     pagination,
            // });
        })
        .fail((err) => {
            Modal.error({
                title: '错误',
                content: '添加失败',
            });
        });
};

updateRow(rowData = {}) {
    console.log('创建：', rowData);

    reqwest({
        url: this.props.config.editUrl || this.props.config.queryUrl,
        method: 'put',
        crossOrigin: true,
        data: rowData,
        type: 'json',
    })
        .then(data => {
            console.log("更新成功", data);
            Modal.success({
                title: '提示',
                content: '更新成功',
            });
            // const pagination = this.state.pagination;
            // // Read total count from server
            // // pagination.total = data.totalCount;
            // pagination.total = 200;
            // this.setState({
            //     loading: false,
            //     data: data,
            //     pagination,
            // });
        })
        .fail((err) => {
            Modal.error({
                title: '错误',
                content: '更新失败',
            });
        });
};

/**
 * 添加新行
 */
addNewItem(){
    console.log("add new", this.refs.editFormInModal);
    this.resetFormToEmpty();
    this.setState({ editVisible: true, selectEditRow: {}, isAdd: true });  //TODO 是不是可以通过selectEditRow is null来控制是新增还是编辑
};

/**
 * 清空Form.
 * 与resetFields不同，resetFields是重置为initialValue
 * 因Moal中的内容不再重新渲染，所以需要重新setFields
 */
resetFormToEmpty(){
    if (this.refs.editFormInModal) {
        var rowData = {};
        for (var i = 0; i < this.props.config.columns.length; i++) {
            var dataIndex = this.props.config.columns[i].dataIndex;
            rowData[dataIndex] = null;
        }
        this.refs.editFormInModal.setFieldsValue(rowData);
    }
}

/**
 * 编辑一条信息
 */
editItem(){
    console.log("edit");
    if (this.state.selectedRowKeys.length == 0) {
        console.log("没有选择编辑的行！");
        Modal.warning({
            title: '提示',
            content: '没有选择编辑的行！',
        });
        return;
    }
    if (this.state.selectedRowKeys.length > 1) {
        console.log("不能同时编辑多个！");
        Modal.warning({
            title: '提示',
            content: '不能同时编辑多个！',
        });

        return;
    }

    var selectEditRowKey = this.state.selectedRowKeys[0];
    var selectEditRow = _.find(this.state.dataSource, { NO: selectEditRowKey });

    //DatePicker的时间必须转换为moment格式
    for (var i = 0; i < this.props.config.columns.length; i++) {
        var column = this.props.config.columns[i];
        if (column.controlType == "datepicker") {
            selectEditRow[column.dataIndex] = moment(selectEditRow[column.dataIndex]);
        }

    }

    //  第一次setFieldsValue的时候，Modal还没渲染，所以要在setState中的回调函数里调用
    this.setState({ editVisible: true, isAdd: false }, () => {
        //console.log("after setState, if the modal show?");
        this.refs.editFormInModal.setFieldsValue(selectEditRow);

    });


};


// confirmDelete(){
//     this.deleteItem();
// };
/**
 * 删除
 */
deleteItem(){
    if (this.state.selectedRowKeys.length == 0) {
        console.log("没有选择删除的行！");
        Modal.warning({
            title: '提示',
            content: '没有选择删除的行！',
            cancelText: "Cancel",
            okText: "OK"
        });
        return;
    }
    console.log("delete", this.state.selectedRowKeys);
    //TODO AJAX发送到后台API
    reqwest({
        url: this.props.config.deleteUrl || this.props.config.queryUrl,
        method: 'delete',
        crossOrigin: true,
        data: { deleteKeys: this.state.selectedRowKeys },
        // type: 'json',
    })
        .then(() => {
            console.log("删除成功");
            Modal.success({
                title: '提示',
                content: '删除成功',
            });
            // const pagination = this.state.pagination;
            // // Read total count from server
            // // pagination.total = data.totalCount;
            // pagination.total = 200;
            // this.setState({
            //     loading: false,
            //     data: data,
            //     pagination,
            // });
        })
        .fail((err) => {
            debugger;
            Modal.error({
                title: '错误',
                content: '删除失败',
            });
        });;
};

/**
 * 编辑完成
 */
editFinish(){

    var editRow = this.refs.editFormInModal.getFieldsValue();

    console.log("finish edit", editRow);
    this.setState({ editVisible: false });

    //TODO AJAX发送到后台API
    if (this.state.isAdd) {
        this.addRow(editRow);
    } else {
        this.updateRow(editRow);
    }

    //  this.resetFormToEmpty();
};
/**
 * 取消编辑
 */
editCancel(){
    // this.resetFormToEmpty();
    this.setState({ editVisible: false });
}

render() {

    // var CoreDataTable_SearchBarForm = Form.create()(CoreDataTable_SearchBar);
    return (
        <div className="core-table">
            <Row>
                <Card span="20">
                    <Card>
                        <CoreDataTable_SearchBar columns={this.props.config.columns} filterTable={this.filterTable}></CoreDataTable_SearchBar>
                    </Card>
                    {
                        <CoreDataTable_ToolBar {...this.toolBarFunc}></CoreDataTable_ToolBar>
                    }
                    <CoreDataTable_MainTable
                        filterTable={this.filterTable}
                        columns={this.props.config.columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        selectedRowKeys={this.state.selectedRowKeys}
                        onSelectChange={this.onSelectChange}
                        handleTableChange={this.handleTableChange}
                        >
                    </CoreDataTable_MainTable>
                </Card>
            </Row>


            <Modal title="新增/编辑" visible={this.state.editVisible}
                onOk={this.editFinish.bind(this)} onCancel={this.editCancel.bind(this)}
                >
                <EditForm ref="editFormInModal" fields={this.props.config.columns} initRowData={this.state.selectEditRow} isAdd={this.state.isAdd}></EditForm>
            </Modal>

        </div>
    );
}
}

CoreDataTable.propTypes = {

};

export default CoreDataTable;