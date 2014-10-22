var q = require('q')
    , Firebase = require('../../../../node_modules/firebase/lib/firebase-web.js')

    , config = require('../config.js')
    , firebaseItemsUrl = config.firebaseUrl + '/items';

var Items = function() {
    this.firebaseRef = new Firebase(firebaseItemsUrl);
};

Items.prototype.destroy = function destroy() {
    this.firebaseRef.off();
};

Items.prototype.addNewItem = function addNewItem(item) {
    var deferred = q.defer();

    this.firebaseRef.push(item, function(err) {
        if(err === null) {
            deferred.resolve();
        } else {
            deferred.reject(err);
        }
    });

    return deferred.promise;
};

Items.prototype.deleteItemWithName = function deleteItemWithName(itemName) {
    var deferred = q.defer();

    new Firebase(FIREBASE_URL + '/' + itemName).remove(function(err) {
        if(err === null) {
            deferred.resolve();
        } else {
            deferred.reject(err);
        }
    });

    return deferred.promise;
};

module.exports = Items;