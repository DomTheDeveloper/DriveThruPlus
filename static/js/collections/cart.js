var CartCollection = Backbone.Firebase.Collection.extend({
    model: Item,
    url: function() {
        return new Firebase("https://drive-through-plus.firebaseio.com/carts/" + auth_object.uid);
    }
});