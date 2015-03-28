var CartView = Backbone.View.extend({
    el: $('.cart'),

    events: {
        "click #clear": "clearCart"
    },

    initialize: function() {
        this.$list = $("#user-cart");
        this.$total = $("#cart-total");

        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'remove', this.addAll);
        this.listenTo(this.collection, 'reset', this.addAll);
        this.listenTo(this.collection, 'add', this.recalculateTotal);
        this.listenTo(this.collection, 'remove', this.recalculateTotal);

        this.addAll();
    },

    addOne: function(model) {
        var view = new CartItemView({model: model});
        this.$list.append(view.render().el);
    },

    addAll: function () {
        this.$list.empty();
        this.collection.each(this.addOne, this);

        this.recalculateTotal();
    },

    clearCart: function () {
        this.$list.empty();
        this.collection.reset();
    },

    recalculateTotal: function () {
        var total = 0;
        this.collection.each(function (item) {
            total += item.get("price");
        });
        this.$total.html(Math.round(total * 100) / 100);
    }
});