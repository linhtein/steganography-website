	//Validtion Code For Inputs

var username = document.forms['form']['username'];
var password = document.forms['form']['password'];

var pass_error = document.getElementById('pass_error');
var error_msg=document.getElementById('error_msg');
var error_pw=document.getElementById('error_pw');

username.addEventListener('textInput', email_Verify);
password.addEventListener('textInput', pass_Verify);

function validated(){
	if (username.value.length<6) {
		username.focus();
		return false;
	}
	if (password.value.length<20) {
		password.focus();
		return false;
	}

}

function check_user(){
	if(username.value=='linhtein' || username.value=='thetsu' || username.value=='einandarlwin' || username.value=='ayemoeaung'){
		error_msg.style.display='none';
		// return true;
	}
	else if(username.value==""){
		error_msg.style.display='none';
	}
	else{
		error_msg.style.display='block';
		
	}
}
function check_pw(){
	if(password.value==''){
		error_pw.style.display='none';
		// return false;
	}
	else if(password.value!='linhtein' && password.value!='thetsu1234' && password.value!='nandar524' && password.value!='phoekwar000'){
		error_pw.style.display='block';
	}
	
}

function checkpassword(){
	var user=document.getElementById('username').value;
	var password=document.getElementById('password').value;
	if(user=='linhtein' && password=='linhtein1500'){
		window.open('second_page.html');
		window.location.reload();
		return false;
	}
	else if(user=='thetsu' && password=='thetsu1234'){
		window.open('second_page.html');
		window.location.reload();
		return false;
	}
	else if(user=='einandarlwin' && password=='nandar524'){
		window.open('second_page.html');
		window.location.reload();
		return false;
	}
	else if(user=='ayemoeaung' && password=='phoekwar000'){
		window.open('second_page.html');
		window.location.reload();
		return false;
	}
	else if(user.length==0 && password.length==0){
		alert("Username and Password can't be empty");
	}
	
	
}

