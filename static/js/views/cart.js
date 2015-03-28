var CartView = Backbone.View.extend({
    el: $('.cart'),

    initialize: function() {
        this.$list = $("#user-cart");

        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);
    },

    addOne: function(model) {
        var view = new CartItemView({model: model});
        this.$list.append(view.render().el);
    },

    addAll: function () {
        this.$list.empty();
        this.collection.each(this.addOne, this);
    },
});