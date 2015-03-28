var AppView = Backbone.View.extend({
    el: $('.pages'),

    initialize: function() {
        this.$list = $("#category-list");

        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);
    },

    addOne: function(model) {
        var view = new CategoryView({model: model});
        this.$list.append(view.render().el);
    },

    addAll: function () {
        this.$list.empty();
        this.collection.each(this.addOne, this);
    },
});