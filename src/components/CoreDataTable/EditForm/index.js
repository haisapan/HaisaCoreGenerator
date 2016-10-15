import React, { Component, PropTypes } from 'react';
import { Form, Input, Radio, Checkbox, Button, Tooltip, Icon } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import ControlGenerator from '../../Controls/ControlGenerator';

class EditForm extends Component {
    constructor(props){
        super(props);

        // this.getFormData=this.getFormData.bind(this);
    }

    // getFormData(){
    //     //  e.preventDefault();
    //     debugger;
    // console.log(this.props.form.getFieldsValue());
    // console.log('Received values of form:', this.props.form.getFieldsValue());
    // };

    render() {
        // console.log(this.props.form)
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        var formItems = this.props.fields.map((field) => {
            field.initValue = null;
            if (!this.props.isAdd) { //编辑状态
                field.initValue = this.props.initRowData[field.dataIndex]
            }
            // else{
            //     // debugger;
            //     field.initValue=null;
            // }

            return <ControlGenerator key={"control-" + field.dataIndex} form={this.props.form} fieldInfo={field} ></ControlGenerator>

        });

        return (
            <Form horizontal onSubmit={this.handleSubmit}>               
                {formItems}          
            </Form>
        );
    }
}

EditForm.propTypes = {

};
var EditFormCreate = Form.create()(EditForm);
export default EditFormCreate;