import React, { Component, PropTypes } from 'react';
import { Form, Input, Radio, Checkbox, Button, Tooltip, Icon } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class EditForm extends Component {
    render() {
        console.log(this.props.form)
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (

            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="User name"
                    >
                    <p className="ant-form-text" id="userName" name="userName">Big eye minion</p>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Password"
                    >
                    {getFieldDecorator('pass', { initialValue: '' })(
                        <Input type="password" placeholder="Please input the password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Gender"
                    >
                    {getFieldDecorator('gender', { initialValue: 'female' })(
                        <RadioGroup>
                            <Radio value="male">male</Radio>
                            <Radio value="female">female</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="remarks"
                    help="Please input something"
                    >
                    {getFieldDecorator('remark', { initialValue: '' })(
                        <Input type="textarea" placeholder="Please input something" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<span>Sold myself <Tooltip title="I come for Qiu Xiang"><Icon type="question-circle-o" /></Tooltip></span>}
                    >
                    {getFieldDecorator('agreement', { initialValue: false, valuePropName: 'checked' })(
                        <Checkbox>agree</Checkbox>
                    )}
                </FormItem>
                <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                    <Button type="primary" htmlType="submit">OK</Button>
                </FormItem>
            </Form>


        );
    }
}

EditForm.propTypes = {

};
var EditFormCreate = Form.create()(EditForm);
export default EditFormCreate;