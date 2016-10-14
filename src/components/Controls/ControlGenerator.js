import React, { Component, PropTypes } from 'react';
import { Button, Input, InputNumber, Radio, Checkbox, Select } from 'antd';


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
                        <InputNumber type="text" />
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

        if (config.controlType == "select") {
            if (config.controlBasicInfo.items) {  //固定的Items
                var options = config.controlBasicInfo.item.map((option) => {
                    <Option value={option.value}>{option.name}</Option>
                })
            }
            if(config.controlBasicInfo.dataUrl){
                //TODO  加上异步的Option获取的方式
            }

            var control = <Select>
                {options}

            </Select>;
            return control;
        }
        if (config.controlType == "radio") {
            return <Radio />;
        }

        if (config.controlType == "checkbox") {

            return <Checkbox />;
        }

        return <span></span>
    }

    render() {
        var control = this.initControl(this.props.controlConfig);
        return control;
    }
}

ControlGenerator.propTypes = {
    controlConfig:React.PropTypes.object.isRequired
};

export default ControlGenerator;