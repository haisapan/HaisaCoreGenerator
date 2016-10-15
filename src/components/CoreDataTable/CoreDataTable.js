// import {DataTable } from 'antd/lib/';
// import 'antd/dist/antd.css'; 
import React, { Component, PropTypes } from 'react';
import { Form, Table, Icon, Card, Row, Modal, Select, Radio } from 'antd';
import _ from 'lodash';
import reqwest from 'reqwest';

import CoreDataTable_SearchBar from './CoreDataTable_SearchBar/CoreDataTable_SearchBar';
import CoreDataTable_ToolBar from './CoreDataTable_ToolBar/CoreDataTable_ToolBar';
import CoreDataTable_MainTable from './CoreDataTable_MainTable/CoreDataTable_MainTable';
import EditForm from './EditForm/index';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

/**CoreDataTable组件，根据config自动生成页面
 * 使用：<CoreDataTable config={tableConfig.coreTable}></CoreDataTable>
 * config数据示例见： db.json
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

        /**设置state */
        this.state = {
            pagination: {},  //分页信息
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
        .then(data => {
    console.log("表数据", data);
    const pagination = this.state.pagination;
    // Read total count from server
    // pagination.total = data.totalCount;
    pagination.total = 200;
    this.setState({
        loading: false,
        dataSource: data,
        pagination,
    });
});
  };

addRow(rowData = {}) {
    console.log('创建：', rowData);

    reqwest({
        url: this.props.config.queryUrl,
        method: 'post',
        crossOrigin: true,
        data: rowData,
        type: 'json',
    })
        .then(result => {
            console.log("创建成功", result);

            this.setState({
                loading: false,
                dataSource: this.state.dataSource.push(rowData),
                pagination,
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
        .catch((err)=>{
             Modal.error({
                title: '错误',
                content: '添加失败',
            });
        });
};

updateRow(rowData = {}) {
    console.log('创建：', rowData);

    reqwest({
        url: this.props.config.queryUrl,
        method: 'put',
        crossOrigin: true,
        data: rowData,
        type: 'json',
    })
        .then(data => {
            console.log("更新成功", data);

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
            .catch((err)=>{
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

    //  第一次setFieldsValue的时候，Modal还没渲染，所以要在setState中的回调函数里调用
    this.setState({ editVisible: true }, () => {
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
        url: this.props.config.queryUrl,
        method: 'delete',
        crossOrigin: true,
        data: { deleteKeys: this.state.selectedRowKeys },
        type: 'json',
    })
        .then(data => {
            console.log("删除成功", data);

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
          .catch((err)=>{
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
                        selectedRowKeys={this.state.selectedRowKeys}
                        onSelectChange={this.onSelectChange}
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