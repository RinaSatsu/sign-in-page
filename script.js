const dataTheme = document.querySelector('[data-theme]');
const themeToggle_Light = document.querySelector('.theme-toggle.light-theme');
const themeToggle_Dark = document.querySelector('.theme-toggle.dark-theme');
const fieldsList = document.querySelectorAll('input');
const warningDiv = document.querySelectorAll('.form-warning');
const hintDiv = document.querySelector('.form-hint');
const emailField = document.querySelector('#user-email');
const passField = document.querySelector('#user-password');
const passConfirmField = document.querySelector('#user-password-confirm');
const showPassButton = document.querySelectorAll('.password-eye');

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

function ShowWarning(target) {
	let isValid = target.validity.valid;
	let message = target.validationMessage;
	let warnigElem = Array.from(warningDiv).find(e => e.dataset.field === target.id);

	hintDiv.classList.add('invisible');

	if (warnigElem && message && !isValid) {
		warnigElem.classList.remove('invisible');
		warnigElem.innerHTML = message;
	}
	else {
		warnigElem.classList.add('invisible');
	}
}

function ShowPassHint() {
	let warnigElem = Array.from(warningDiv).find(e => e.dataset.field === passField.id);
	warnigElem.classList.add('invisible');
	hintDiv.innerHTML = 'Include one lowercase letter, one uppercase letter and one number';
	hintDiv.classList.remove('invisible');
}

function SetEmailCustomValidity() {
	if (emailField.validity.typeMismatch) {
		emailField.setCustomValidity('Entered value needs to be an email address.');
	}
	else {
		emailField.setCustomValidity('');
	}
}

function SetPassCustomValidity() {
	if (passField.validity.patternMismatch) {
		passField.setCustomValidity('Please match the requested format.');
	}
	else {
		passField.setCustomValidity('');
	}
}

function CheckEqualValidity(confirm_pass, pass) {
	if (confirm_pass.value !== pass.value) {
		confirm_pass.setCustomValidity('Passwords do not match.');
	}
	else {
		confirm_pass.setCustomValidity('');
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

passField.addEventListener('focus', ShowPassHint);

emailField.addEventListener('blur', SetEmailCustomValidity);
passField.addEventListener('blur', SetPassCustomValidity);
passConfirmField.addEventListener('blur', event => CheckEqualValidity(event.target, passField));

fieldsList.forEach(div => div.addEventListener('blur', e => {ShowWarning(e.target);}));

showPassButton.forEach(button => button.addEventListener('click', ShowPassword));

