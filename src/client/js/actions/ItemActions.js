var AppDispatcher = require('../dispatcher/AppDispatcher')
	, ItemConstants = require('../constants/ItemConstants')

	, ItemActions = {
		create: function(item) {
			AppDispatcher.handleViewAction({
				actionType: ItemConstants.ITEM_CREATE
				, item: item
			});
		}

		, update: function(item) {
			AppDispatcher.handleViewAction({
				actionType: ItemConstants.ITEM_UPDATE
				, item: item
			});
		}

		, destroy: function(itemName) {
			AppDispatcher.handleViewAction({
				actionType: ItemConstants.ITEM_DESTROY
				, itemName: itemName
			});
		}
	};

module.exports = ItemActions;