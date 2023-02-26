import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const savedData = localStorage.getItem(STORAGE_KEY, JSON.stringify(formData));
const parsedData = JSON.parse(savedData);

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('input', onAllFieldInput);
fillTextarea();

function onAllFieldInput(event) {
  formData[event.target.name] = event.target.value;
}

function onFormSubmit(event) {
  event.preventDefault();
  if (refs.email.value === '' || refs.textarea.value === '') {
    alert('Заповніть всі поля форми');
  }
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(event) {
  return localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function fillTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    refs.form.email.value = parsedData.email;
    refs.form.message.value = parsedData.message;
  }
}
