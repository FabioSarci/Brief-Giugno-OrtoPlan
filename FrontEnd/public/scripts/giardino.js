const userr = JSON.parse(localStorage.getItem('user'));

fetch('http://localhost:8000/check/'+userId)
.then(res => res.json())
.then(user =>{
    const span = document.querySelector('#user');
    span.textContent = user.firstName +" "+ user.lastName;
    span.classList.remove('loading','loading-spinner','loading-sm');
});

function logout(){
    localStorage.clear();
    window.location.href = '/OrtoPlan';
}

function coltivazioni(){
    window.location.href = '/OrtoPlan/giardino/coltivazioni/' + userr.id;
}

function attivita(){
    window.location.href = '/OrtoPlan/giardino/attivita/' + userr.id; 
}

function previsioni(){
    window.location.href = '/OrtoPlan/giardino/previsioni/' + +userId; 
}

const profileModal = document.querySelector('#profileModal');
const profileForm = document.querySelector('#profileForm');

function openProfileModal(){
    profileModal.showModal();
    document.querySelector('input[name=firstName]').value = userr.firstName;
    document.querySelector('input[name=lastName]').value = userr.lastName;
    document.querySelector('input[name=email]').value = userr.email;
    document.querySelector('input[name=datanascita]').value = moment(userr.datanascita).format('YYYY-MM-DD');
    const password = document.querySelector('input[name=password]');
    const conferma = document.querySelector('input[name=conferma]');
    password.classList.add('hidden');
    conferma.classList.add('hidden');
};

profileForm.addEventListener('submit', (e) =>{
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
    };

    fetch('http://localhost:8000/user/'+userr.id,{
        method: 'PUT',
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            datanascita,
        }),
        headers: {
            "Content-Type": "application/json",
            authorization: 'Bearer ' + localStorage.getItem('token')
        },
    })
    .then((res) =>{
        if (res.status == 401){
            localStorage.clear();
            window.location.href = '/OrtoPlan';
            throw new Error();
        }
        return res.json();
    })
    .then((data) =>{
        if (data.isError){
          checkValidation(data.error);
          return
        }
        profileModal.close();
        localStorage.clear();
        alertSuccess();
        setTimeout(()=>{
            window.location.href = '/OrtoPlan';
        }, '2000');
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
        p.classList.add('text-red-500','error-message','text-sm');
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