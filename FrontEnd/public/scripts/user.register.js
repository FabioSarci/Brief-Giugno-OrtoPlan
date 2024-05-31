let registerMod;
let users = [];
function openRegisterModal() {
    registerMod = undefined;
    registerModal.showModal();
    registerForm.reset();
  }

const registerForm = document.querySelector('#registerForm');
const registerModal = document.querySelector('#registerModal');

registerForm.addEventListener('submit',(e) =>{
  e.preventDefault();

  document.querySelectorAll('.error-message').forEach(element =>{
    element.remove();
  });
  document.querySelectorAll('.input-error').forEach(element =>{
    element.classList.remove('input-error');
  });

  const firstName = e.target[0].value;
  const lastName = e.target[1].value;
  const email = e.target[2].value;
  const password = e.target[3].value;
  const conferma = e.target[4].value;
  const datanascita = e.target[5].value;
  
  validate.extend(validate.validators.datetime, {
    parse: function(value, options) {
      return +moment.utc(value);
    },
    format: function(value, options) {
      var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
      return moment.utc(value).format(format);
    }
  });

  const validation = validate({
    firstName,
    lastName,
    email,
    password,
    conferma,
    datanascita
},
{
    firstName:{
        presence: {allowEmpty: false,
            message: 'Campo Richiesto'    
        },
        length: {minimum: 5,
            tooShort: " deve avere minimo 5 Caratteri!"
        },
    },
    lastName:{
        presence: {allowEmpty: false,
            message: 'Campo Richiesto'    
        },
        length: {minimum: 5,
            tooShort: " deve avere minimo 5 Caratteri!"
        },
    },
    email:{
        email:{
            email :true,
            message: 'Non Valida'
        }
    },
    conferma:{
        equality:{
            attribute: "password",
            message: "Le password devono essere uguali",
        }
    },
    datanascita:{
        datetime: {
            dateOnly: true,
            latest: moment.utc().subtract(18, 'years'),
            message: "^You need to be at least 18 years old"
          }
    }
    
}
);

if(validation){
  checkValidation(validation);
  return;
}

const url = loginMod
? "http://localhost:8000/check/" + loginMod.id
: "http://localhost:8000/register";

fetch(url, {
method: registerMod ? "PUT" : "POST",
body: JSON.stringify({
  firstName,
  lastName,
  email,
  password,
  datanascita,
}),
headers: {
  "Content-Type": "application/json",
},
})
.then((res) =>{
  return res.json();
})
.then((data) =>{
  if (data.isError){
    checkValidation(data.error);
    return
  }
  registerModal.close();
  alertSuccess();

});

});


function checkValidation(validation) {
  Object.keys(validation).forEach((key) => {
    const el = document.querySelector(`input[name=${key}]`);
    setErr(el, validation[key]);
  });
}

function setErr(el,messages){
  el.classList.add('input-error');
  messages.reverse().forEach(message =>{
      const p = document.createElement('p');
      p.textContent = message;
      p.classList.add('text-red-500','error-message');
      el.parentNode.insertBefore(p,el.nextSibling);
  })
}

function alertSuccess(){
  document.querySelectorAll('#success').forEach(element =>{
    element.classList.remove('hidden');
  });

  return new Promise((resolve) =>{
    setTimeout(() =>{
      resolve(document.querySelectorAll('#success').forEach(element =>{
        element.classList.add('hidden');
      }))
    },10000);
  });
};