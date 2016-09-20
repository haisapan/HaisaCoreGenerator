import React, {Component, PropTypes} from 'react';

class CoreTableToolBar extends Component {
    render() {
        return (

            <div className="ui three column very relaxed" data-desc="toolBar">
               
                <span className="ui  primary buttons1">
                    <button className="ui primary button">新增</button>
                    <button className="ui primary button">修改</button>
                    <button className="ui primary button">删除</button>
                </span>
                // <div className="ui vertical divider"></div>
                <span className="ui basic buttons1">
                    <button className="ui primary button">发布</button>
                    <button className="ui primary button">作废</button>
                </span>
               // <div className="ui vertical divider"></div>
                <span>
                    <button className="ui primary button">其他Buttons...</button>
                </span>


            </div>
        );
    }
}

CoreTableToolBar.propTypes = {

};

export default CoreTableToolBar;