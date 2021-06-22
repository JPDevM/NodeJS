// Capturamos el formulario
let subscriptionForm = document.querySelector('#addCustomSubscriptionForm');
let formFields = Array.from(subscriptionForm.elements); // Convertimos a array
formFields.pop(); // Sacamos el botón

console.log(formFields);

// Función que controla si el campo está vacío
// const isEmpty = (e) => {
//   let input = e.target; // Capturamos al campo
//   let inputValue = input.value.trim(); // Capturamos el valor del campo y le quitamos los espacios vacíos del principio y final si los hubiera

//   // Si el campo está vacío
//   if (inputValue === '') {
//     // si SÍ está vacío el campo, le aplicamos una clase llama "is-invalid"
//     input.classList.add('is-invalid');
//     // Seteamos el mensaje de error
//     feedbackMsg(
//       input,
//       `Escribí tu <b>${input.dataset.name}</b>`,
//       'invalid-feedback'
//     );
//   } else {
//     // si NO está vacío, le quitamos la clase "is-invalid"
//     input.classList.remove('is-invalid');
//     // Seteamos el mensaje de exito
//     feedbackMsg(
//       input,
//       `¡<b>${input.value}</b>, está perfecto!`,
//       'valid-feedback'
//     );
//   }
// };

// // Arreglar este caso para ajustar el mensaje de error
// const isEmail = (e) => {
//   let input = e.target;
//   let inputValue = input.value.trim();

//   // https://www.youtube.com/watch?v=rhzKDrUiJVk
//   // const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//   const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

//   // Si no pasa el test de ser un formato de correo electrónico
//   if (!regex.test(inputValue)) {
//     console.log('el email no cumple con el formato');
//     // si NO es un formato de correo electrónico
//     input.classList.remove('is-valid');
//     input.classList.add('is-invalid');
//     // Seteamos el mensaje de error
//     feedbackMsg(
//       input,
//       `<b>${inputValue}</b> no es un formato de correo válido`,
//       'invalid-feedback'
//     );
//   }
// };

// const feedbackMsg = (field, msg, className) => {
//   let spanTag = field.nextElementSibling; // Capturamos al hermano que está por debajo
//   spanTag.innerHTML = msg;
//   if (spanTag.classList.contains('invalid-feedback')) {
//     spanTag.classList.remove('invalid-feedback');
//   } else {
//     spanTag.classList.remove('valid-feedback');
//   }
//   spanTag.classList.add(className);
// };

// formFields.forEach((field) => {
//   if (field.type != 'radio' && field.type != 'checkbox') {
//     field.addEventListener('blur', isEmpty);

//     // Al campo de email, le asignamos lo siguiente
//     if (field.name === 'userEmail') {
//       field.addEventListener('change', isEmail);
//     }
//   }
// });

// // Radio buttons
// const radioButtons = [...document.querySelectorAll('input[name=conditions]')];

// radioButtons.forEach((radioButton) => {
//   radioButton.addEventListener('change', (e) => {
//     let aceptConditions = e.target.value;
//     if (aceptConditions === 'true') {
//       console.log('Aceptó');
//     } else {
//       console.log('No aceptó');
//     }
//   });
// });

// // Checkboxes
// const checkBoxes = [...document.querySelectorAll('input[name=gender]')];
// let genderValues = [];

// checkBoxes.forEach((checkBox) => {
//   checkBox.addEventListener('change', (e) => {
//     let checkboxValue = e.target.value;
//     if (checkBox.checked && !genderValues.includes(checkboxValue)) {
//       genderValues.push(checkboxValue);
//     } else {
//       // Hacer un filter, para eliminar el valor agregado
//       genderValues = genderValues.filter((gender) => gender != checkboxValue);
//     }
//     console.log(genderValues);
//   });
// });

// // Submit del formulario
// subscriptionForm.addEventListener('submit', (e) => {
//   let finalData = new FormData();

//   let infoForm = {};
//   let attachment = null;

//   formFields.forEach((field) => {
//     infoForm[field.name] = field.value;
//     if (field.type === 'file') {
//       attachment = field.files[0];
//     }
//   });

//   // Información extra que no depende del formulario
//   infoForm.userAgent = 'Mozilla Firefox';
//   infoForm.msgDate = new Date();

//   // Armando la finalData
//   finalData.append('formInfo', JSON.stringify(infoForm));
//   finalData.append('attachment', attachment);

//   // Enviar la data al backend / server
//   fetch('http://localhost:3000/contact', {
//     method: 'POST',
//     body: finalData,
//     // Los headers por default serán los de multipart/form-data
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       let successMsg = document.querySelector('#successMsg');

//       if (data.status === 200) {
//         // subscriptionForm.reset(); // Limpiar el formulario
//         subscriptionForm.remove(); // Eliminamos el formulario
//         successMsg.classList.remove('d-none');
//         successMsg.classList.remove('alert-danger');
//         successMsg.classList.add('alert-success');
//         successMsg.innerText = `Hola ${data.userInfo.name}, tu mensaje fue recibido. Pronto te responderemos a: ${data.userInfo.email}. Tu imagen se llamó ${data.userInfo.img}`;
//       }

//       if (data.status === 400) {
//         successMsg.classList.remove('d-none');
//         successMsg.classList.add('alert-danger');
//         successMsg.innerText = `El formulario no se ha podido enviar correctamente`;
//       }
//     });

//   // Evitar que se envíe el formulario porque se refresca la página
//   e.preventDefault();
// });

// // Validando el campo attachment
// let attachmentInput = document.querySelector('[name=attachment]');
// attachmentInput.addEventListener('change', (e) => {
//   let file = e.target.files[0];
//   let fileSize = Math.ceil(file.size / 1024);
//   if (fileSize > 1024) {
//     console.log(fileSize);
//     console.log('El archivo es muy pesado');
//   }
//   let extension = file.type.split('/').pop();
//   if (!['png', 'jpg', 'jpeg', 'gif'].includes(extension)) {
//     console.log('extension NO aceptada');
//   }
// });
