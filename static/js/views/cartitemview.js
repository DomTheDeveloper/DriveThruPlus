var CartItemView = Backbone.View.extend({
    tagName:  "li",
    className: "swipeout",
    template: _.template($('#cart_template').html()),

    events: {
        "click": "addToCart"
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
        console.log(this.model.toJSON());
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    addToCart: function() {
        console.log("to cart");
    }
});