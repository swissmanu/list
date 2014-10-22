/** @jsx React.DOM */

var React = require('react')
    , Button = require('./controls/button')
    , TextField = require('./controls/textField')
    , q = require('q');

var ListItem = React.createClass({
    getInitialState: function() {
        return {
            text: ''
            , adding: false
        };
    }

    , onAdd: function() {
        var self = this;

        this.setState({ adding: true});
        self.props.onAdd({ text: self.state.text })
            .finally(function() {
                self.setState({
                    text: ''
                    , adding: false
                });
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
            <form>
                <TextField onChange={ this.onChangeText } value={ this.state.text } enabled={ !this.state.adding } />
                <Button onClick={ this.onAdd } label="Add" enabled={ this.isAddButtonEnabled() } />
            </form>
            /* jshint ignore:end */
        );
    }
});

module.exports = ListItem;

