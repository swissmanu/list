var AppDispatcher = require('../dispatcher/AppDispatcher')
	, EventEmitter = require('events').EventEmitter
	, ItemConstants = require('../constants/ItemConstants')
	, merge = require('react/lib/merge')

	, Firebase = require('../../../../node_modules/firebase/lib/firebase-web.js')
	, config = require('../config.js')
	, firebaseItemsUrl = config.firebaseUrl + '/items'
	, firebaseRef = new Firebase(firebaseItemsUrl)
	, items = []

	, CHANGE_EVENT = 'change';

function create(item) {
	firebaseRef.push(item);
}

function destroy(itemName) {
	new Firebase(firebaseItemsUrl + '/' + itemName).remove();
}

var ItemStore = merge(EventEmitter.prototype, {
	getAll: function getAll() {
		return items;
	}

	, emitChange: function emitChange() {
		this.emit(CHANGE_EVENT);
	}

	, addChangeListener: function addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	, removeChangeListener: function removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register(function(payload) {
	var action = payload.action;

	console.log(payload);

	switch(action.actionType) {
		case ItemConstants.ITEM_CREATE:
			create(action.item);
			ItemStore.emitChange();
			break;
		case ItemConstants.ITEM_DESTROY:
			destroy(action.itemName);
			ItemStore.emitChange();
			break;
		// add more cases for other actionTypes, like TODO_UPDATE, etc.
	}

	return true; // No errors. Needed by promise in Dispatcher.
});


firebaseRef.on('child_added', function(childSnapshot) {
	// Only keep track of 25 items at a time
	if (items.length === 25) {
		items.splice(0, 1);
	}
	items.push({
		name: childSnapshot.ref().name()
		, data: childSnapshot.val()
	});

	this.emitChange();
}.bind(ItemStore));

firebaseRef.on('child_removed', function(childSnapshot) {
	var name = childSnapshot.ref().name();

	items.some(function (item, index) {
		if (item.name === name) {
			items.splice(index, 1);
			return true;
		} else {
			return false;
		}
	});

	this.emitChange();
}.bind(ItemStore));

module.exports = ItemStore;