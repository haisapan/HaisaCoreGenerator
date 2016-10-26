import React, { Component, PropTypes } from 'react';
import { Form, Input, Row, Col, Button, DatePicker } from 'antd';


import ControlGenerator from '../../Controls/ControlGenerator';

// const FormItem = Form.Item;

class CoreDataTable_SearchBar extends Component {

    constructor(props) {
        super(props);
        /**Bind the method to this */

        this.formSubmit = this.formSubmit.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
    };

    componentDidMount() {
        console.log("search mount")
        // console.log(this.props)
    };
    formSubmit(e) {
        e.preventDefault();
        // console.log('收到表单值：', this.props.form.getFieldsValue());
        // var filterItems = this.props.form.getFieldsValue();
        // this.props.filterTable();
        this.props.filterTable();
    };
    resetSearch(e) {
        e.preventDefault();
        this.props.form.resetFields();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        // console.log(this.props.columns);
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <div style={{ padding: '0px' }}>
                <Form horizontal className="ant-advanced-search-form" onSubmit={this.formSubmit}>
                    <Row type="flex" justify="start">
                        {
                            this.props.columns.map((column) => {
                                if(!column.canQuery){
                                    return null;
                                }
                                return (
                                    <Col key={"searchbar-control-" + column.dataIndex} span={6} md={4} xs={12} style={{height:"100% !important"}}>
                                        <ControlGenerator  form={this.props.form} fieldInfo={column} {...formItemLayout}></ControlGenerator>
                                    </Col>
                                );
                            })
                        }
                        <Col span={12} style={{ textAlign: 'left' }}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }} >搜索</Button>
                            <Button onClick={this.resetSearch}>清除条件</Button>
                        </Col>
                    </Row>
                 
                </Form>
            </div>
        );
    }
}

CoreDataTable_SearchBar.propTypes = {
    columns: React.PropTypes.array.isRequired
};

  var CoreDataTable_SearchBarForm = Form.create()(CoreDataTable_SearchBar);
export default CoreDataTable_SearchBarForm;