'use strict'

const UserService = window.UserService;
const Block = window.Block;
//const Form = window.Form;
const userService = new UserService();



const application = document.getElementById('application');



const sections = [
	['login', 'Войти'],
	['profile', 'Мой профиль'],
	['about', 'Обо мне'],
];
function whoami(callback){
	const xhr = new XMLHttpRequest();
	xhr.open('Get', '/me',true);
	xhr.withCredentials = true;
	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4) return;
		if (+xhr.status !=200){
			return callback(xhr)
		}
		const response = JSON.parse(xhr.responseText);
		callback(null,response);
	}
	xhr.send();
}


/*
 * Выполняет Post-запрос по указанному адресу
 * @param {string} path - адресс запроса
 * @param {*} body - тело запроса (объект)
 * @param {Function} callback - функция-коллбек
 */
function auth(username, email, callback) {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/auth',true);
	xhr.withCredentials = true;
	const user = {username, email};
	const body = JSON.stringify(user);
	xhr.setRequestHeader('Content-Type', 'application/json; charset = utf8');
	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4) return;
		if (+xhr.status !=200){
			return callback(xhr, null)
		}
		const response = JSON.parse(xhr.responseText);
		callback(null,response);
	}
	xhr.send(body);

}
//const application = new Block (document.getElementById('application'));
const nav = document.getElementById('navigation');
const loginForm = document.getElementById('login-form');
const usernameDiv = document.getElementById('username-div');
const emailDiv = document.getElementById('email-div');
const countDiv = document.getElementById('count-div');
const content = document.getElementById('content');
const menu_button = document.getElementById('menu-button');
const menu_button_close = document.getElementById('menu-button-times');


console.log(nav);
//for (let section of sections) {
//	const b = Block.Create('input', [], {type: 'button', 'data-section': section[0], 'value': section[1]});
//	nav.append(b);
//}
for (let section of sections) {
	//const button = document.createElement('input');
	//button.setAttribute('type','button');
	//button.setAttribute('data-section',section[0]);
	//button.value = section[1];
	//nav.appendChild(button);
	//const newLi = document.createElement('li');
	//newLi.innerHTML = section [1];
	//nav.appendChild(newLi);
	const newDiv = document.createElement('div');
	newDiv.id = section [0];
	newDiv.className = section[0];
	newDiv.innerHTML = section [1];
	nav.appendChild(newDiv);
}
const liveSectionsCollection = content.getElementsByTagName('section');

menu_button.addEventListener('click', function (event) {
    const section = event.target.getAttribute('id');
    console.log(section);
    menu_button_close.hidden = false;
    menu_button.style.display = "none";
    nav.style.display = "flex";
});
menu_button_close.addEventListener('click', function (event) {
    const section = event.target.getAttribute('id');
    console.log(section);
    menu_button_close.hidden = true;
    menu_button.removeAttribute("style");
    nav.removeAttribute("style");
});

nav.addEventListener('click', function (event) {
	const sectionId = event.target.getAttribute('id');
	console.log(sectionId);
	const section = event.target;
    if (sectionId === 'navigation') {return}
   for (let sect of sections) {
       const tag = document.getElementById(sect[0]);
       tag.className = sect[0];
   };
	section.className += " active";

	const liveSectionsArray = Array.from(liveSectionsCollection);

	if (sectionId === 'profile') {
		liveSectionsArray.forEach(function(sectionElement){
			sectionElement.hidden = true;});
		whoami(function (err, resp) {
			if (err) {
				return alert(`AUTH error: ${err.status}`);
			}
			emailDiv.textContent = resp.email;
			usernameDiv.textContent = resp.username;
			countDiv.textContent = resp.count;
			liveSectionsArray.find(section => section.id === 'profile' ).hidden = false;
		});
		return;
	}

	liveSectionsArray.forEach(function(sectionElement){
		sectionElement.hidden = true;
		if (sectionElement.id === sectionId) {
			sectionElement.hidden = false;

		}
	});
});


const popup = document.getElementById('mypopup');
const popupToggle = document.getElementById('myBtnLog');
const popupClose = document.querySelector('.close');

loginForm.addEventListener('submit', function (event) {
	event.preventDefault();
	console.log(loginForm.elements);
	const email = loginForm.elements['email'].value;
	const username = loginForm.elements['username'].value;
	auth(username, email, function (err, resp) {
		//console.log(err,resp);
		if (err) {
			return alert(`AUTH error: ${err.status}`);

		}
		loginForm.reset();
	});
	popup.style.display = "none";
});




popupToggle.addEventListener('click', function () {
	popup.style.display = "block";
});

popupClose.addEventListener('click', function () {
	popup.style.display = "none";
});

/*window.addEventListener('click', function (event) {
	console.log(event.target);
	if (event.target === popup) {
		popup.style.display = "none";
	}

});*/