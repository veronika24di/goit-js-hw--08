
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const localStorageKey = 'feedback-form-state';

const saveFormState = throttle(() => {
const formState = {
email: emailInput.value,
message: messageInput.value,
};
localStorage.setItem(localStorageKey, JSON.stringify(formState));
}, 500);

form.addEventListener('input', saveFormState);

const loadFormState = () => {
const formStateJSON = localStorage.getItem(localStorageKey);
if (formStateJSON) {
const formState = JSON.parse(formStateJSON);
emailInput.value = formState.email;
messageInput.value = formState.message;
}
};

loadFormState();

form.addEventListener('submit', e => {
e.preventDefault();
const formState = {
email: emailInput.value,
message: messageInput.value,
};
console.log(formState);
localStorage.removeItem(localStorageKey);
emailInput.value = '';
messageInput.value = '';
});