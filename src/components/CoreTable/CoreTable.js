import React from 'react';
import ReactDOM from 'react-dom';
import CoreTableSearchBar from './CoreTable.SearchBar/CoreTable.SearchBar';
import CoreTableToolBar from './CoreTable.ToolBar/CoreTable.ToolBar';
import CoreTableMainTable from './CoreTable.MainTable/CoreTable.MainTable';

var CoreTable = (props) => {
    return (
        <div>
            <CoreTableSearchBar></CoreTableSearchBar>
            <hr/>
            <div>
                <CoreTableToolBar></CoreTableToolBar>
                <CoreTableMainTable></CoreTableMainTable>
            </div>
        </div>
    )
};



export default CoreTable;
