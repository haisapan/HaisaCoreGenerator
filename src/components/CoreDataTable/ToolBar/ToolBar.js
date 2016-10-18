import React, { Component, PropTypes } from 'react';
import { Button, Popconfirm } from 'antd';

class componentName extends Component {
    constructor(props) {
        super(props);

    };
    // addNewItem(){
    //     this.props.addNewItem();
    // };
    componentDidMount() {
        console.log("toolbar mount")
        // console.log(this.props)
    };

    render() {
        return (
            <div className="toolbar" data-desc="toolBar">

                <span className="button-group">
                    <Button type="primary" onClick={this.props.addNewItem}>新增</Button>
                    <Button type="primary" style={{ backgroundColor: 'red' }} onClick={this.props.editItem}>修改</Button>
                    <Popconfirm title="确定要删除记录?" onConfirm={this.props.deleteItem} okText="Yes" cancelText="No">
                        <Button type="ghost" >删除</Button>
                    </Popconfirm>
                </span>
                {
                    // <div className="ui vertical divider"></div>
                }

                <span className="button-group">
                    <Button type="primary">发布</Button>
                    <Button type="primary">作废</Button>
                </span>

                <span className="button-group">
                    <Button type="primary">其他Buttons...</Button>
                </span>


            </div>
        );
    };

}

componentName.propTypes = {

};

export default componentName;