import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classNames'
// import $ from 'jquery';

class CoreTableMainTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            currentPageSize: 10,
            dataCount: 40
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

        var pages = (this.state.dataCount / this.state.currentPageSize) || 1;  //总计页数
        console.log(pages);

        var paginationItems = [];
        {
            for (let i = 1; i <= pages; i++) {
                paginationItems.push(
                    <a key={i} className={classNames("item", { "active": this.state.currentPage == i }) }  onClick={this.changeCurrentPage.bind(this, i) }>
                        {i}</a>);
            }

        }




        return (
            <div>
                <table className="ui celled table selectable ">
                    <thead>

                        <tr>
                            {this.props.selectable&&this.props.singleSelect ?
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
                        <tr>

                            {this.props.selectable&&this.props.singleSelect ?
                                <td style={{width: 16}}>
                                    <input type="checkbox"/>
                                </td>
                                : 
                                null
                            }
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
                          {this.props.selectable&&this.props.singleSelect ?
                                <td style={{width: 16}}>
                                    <input type="checkbox"/>
                                </td>
                                : 
                                null
                            }
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                        <tr className="positive">
                          {this.props.selectable&&this.props.singleSelect ?
                                <td style={{width: 16}}>
                                    <input type="checkbox"/>
                                </td>
                                : 
                                null
                            }
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
                                    {
                                        // console.log("test")
                                        paginationItems
                                    }


                                    {
                                        // <a className="item active">1</a>
                                        // <a className={classNames("item", { "active": this.state.currentPage==2})}  onClick={this.changeCurrentPage.bind(this,2)}>2</a>
                                        // <a className="item">...</a>
                                        // <a className="item">
                                        //     <div className="ui input" style={{ width: 48, height:25 }}>
                                        //         <input type="text"/>
                                        //     </div>

                                        // </a>
                                        // <a className="item">3</a>
                                        // <a className="item">4</a>
                                    }
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