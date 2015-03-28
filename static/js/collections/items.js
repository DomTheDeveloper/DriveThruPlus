var ItemCollection = Backbone.Firebase.Collection.extend({
    model: Item,
    url: "https://drive-through-plus.firebaseio.com/items"
});