var CartView = Backbone.View.extend({
    el: $('.cart'),

    events: {
        "click #clear": "clearCart"
    },

    initialize: function() {
        this.$list = $("#user-cart");
        this.$total = $("#cart-total");

        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);

        this.addAll();
    },

    addOne: function(model) {
        var view = new CartItemView({model: model});
        this.$list.append(view.render().el);

        var total = 0;
        this.collection.each(function (item) {
            total += item.get("price");
        });
        this.$total.html(total.toPrecision(3));
    },

    addAll: function () {
        this.$list.empty();
        this.collection.each(this.addOne, this);

        var total = 0;
        this.collection.each(function (item) {
            total += item.get("price");
        });
        this.$total.html(total.toPrecision(3));
    },

    clearCart: function () {
        this.$list.empty();
        this.collection.reset();
    }
});