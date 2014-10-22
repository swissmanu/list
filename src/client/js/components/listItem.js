/** @jsx React.DOM */

var React = require('react')
    , Button = require('./controls/button');

var ListItem = React.createClass({
    getInitialState: function() {
        return {
            isDeleting: false
        };
    }

    , onDelete: function() {
        this.setState({ isDeleting: true });

        this.props.onDelete(this.props.item.name)
            .finally(function() {
                this.setStae({ isDeleting: false });
            });
    }

    , render: function() {
        return <li>{this.props.item.data} <Button label="Delete" onClick={ this.onDelete } enabled={ !this.state.isDeleting } /></li>;
    }
});

module.exports = ListItem;