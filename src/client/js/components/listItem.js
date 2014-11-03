/** @jsx React.DOM */

var React = require('react')
    , Button = require('./controls/button')
	, ItemActions = require('../actions/ItemActions')
	, SaveableTextField = require('./controls/saveableTextField')
	, merge = require('react/lib/merge');

var ListItem = React.createClass({
    getInitialState: function() {
        return {
            isDeleting: false
			, isEditing: false
        };
    }

    , _onDestroy: function() {
		ItemActions.destroy(this.props.item.name);
    }

	, _onDoubleClick: function(event) {
		this.setState({ isEditing: true });
	}

	, _onSave: function(text) {
		ItemActions.update(merge(this.props.item, {
			data: {
				text: text
			}
		}));
		this.setState({ isEditing: false });
	}

	, _onCancel: function() {
		this.setState({ isEditing: false });
	}

    , render: function() {
		var view;

		if(this.state.isEditing) {
			/* jshint ignore:start */
			view = <SaveableTextField onSave={ this._onSave } onCancel={ this._onCancel } value={ this.props.item.data.text } />;
			/* jshint ignore:end */
		} else {
			/* jshint ignore:start */
			view = <span onClick={ this._onDoubleClick }>{ this.props.item.data.text }</span>;
			/* jshint ignore:end */
		}

		/* jshint ignore:start */
        return <li>{ view } <Button label="Delete" onClick={ this._onDestroy } enabled={ !this.state.isDeleting } /></li>;
		/* jshint ignore:end */
    }
});

module.exports = ListItem;