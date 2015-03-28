var myApp = new Framework7({
    cache: false
});

var leftView = myApp.addView('.view-left', {
    dynamicNavbar:true
});

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

$("#start-togetherjs").click(TogetherJS);

var list = new ItemCollection();

$(function() {
    var list = new ItemCollection();
    var app = new AppView({collection: list});
});