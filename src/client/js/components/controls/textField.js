/** @jsx React.DOM */

var React = require('react');

var TextField = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func.isRequired
        , value: React.PropTypes.string
        , enabled: React.PropTypes.bool
    }

    , getDefaultProps: function() {
        return {
            text: ''
            , enabled: true
        };
    }

    , onChange: function(e) {
        e.preventDefault();
        this.props.onChange(e.target.value);
    }

    , render: function() {
        return (
            /* jshint ignore:start */
            <input type="text" value={ this.props.value } onChange={ this.onChange } disabled={ !this.props.enabled } />
            /* jshint ignore:end */
        );
    }
});

module.exports = TextField;