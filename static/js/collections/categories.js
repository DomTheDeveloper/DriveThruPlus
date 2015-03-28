var CategoryCollection = Backbone.Firebase.Collection.extend({
    model: Category,
    url: "https://drive-through-plus.firebaseio.com/categories"
});