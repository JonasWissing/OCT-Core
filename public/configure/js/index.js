$(document).ready(function() {
	var url = "api/";
	var form = new Form();
	var login = false;

	//Callback fired when User is logged in or signed up
	var signup_login_callback = function (data) {
		username = data.username;
		login = true;
		//Enable left Navbar
		$(".navbar-left li").removeClass("disabled");
		//Remove right Navbar
		$(".navbar-right li").remove();

		//Add Label to the right
		$label = $('<li><a class="navbar-brand" href="#"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> '+username+'</a></li>');
		$(".navbar-right").append($label)
		form.addDatabase();
	}

	//Listen on Left Tab Changes
	$(".navbar-left a").on("click", function(){
		if(login) {
			$(".nav").find(".active").removeClass("active");
		   	$(this).parent().addClass("active");
		   	switch($(this).html()) {
		   		case('Add'):
		   			form.addDatabase();
		   			break;
		   		case('Modify'):
		   			form.modifyDatabase();
		   			break;
		   		default:
		   			break;
		   	}
		}
	});

	//Listen on Right Tab Changes
	$(".navbar-right a").on("click", function(){
		if(!login) {
			$(".btn-group").hide();
		   	$(".nav").find(".active").removeClass("active");
		   	$(this).parent().addClass("active");
		   	switch($(this).html()) {
		   		case('Login'):
		   			form.login(signup_login_callback);
		   			break;
		   		case('Sign Up'):
		   			form.signup(signup_login_callback);
		   			break;
		   		default:
		   			break;
		   	}
		}
	});

	function init () {
		form.login(signup_login_callback);
	}

	init();

});