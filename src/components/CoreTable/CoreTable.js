import React from 'react';
import ReactDOM from 'react-dom';
import CoreTableSearchBar from './CoreTable.SearchBar/CoreTable.SearchBar';
import CoreTableToolBar from './CoreTable.ToolBar/CoreTable.ToolBar';
import CoreTableMainTable from './CoreTable.MainTable/CoreTable.MainTable';

var CoreTable = (props) => {
    console.log(props);
    return (
        <div className="ui segment">
            <CoreTableSearchBar fields={props.config.columns}></CoreTableSearchBar>
       
            <div className="ui segment">
                <CoreTableToolBar {...props}></CoreTableToolBar>
                  <div className="ui divider"></div>
                <CoreTableMainTable columns={props.config.columns} dataSource="url"></CoreTableMainTable>
            </div>
        </div>
    )
};

CoreTable.propTypes={
    config: React.PropTypes.object.isRequired
}



export default CoreTable;
