/** @jsx React.DOM */

var React = require('react');

var SaveableTextField = React.createClass({
	propTypes: {
		onSave: React.PropTypes.func.isRequired
		, onCancel: React.PropTypes.func
		, value: React.PropTypes.string
		, placeholder: React.PropTypes.string
	}

	, getDefaultProps: function() {
		return {
			placeholder: ''
		};
	}

	, getInitialState: function() {
		return {
			value: this.props.value || ''
		};
	}

	, _save: function() {
		this.props.onSave(this.state.value);
		this.setState({ value: '' });
	}

	, _cancel: function() {
		this.props.onCancel();
		this.setState({ value: '' });
	}

	, _onChange: function(event) {
		this.setState({ value: event.target.value });
	}

	, _onKeyDown: function(event) {
		if(event.keyCode === 13) {
			this._save();
		} else if(event.keyCode === 27) {
			this._cancel();
		}
	}

	, render: function() {
		return (
			/* jshint ignore:start */
			<input
				className="form-control"
				onChange={ this._onChange }
				onKeyDown={ this._onKeyDown }
				onBlur={ this._save }
				value={ this.state.value }
				placeholder={ this.props.placeholder }
				autoFocus={ true }
			/>
			/* jshint ignore:end */
		);
	}
});

module.exports = SaveableTextField;
