// import {DataTable } from 'antd/lib/';
// import 'antd/dist/antd.css'; 
import React, { Component, PropTypes } from 'react';
import { Form, Table, Icon, Card, Row, Modal, Select, Radio } from 'antd';

import reqwest from 'reqwest';

import CoreDataTable_SearchBar from './CoreDataTable_SearchBar/CoreDataTable_SearchBar';
import CoreDataTable_ToolBar from './CoreDataTable_ToolBar/CoreDataTable_ToolBar';
import CoreDataTable_MainTable from './CoreDataTable_MainTable/CoreDataTable_MainTable';
import EditForm from './EditForm/index';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


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


        /**设置state */
        this.state = {
            pagination: {},  //分页信息
            editVisible: false, //编辑框是否可见，目前为modal内编辑，后续支持行内编辑
            selectedRowKeys: []
        };

        /**传递给toolbar的函数集合 */
        this.toolBarFunc = {
            addNewItem: this.addNewItem,
            editItem: this.editItem,
            deleteItem: this.deleteItem
        };

        // this.tableFunc={
        //     selectedRowKeys:this.state.selectedRowKeys,
        //     onSelectChange:this.onSelectChange
        // }
    };


    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };


    filterTable(pagination = {}, filters, sorter = {}) {
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
        url: this.props.config.queryUrl,//'http://api.randomuser.me',
        method: 'get',
        crossOrigin: true,
        data: {
            results: 10,
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
        data: data,
        pagination,
    });
});
  };

/**
 * 添加新行
 */
addNewItem(){
    console.log("add new");
    this.setState({ editVisible: true });
};

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

    this.setState({ editVisible: true });
};

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
};

/**
 * 编辑完成
 */
editFinish(){

    console.log("finish edit");
    this.setState({ editVisible: false });
};
/**
 * 取消编辑
 */
editCancel(){
    this.setState({ editVisible: false });
}

render() {


    var CoreDataTable_SearchBarForm = Form.create()(CoreDataTable_SearchBar);

    return (
        <div className="core-table">
            <Row>
                <Card span="20">
                    <Card>
                        <CoreDataTable_SearchBarForm columns={this.props.config.columns} filterTable={this.filterTable}></CoreDataTable_SearchBarForm>
                    </Card>

                    {
                        <CoreDataTable_ToolBar {...this.toolBarFunc}></CoreDataTable_ToolBar>
                    }
                    <CoreDataTable_MainTable
                        filterTable={this.filterTable}
                        columns={this.props.config.columns}
                        dataSource={this.state.data}
                        selectedRowKeys={this.state.selectedRowKeys}
                        onSelectChange={this.onSelectChange}
                        ></CoreDataTable_MainTable>
                </Card>
            </Row>


            <Modal title="编辑" visible={this.state.editVisible}
                onOk={this.editFinish.bind(this)} onCancel={this.editCancel.bind(this)}
                >
                <p>
                 <EditForm fields={this.props.config.columns} initRowData={this.state.selectRow}></EditForm>
                </p>

            </Modal>


        </div>
    );
}
}

CoreDataTable.propTypes = {

};

// var DemoForm = Form.create()(CoreDataTable);

export default CoreDataTable;

// ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);