/** @jsx React.DOM */

var React = require('react')
    , Button = require('./controls/button')
	, ItemActions = require('../actions/ItemActions');

var ListItem = React.createClass({
    getInitialState: function() {
        return {
            isDeleting: false
        };
    }

    , onDelete: function() {
		/*
        this.setState({ isDeleting: true });

        this.props.onDelete(this.props.item.name)
            .finally(function() {
                this.setStae({ isDeleting: false });
            });
            */
		ItemActions.destroy(this.props.item.name);
    }

    , render: function() {
		/* jshint ignore:start */
        return <li>{this.props.item.data} <Button label="Delete" onClick={ this.onDelete } enabled={ !this.state.isDeleting } /></li>;
		/* jshint ignore:end */
    }
});

module.exports = ListItem;