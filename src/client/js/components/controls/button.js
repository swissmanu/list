/** @jsx React.DOM */

var React = require('react');

var Button = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired

        , enabled: React.PropTypes.bool
        , icon: React.PropTypes.string
        , primary: React.PropTypes.bool
    }

    , getDefaultProps: function() {
        return {
            enabled: true
            , icon: undefined
            , primary: false
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
			<a onClick={ this.onClick } disabled={ !this.props.enabled } className={ 'btn' + (this.props.primary ? ' btn-primary' : '') } href="#">
				{ this.props.icon ? <i className={ iconClassName } /> : '' }
				{ this.props.label ? this.props.label : '' }
			</a>
			/* jshint ignore:end */
		);
	}
});

module.exports = Button;
