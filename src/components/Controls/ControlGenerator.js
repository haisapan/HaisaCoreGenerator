import React, { Component, PropTypes } from 'react';
import { Form, Button, Input, InputNumber, Radio, Checkbox, Select } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option=Select.Option;

class ControlGenerator extends Component {
    constructor(props) {
        super(props);
        this.initControl = this.initControl.bind(this);
    }

    /**
     * 根据传入的config，生成control
     */
    initControl(field) {
        console.log(field);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        if (field.controlType == "number") {
            return <FormItem
                    {...formItemLayout}
                    label={field.title}
                    >
                    {getFieldDecorator(field.dataIndex, { initialValue: field.defaultValue })(
                        <InputNumber  />
                    )}
                </FormItem>;
        }
        if (field.controlType == "text") {
            return <FormItem
                    {...formItemLayout}
                    label={field.title}
                    >
                    {getFieldDecorator(field.dataIndex, { initialValue: field.defaultValue })(
                        <Input type="text" />
                    )}
                </FormItem>;
        }

        if (field.controlType == "select") {
            var options=[];
            if (field.controlBasicInfo.items) {  //固定的Items
                options = field.controlBasicInfo.items.map((option) => {
                    return <Option value={option.value}>{option.name}</Option>
                })
            }
            if(field.controlBasicInfo.dataUrl){
                //TODO  加上异步的Option获取的方式
            }
console.log("select", options);
            var control = <FormItem
                    {...formItemLayout}
                    label={field.title}
                    >
                    {getFieldDecorator(field.dataIndex, { initialValue: field.defaultValue })(
                           <Select>
                                {options}
                            </Select>
                    )}
                </FormItem>;

            return control;
        }
        if (field.controlType == "radio") {
            var options=[];
             if (field.controlBasicInfo.items) {  //固定的Items
                options = field.controlBasicInfo.items.map((option) => {
                   return  <Radio value={option.value}>{option.name}</Radio>
                })
            }
            if(field.controlBasicInfo.dataUrl){
                //TODO  加上异步的Option获取的方式
            }
            return <FormItem
                    {...formItemLayout}
                    label={field.title}
                    >
                    {getFieldDecorator(field.dataIndex, { initialValue: field.defaultValue })(
                        <RadioGroup>
                            {options}
                        </RadioGroup>
                    )}
                </FormItem>;
            // return <Radio />;
        }

        if (field.controlType == "checkbox") {
                return <FormItem
                    {...formItemLayout}
                    label={<span>{field.title}</span>}
                    >
                    {getFieldDecorator(field.dataIndex, { initialValue: false, valuePropName: 'checked' })(
                        <Checkbox></Checkbox>
                    )}
                </FormItem>;
            
        }

        return <span></span>
    }

    render() {
        var control = this.initControl(this.props.fieldInfo);
        return control;
    }
}

ControlGenerator.propTypes = {
    fieldInfo:React.PropTypes.object.isRequired
};

export default ControlGenerator;