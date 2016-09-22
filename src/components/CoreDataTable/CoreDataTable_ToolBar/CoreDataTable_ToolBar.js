import React, {Component, PropTypes} from 'react';
import { Button } from 'antd';

class componentName extends Component {

    render() {
        return (
            <div className="toolbar" data-desc="toolBar">

                <span className="button-group">
                    <Button type="primary">新增</Button>
                    <Button type="primary" style={{backgroundColor: 'red'}}>修改</Button>
                    <Button type="ghost">删除</Button>
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