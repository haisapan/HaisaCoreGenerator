import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classNames';
import _ from 'lodash';
// import $ from 'jquery';

class CoreTableMainTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            currentPageSize: 10,
            // dataCount: 40
        };

        /**
         * Bind the functions to this
         */
        this.changeCurrentPage = this.changeCurrentPage.bind(this);


    };


    // getInitialState() {
    //     return {
    //         isEditable: false,
    //         // columns: [],
    //         dataSource: []
    //     }
    // };
    componentDidMount() {
        //         console.log(this.refs.pageSizeInput);
        //   var pageSizeInputItem=this.refs.pageSizeInput.getDOMNode();
        //   console.log(pageSizeInputItem);
        var pageSizeInputItem = ReactDOM.findDOMNode(this.refs.pageSizeInput);
        console.log(pageSizeInputItem);
        $(pageSizeInputItem).dropdown();
        // console.log($('.ui.dropdown'));
        // $('.ui.dropdown').dropdown();
    };

    changeCurrentPage(page = 1) {
        console.log(this);
        this.setState({ currentPage: page });
    };
    //    changeCurrentPage=(page)=>this.changeCurrentPage(page);

    render() {
        console.log(this.props.data);
        var pages = _.ceil(this.props.data.length / this.state.currentPageSize) || 1;  //总计页数
        console.log(pages);

        /**Pagination Items */
        var paginationItems = [];

        for (let i = 1; i <= pages; i++) {
            paginationItems.push(
                <a key={i} className={classNames("item", { "active": this.state.currentPage == i }) }  onClick={this.changeCurrentPage.bind(this, i) }>
                    {i}</a>
            );
        }

        /**Rows */
        var dataRows = [];

        _.forEach(this.props.data, (row) => {
            var dataColumnsInRow = [];
            for (var i = 0; i < this.props.columns.length; i++) {
                dataColumnsInRow.push(<td key={row[this.props.columns[i].field] + i}>{row[this.props.columns[i].field]}</td>);
            }
            var dataRow = <tr>
                <td key={row} style={{ width: 16 }}>
                    <input type="checkbox"/>
                </td>
                {dataColumnsInRow}
            </tr>;
            dataRows.push(dataRow);
        });




        return (
            <div>
                <table className="ui celled table selectable ">
                    <thead>

                        <tr>
                            {this.props.selectable && this.props.singleSelect ?
                                <th>
                                    <input type="checkbox"/>
                                </th>
                                :
                                null
                            }

                            {
                                this.props.columns.map((column) => {
                                    return <th key={column.field}>{column.displayName}</th>
                                })
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {dataRows}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={this.props.selectable && this.props.singleSelect ? this.props.columns.length + 1 : this.props.columns.length}>
                                <div className="ui right floated pagination menu">
                                    <a className="icon item">
                                        <i className="left chevron icon"></i>
                                    </a>
                                    { paginationItems }


                                    <a className="icon item">
                                        <i className="right chevron icon"></i>
                                    </a>


                                </div>
                                <div className="ui right menu floated">

                                    <select className="ui dropdown" ref="pageSizeInput" id="pageSizeInput" defaultValue="10" style={{ width: 50 }} >
                                        <option className="item" value="10">10条/页</option>
                                        <option value="50">50条/页</option>
                                        <option value="100">100条/页</option>
                                    </select>
                                </div>

                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
};

CoreTableMainTable.PropTypes = {
    columns: React.PropTypes.array.isRequired
}

export default CoreTableMainTable;