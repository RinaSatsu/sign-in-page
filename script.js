const dataTheme = document.querySelector('[data-theme]');
const themeToggle_Light = document.querySelector('.theme-toggle.light-theme');
const themeToggle_Dark = document.querySelector('.theme-toggle.dark-theme');
const showPassButton = document.querySelectorAll('.password-eye');
const passField = document.querySelector('#user-password');
const passConfirmField = document.querySelector('#user-password-confirm');

function GetColorScheme() {
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}
	return 'light';
}

function SetColorTheme(theme) {
	if (theme === 'dark') {
		themeToggle_Light.classList.add('invisible');
		themeToggle_Dark.classList.remove('invisible');
	}
	else {
		themeToggle_Dark.classList.add('invisible');
		themeToggle_Light.classList.remove('invisible');
	}
	dataTheme.setAttribute('data-theme', theme);
}

function ChangeColorTheme() {
	let newTheme = dataTheme.dataset.theme === 'dark' ? 'light' : 'dark';
	SetColorTheme(newTheme);
}


function SetPassCustomValidity(input_pass) {
	if (input_pass.validity.patternMismatch) {
		input_pass.setCustomValidity("Password should include one lowercase, one uppercase and one number.");
	}
	else {
		input_pass.setCustomValidity("");
	}
}

function CheckEqualValidity(confirm_pass, pass) {
	if (confirm_pass.value !== pass.value) {
		confirm_pass.setCustomValidity("Passwords do not match.");
	}
	else {
		confirm_pass.setCustomValidity("");
	}
}

function ShowPassword(event) {
	let childList = event.srcElement.nodeName === 'path' ? 
		event.srcElement.parentNode.parentNode.childNodes : event.srcElement.parentNode.childNodes;
	let type = childList[1].getAttribute('type') === 'password' ? 'text' : 'password';
	childList[1].setAttribute('type', type);
	childList[5].classList.toggle('invisible');
	childList[7].classList.toggle('invisible');
}

SetColorTheme(GetColorScheme());
themeToggle_Light.addEventListener('click', ChangeColorTheme);
themeToggle_Dark.addEventListener('click', ChangeColorTheme);

passField.addEventListener('invalid', event => SetPassCustomValidity(event.target});
passConfirmField.addEventListener('focusout', event => CheckEqualValidity(event.target, passField));

showPassButton.forEach(button => button.addEventListener('click', ShowPassword));

