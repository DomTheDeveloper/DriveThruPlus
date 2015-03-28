var ItemView = Backbone.View.extend({
    tagName:  "div",
    className: "col-33",
    template: _.template($('#item_template').html()),

    events: {
        "click": "addToCart"
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