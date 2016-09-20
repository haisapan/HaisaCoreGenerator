'use strict';
window.ESAPP = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        // data: React.PropTypes.Array.isRequired
    },
      contextTypes: {
        disabled: React.PropTypes.string
    },
 
    render: function () {
        console.log(this.props.data);

        var ul;
        if (this.props.data) {
            ul = <ul>
                {
                    this.props.data.map((item) => {
                        return <li key={item.id}>{item.id + "-" + item.name}</li>
                    })
                }</ul>;
        }

        return (
            <div>ESAPP {this.props.name}
                {ul}

                {this.context.disabled}
            </div>
        );
    }

});

