import React, {Component, PropTypes} from 'react';

class CoreTableSearchBar extends Component {


    render() {
        console.log(this.props);
        return (
            <div className="ui form">
                <div  className="inline fields">
                {
                    this.props.fields.map((field)=>{
                        return  (<div key={field.field} className="five wide1 small1 field    input">
                        <label>{field.displayName}</label>
                         <input type="text" placeholder={field.displayName} className="mini1" />
                    </div>);
                    })
                }

                   
                </div>

            </div>
        );
    }
}

CoreTableSearchBar.propTypes = {
    fields: React.PropTypes.array.isRequired
};

export default CoreTableSearchBar;