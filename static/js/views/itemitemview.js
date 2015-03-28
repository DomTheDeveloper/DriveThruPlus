var ItemItemView = Backbone.View.extend({
    tagName:  "div",
    className: "col-33",
    template: _.template($('#item_template').html()),

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

    addToCart: function () {
        cart_list.add(this.model);
    }
});