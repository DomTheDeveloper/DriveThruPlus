var CategoryView = Backbone.View.extend({
    tagName:  "div",
    className: "col-33",
    template: _.template($('#category_template').html()),

    events: {
        "click": "link"
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

    link: function() {
        var data = this.model.get("items");
        var json_list = [];
        _.each(data, function(value, key) {
            json_list.push(value);
        });
        var collection = new ItemCollection(json_list);
        window.setTimeout(function () {
            var view = new ItemView({collection: collection});
        }, 400);
    }
});