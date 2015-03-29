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

function showText() { 
    document.getElementById("checkout").style.display="inline";
    document.getElementById("checkout-btn").style.display="none";
}

function showCheckout() {
    document.getElementById("checkout-btn").style.display="block";
    document.getElementById("checkout").style.display="none";
}


$(function() {
    auth_object = store.get('auth');
    
    if (!auth_object) {
        ref.authAnonymously(function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);

                auth_object = authData;
                store.set('auth', authData);

                item_list = new CategoryCollection();
                cart_list = new CartCollection();

                cart = new CartView({collection: cart_list});
                app = new AppView({collection: item_list});
            }
        });
    } else {
        item_list = new CategoryCollection();
        cart_list = new CartCollection();

        cart = new CartView({collection: cart_list});
        app = new AppView({collection: item_list});
    }

    $("#start-togetherjs").click(TogetherJS);

    $("#other_carts").click(function () {
        window.setTimeout(function() {
            var carts_ref = ref.child('carts');
            var container = $("#cart-list");

            carts_ref.on("value", function(snapshot) {
                var data = snapshot.val();
                container.empty();

                for (var cart_obj in data) {
                    if (cart_obj !== auth_object.uid) {
                        var template_array = [];
                        for (var item in data[cart_obj]) {
                            template_array.push(data[cart_obj][item]);
                        }

                        var template_data = {data: template_array};
                        var template = _.template($("#other_cart_template").html());
                        container.append(template(template_data));
                    }
                }
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }, 400);
    });

    //say thankyou
    $('#complete').on('click',function(e){
      e.preventDefault();
      $.get('http://35.14.107.170:3000/thankyou');
    });

    braintree.setup(
        // Replace this with a client token from your server
        "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIxZWVmZTRhN2ZlMmYxZTRmODA0ODM0YjVjMTlkMmMwNTQ0NWVmNjE3ODEwMGE5NTEzYWI2MGMxNDgzMjc4YTg1fGNyZWF0ZWRfYXQ9MjAxNS0wMy0yOFQxOToxNzoyMS42ODAxOTg1ODErMDAwMFx1MDAyNm1lcmNoYW50X2lkPWRjcHNweTJicndkanIzcW5cdTAwMjZwdWJsaWNfa2V5PTl3d3J6cWszdnIzdDRuYzgiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2RjcHNweTJicndkanIzcW4vY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQiLCJtZXJjaGFudEFjY291bnRJZCI6InN0Y2gybmZkZndzenl0dzUiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjp0cnVlLCJjb2luYmFzZSI6eyJjbGllbnRJZCI6IjExZDI3MjI5YmE1OGI1NmQ3ZTNjMDFhMDUyN2Y0ZDViNDQ2ZDRmNjg0ODE3Y2I2MjNkMjU1YjU3M2FkZGM1OWIiLCJtZXJjaGFudEFjY291bnQiOiJjb2luYmFzZS1kZXZlbG9wbWVudC1tZXJjaGFudEBnZXRicmFpbnRyZWUuY29tIiwic2NvcGVzIjoiYXV0aG9yaXphdGlvbnM6YnJhaW50cmVlIHVzZXIiLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tL2NvaW5iYXNlL29hdXRoL3JlZGlyZWN0LWxhbmRpbmcuaHRtbCJ9LCJtZXJjaGFudElkIjoiZGNwc3B5MmJyd2RqcjNxbiIsInZlbm1vIjoib2ZmbGluZSIsImFwcGxlUGF5Ijp7InN0YXR1cyI6Im1vY2siLCJjb3VudHJ5Q29kZSI6IlVTIiwiY3VycmVuY3lDb2RlIjoiVVNEIiwibWVyY2hhbnRJZGVudGlmaWVyIjoibWVyY2hhbnQuY29tLmJyYWludHJlZXBheW1lbnRzLmRldi1kY29wZWxhbmQiLCJzdXBwb3J0ZWROZXR3b3JrcyI6WyJ2aXNhIiwibWFzdGVyY2FyZCIsImFtZXgiXX19",
        'dropin', {
            container: 'dropin'
        });
});