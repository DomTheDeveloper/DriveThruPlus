var ItemView = Backbone.View.extend({
    el: $('.pages'),

    initialize: function() {
        this.$list = $("#item-list");

        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);

        this.addAll();
    },

    addOne: function(model) {
        var view = new ItemItemView({model: model});
        this.$list.append(view.render().el);
    },

    addAll: function () {
        this.$list.empty();
        this.collection.each(this.addOne, this);
    },
});