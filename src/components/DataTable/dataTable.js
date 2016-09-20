import React from 'react';
// import ReactDOM from 'react-dom';

const DataTable = React.createClass({

  propTypes: {
        // columns: React.PropTypes.array.isRequired
        // data: React.PropTypes.Array.isRequired
  },
  getDefaultProps() {
    return {
      columns: [],
    };
  },

  render() {
    console.log(this.props.data);

    return (
            <div>
            <h1>DataTable-section</h1>
                <table>
                    <tbody>
                        <tr>
                            {
                                this.props.columns.map((item) => {
                                  return <td key={item.field}>{item.field}</td>;
                                })
                            }
                        </tr>
                    </tbody>


                </table>
                {
                    this.props.children
                }
            </div>
        );
  },

});

export default DataTable;
