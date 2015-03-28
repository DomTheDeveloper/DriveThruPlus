var auth_object, item_list, cart_list, cart, app,
    myApp = new Framework7({
        cache: false
    }),
    leftView = myApp.addView('.view-left', {
        dynamicNavbar:true
    }),
    mainView = myApp.addView('.view-main', {
      // Because we want to use dynamic navbar, we need to enable it for this view:
      dynamicNavbar: true
    }),
    ref = new Firebase("https://drive-through-plus.firebaseio.com/");

ref.authAnonymously(function(error, authData) {
    if (error) {
        console.log("Login Failed!", error);
    } else {
        console.log("Authenticated successfully with payload:", authData);
    }
    auth_object = authData;
}, {
  remember: "sessionOnly"
});

$(function() {
    item_list = new CategoryCollection();
    cart_list = new ItemCollection();
    cart = new CartView({collection: cart_list});
    app = new AppView({collection: item_list});

    $("#start-togetherjs").click(TogetherJS);
});