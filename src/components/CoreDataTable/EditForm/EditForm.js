import React, { Component, PropTypes } from 'react';
import { Form, Input, Radio, Checkbox, Button, Tooltip, Icon } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import ControlGenerator from '../Controls/ControlGenerator';

class EditForm extends Component {
    constructor(props){
        super(props);
    }

    render() {
        var formItems = this.props.fields.map((field) => {
            if(!field.canEdit){
                return null;
            }
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