/** @jsx React.DOM */

var React = require('react')
    , Button = require('./controls/button')
    , TextField = require('./controls/textField')
	, ItemActions = require('../actions/ItemActions')
    , q = require('q');

var ListItem = React.createClass({
    getInitialState: function() {
        return {
            text: ''
            , adding: false
        };
    }

    , onAdd: function() {
        /*var self = this;

        this.setState({ adding: true});
        self.props.onAdd({ text: self.state.text })
            .finally(function() {
                self.setState({
                    text: ''
                    , adding: false
                });
            });
            */

		ItemActions.create({
			text: this.state.text
		});
    }

    , onChangeText: function(text) {
        this.setState({
            text: text
        });
    }

    , isAddButtonEnabled: function() {
        return !this.state.adding && this.state.text.trim().length > 0;
    }

    , render: function() {
        return (
            /* jshint ignore:start */
            <form className="form-horizontal">
                <div className="input-group">
                    <TextField onChange={ this.onChangeText } value={ this.state.text } enabled={ !this.state.adding } />
                    <span className="input-group-btn">
                        <Button onClick={ this.onAdd } label="Add" enabled={ this.isAddButtonEnabled() } primary={ true } />
                    </span>
                </div>
            </form>
            /* jshint ignore:end */
        );
    }
});

module.exports = ListItem;

