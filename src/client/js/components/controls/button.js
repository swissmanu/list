/** @jsx React.DOM */

var React = require('react');

var Button = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired

        , enabled: React.PropTypes.bool
        , icon: React.PropTypes.string
    }

    , getDefaultProps: function() {
        return {
            enabled: true
            , icon: undefined
        };
    }

    , onClick: function(e) {
        e.preventDefault();
        this.props.onClick();
    }

	, render: function() {
		var iconClassName;
		if(this.props.icon) {
			iconClassName = 'fa ' + this.props.icon + ' fa-fw';
		}

		return (
			/* jshint ignore:start */
			<button onClick={ this.onClick } disabled={ !this.props.enabled }>
				{ this.props.icon ? <i className={ iconClassName } /> : '' }
				{ this.props.label ? this.props.label : '' }
			</button>
			/* jshint ignore:end */
		);
	}
});

module.exports = Button;