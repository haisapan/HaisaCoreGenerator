import React from 'react';
import ReactDOM from 'react-dom';

class CoreTableMainTable extends React.Component{
    render(){
        return (
            <div>
            <table className="ui celled table">
                <thead>
                    <tr>
                    {
                        this.props.columns.map((column)=>{
                            return <th key={column.field}>{column.displayName}</th>
                        })

                    //        <th>Header</th>
                    // <th>Header</th>
                    // <th>Header</th>
                    }
                 
                </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        <div className="ui ribbon label">First</div>
                    </td>
                    <td>
                    Cell
                    <div className="ui input">
                    <input type="text"/>
                    </div>
                    
                    </td>
                    <td>Cell</td>
                    </tr>
                    <tr>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                    </tr>
                    <tr>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <th colSpan="3">
                        <div className="ui right floated pagination menu">
                            <a className="icon item">
                            <i className="left chevron icon"></i>
                            </a>
                            <a className="item">1</a>
                            <a className="item">2</a>
                            <a className="item">3</a>
                            <a className="item">4</a>
                            <a className="icon item">
                            <i className="right chevron icon"></i>
                            </a>
                        </div>
                    </th>
                </tr>
                </tfoot>
            </table>
        </div>
        );
    }
};

CoreTableMainTable.PropTypes={
    columns: React.PropTypes.array.isRequired
}

export default CoreTableMainTable;