var CartItemView = Backbone.View.extend({
    tagName:  "li",
    className: "swipeout",
    template: _.template($('#cart_template').html()),

    events: {
        "click .action1": "destroy"
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    destroy: function () {
        this.model.destroy();
        this.remove();
    }
});