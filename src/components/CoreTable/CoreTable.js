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
         <div className="dividing"></div>
            <div>
                <CoreTableToolBar {...props}></CoreTableToolBar>
                <CoreTableMainTable {...props}></CoreTableMainTable>
            </div>
        </div>
    )
};

CoreTable.propTypes={
    config: React.PropTypes.object.isRequired
}



export default CoreTable;
