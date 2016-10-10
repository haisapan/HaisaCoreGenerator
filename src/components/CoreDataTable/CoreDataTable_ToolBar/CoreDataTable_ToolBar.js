import React, {Component, PropTypes} from 'react';
import { Button } from 'antd';

class componentName extends Component {
    constructor(props){
        super(props);

        // this.addNewItem=this.addNewItem.bind(this);
    };
    // addNewItem(){
    //     this.props.addNewItem();
    // };

    render() {
        return (
            <div className="toolbar" data-desc="toolBar">

                <span className="button-group">
                    <Button type="primary" onClick={this.props.addNewItem}>新增</Button>
                    <Button type="primary" style={{backgroundColor: 'red'}} onClick={this.props.editItem}>修改</Button>
                    <Button type="ghost" onClick={this.props.deleteItem}>删除</Button>
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