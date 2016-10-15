import React, { Component, PropTypes } from 'react';
import { Form, Button, Input, InputNumber, Radio, Checkbox, Select, DatePicker, TimePicker } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class ControlGenerator extends Component {
    constructor(props) {
        super(props);
        this.initControl = this.initControl.bind(this);
    }

    /**
     * 根据传入的config，生成control
     */
    initControl(field) {
        // console.log(field);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        //   labelCol={this.props.labelCol}
        //                     wrapperCol={this.props.wrapperCol}
        if (field.controlType == "number") {
            return <FormItem
                {...formItemLayout}

                label={field.title}
                >
                {getFieldDecorator(field.dataIndex, field.initValue?{ initialValue: field.initValue }:{})(
                    <InputNumber />
                )}
            </FormItem>;
        }
        if (field.controlType == "text") {
            return <FormItem
                {...formItemLayout}
                label={field.title}
                >
                {getFieldDecorator(field.dataIndex, field.initValue?{ initialValue: field.initValue }:{})(
                    <Input type="text" />
                )}
            </FormItem>;
        }
        if (field.controlType == "textarea") {
            return <FormItem
                {...formItemLayout}
                label={field.title}
                >
                {getFieldDecorator(field.dataIndex, field.initValue?{ initialValue: field.initValue }:{})(
                    <Input type="textarea" />
                )}
            </FormItem>;
        }

        if (field.controlType == "select") {
            var options = [];
            if (field.controlBasicInfo.items) {  //固定的Items
                options = field.controlBasicInfo.items.map((option) => {
                    return <Option key={"control_option_" + option.value} value={option.value}>{option.name}</Option>
                })
            }
            if (field.controlBasicInfo.dataUrl) {
                //TODO  加上异步的Option获取的方式
            }
            console.log("select", options);
            var control = <FormItem
                {...formItemLayout}
                label={field.title}
                >
                {getFieldDecorator(field.dataIndex, field.initValue?{ initialValue: field.initValue }:{})(
                    <Select>
                        {options}
                    </Select>
                )}
            </FormItem>;

            return control;
        }
        if (field.controlType == "radio") {
            var options = [];
            if (field.controlBasicInfo.items) {  //固定的Items
                options = field.controlBasicInfo.items.map((option) => {
                    return <Radio key={"control_radio_" + option.value} value={option.value}>{option.name}</Radio>
                })
            }
            if (field.controlBasicInfo.dataUrl) {
                //TODO  加上异步的Option获取的方式
            }
            return <FormItem
                {...formItemLayout}
                label={field.title}
                >
                {getFieldDecorator(field.dataIndex, field.initValue?{ initialValue: field.initValue }:{})(
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
                {getFieldDecorator(field.dataIndex, field.initValue?{ initialValue: field.initValue, valuePropName: 'checked' }:{})(
                    <Checkbox></Checkbox>
                )}
            </FormItem>;
        }

        if (field.controlType == "datepicker") {
            return <FormItem
                {...formItemLayout}
                label={<span>{field.title}</span>}
                >
                {getFieldDecorator(field.dataIndex, field.initValue?{ initialValue: field.initValue }:{})(
                   <DatePicker />
                )}
            </FormItem>;
        }
        if (field.controlType == "timepicker") {
            return <FormItem
                {...formItemLayout}
                label={<span>{field.title}</span>}
                >
                {getFieldDecorator(field.dataIndex, field.initValue?{ initialValue: field.initValue }:{})(
                   <TimePicker  />
                )}
            </FormItem>;
        }

        console.error("生成控件失败，没有定义controlType: ", field);
        return <span></span>;
    }

    render() {
        var control = this.initControl(this.props.fieldInfo);
        return control;
    }
}

ControlGenerator.propTypes = {
    fieldInfo: React.PropTypes.object.isRequired
};

export default ControlGenerator;