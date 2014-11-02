/** @jsx React.DOM */
var React = require('react')
	, Button = require('./controls/button')
    , TextField = require('./controls/textField');

var CreateNewListItem = React.createClass({
    getInitialState: function() {
        this.items = [];

        return {
            items: []
        };
    }

	, render: function() {
        var self = this;

		return (
			/* jshint ignore:start */
            <li>
                <TextField placeholder="New entry..." />
            </li>
			/* jshint ignore:end */
		);
	}
});

module.exports = CreateNewListItem;
