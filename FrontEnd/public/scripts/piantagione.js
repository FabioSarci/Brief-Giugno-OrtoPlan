

const content = document.querySelector('#caratteristiche');
const titolo = document.querySelector('#titolo');
const user = JSON.parse(localStorage.getItem('user'));
let piantagione = {};

const indietro = document.querySelector('#indietro');
indietro.href = 'http://localhost:3000/OrtoPlan/giardino/coltivazioni/'+user.id;

//Dati e Caratteristiche piantagione

fetch('http://localhost:8000/piantagione/'+ +piantagioneId,{
    method:'GET',
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
    piantagione = data;
    titolo.innerHTML = `${data.nome}`;
    content.innerHTML = 
    `
        <div class='flex flex-col border-2 border-accent p-4 rounded-ss-xl'>
            <h1 class='text-sm'>Descrizione:</h1>
            ${data.descrizione}
        </div>
        <div class='flex flex-col border-2 border-accent p-4 rounded-se-xl'>
        <h1 class='text-sm'>Proprietario </h1>
            ${user.firstName} ${user.lastName}
        </div>
        <div class='flex flex-col border-2 border-accent p-4'>
        <h1 class='text-sm'>Situato a</h1>
            ${data.comuni.denominazione} - ${data.comuni.cap}
        </div>
        <div class='flex flex-col border-2 border-accent p-4'>
        <h1 class='text-sm'>Aperta il</h1>
            ${moment(data.datacreazione).format('DD-MM-YYYY')}
        </div>
        <div class='flex flex-col border-2 border-accent p-4'>
            <h1 class='text-sm'>Pianta</h1>
            ${data.pianta.nome}
        </div>
        <div class='flex flex-col border-2 border-accent p-4'>
            <h1 class='text-sm'>Tipologia</h1>
            ${data.pianta.tipologia}
        </div>
        <div class='flex flex-col border-2 border-accent p-4'>
            <h1 class='text-sm'>Stagione di Semina</h1>
            <p>${data.pianta.stagione_semina}</p>
        </div>
        <div class='flex flex-col border-2 border-accent p-4'>
            <h1 class='text-sm'>Stagione di Raccolto</h1>
            <p>${data.pianta.stagione_raccolto}</p>
        </div>
        <div class='flex flex-col border-2 border-accent p-4 rounded-bl-xl'>
            <h1 class='text-sm'>Temperatura di Crescita</h1>
            ${data.pianta.temperatura_ottimale}
        </div>
        <div class='border-2 border-accent p-4 rounded-br-xl'>
            <button type="button" class="btn border-accent text-accent" onclick="openCreateActivityModal()">Aggiungi Attivita<button>
        </div>
        
    `
});

//Modifica Piantagione
function openEditModal() {
    editModal.showModal();
    document.querySelector("input[name=nome]").value = piantagione.nome;
    document.querySelector("input[name=descrizione]").value = piantagione.descrizione;
    cityInput.value = piantagione.comuni.cap;
    cityInput.text = piantagione.comuni.denominazione;
    plantInput.value = piantagione.pianta.id;
    plantInput.text = piantagione.pianta.nome;
};

const editForm = document.querySelector('#editForm');
const editModal = document.querySelector('#editModal');

editForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    document.querySelectorAll('.error-message').forEach(element =>{
        element.remove();
    });
      document.querySelectorAll('.input-error').forEach(element =>{
        element.classList.remove('input-error');
    });

    const nome = e.target[0].value;
    const descrizione = e.target[1].value;
    const datacreazione = piantagione.datacreazione;
    const cap = e.target[2].value;
    const idpianta = +e.target[3].value;


    const validation = validate({
        nome,
        descrizione,
        cap
    },
    {
        nome:{
            presence: {
                allowEmpty:false,
                message: 'Campo Richiesto'
            },
        },
        descrizione:{
            presence: {
                allowEmpty:false,
                message: 'Campo Richiesto'
            },
        },
        cap:{
            presence: {
                allowEmpty:false,
                message: 'Campo Richiesto'
            },
        },
    },
    );
    if(validation){
        checkValidation(validation);
        return;
    };

    fetch('http://localhost:8000/piantagioni/' + piantagione.id ,{
        method:'PUT',
        body: JSON.stringify({
            nome,
            descrizione,
            datacreazione,
            cap,
            idpianta,
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
        editModal.close();
        location.reload();
    });

});

//Elimina Piantagione
const deleteModal = document.querySelector('#deleteModal');

function openDeleteModal() {
    deleteModal.showModal();
};


function deleteColtivazione(){
    fetch('http://localhost:8000/piantagione/'+idpiantagione,{
        method:'DELETE',
        headers:{
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
        window.location.href = '/Ortoplan/giardino/coltivazioni/'+user.id;
    })
};

//lista tipologie
const typeList = ['Semina','Irrigazione','Concimazione','Diserbo','Potatura','Raccolto'];
const typeSelect = document.querySelector('#typeList');
typeList.forEach(tipologia =>{
    const typeOption = document.createElement('option');
    typeOption.value = tipologia;
    typeOption.text = tipologia;
    typeSelect.appendChild(typeOption);
});

//lista ripetizioni
const repeatList = ['1 Volta al Giorno','2 Volte al Giorno','1 Volta a Settimana','2 Volte a Settimana','3 Volte a Settimana','4 Volte a Settimana','1 Volta al Mese','2 Volte al Mese','3 Volte al Mese','1 Volta all anno'];
const repeatSelect = document.querySelector('#repeatList');
repeatList.forEach(string =>{
    const repeatOption = document.createElement('option');
    repeatOption.value = string;
    repeatOption.text = string;
    repeatSelect.appendChild(repeatOption);
});


//Creazione attivita
const createActivityForm = document.querySelector('#createActivityForm');
const createActivityModal = document.querySelector('#createActivityModal');

function openCreateActivityModal() {
    createActivityModal.showModal();
    createActivityForm.reset();
};

createActivityForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    document.querySelectorAll('.error-message').forEach(element =>{
        element.remove();
    });
      document.querySelectorAll('.input-error').forEach(element =>{
        element.classList.remove('input-error');
    });

    const nome = e.target[0].value;
    const tipologia = e.target[1].value;
    const ripetizione = e.target[2].value;
    const data = e.target[3].value;
    const idpiantagione = +piantagioneId;

    validate.extend(validate.validators.datetime, {
        // Utilizza il parser di date di default di validate.js
        parse: function(value, options) {
            return +new Date(value);
        },
        // Utilizza il formattatore di date di default di validate.js
        format: function(value, options) {
            var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
            return moment(value).format(format);
        }
    });

    validate.validators.greaterThanOrEqualToToday = function(value, options, key, attributes) {
        var today = new Date();
        today.setHours(0, 0, 0, 0); // Imposta l'orario di oggi a mezzanotte
        var inputDate = new Date(value);
        if (inputDate < today) {
            return "deve essere uguale o maggiore alla data odierna";
        }
    };
    
    const validation = validate({
        nome,
        tipologia,
        ripetizione,
        data,
    },
    {
        nome:{
            presence: {
                allowEmpty:false,
                message: 'Campo Richiesto'
            },
        },
        tipologia:{
            presence: {
                allowEmpty:false,
                message: 'Campo Richiesto'
            },
            inclusion:typeList,
        },
        ripetizione:{
            presence: {
                allowEmpty:false,
                message: 'Campo Richiesto'
            },
            inclusion:repeatList,
        },
        data:{
            datetime:true,
            greaterThanOrEqualToToday: true,
        }

    });
    if(validation){
        checkValidation(validation);
        return
    };

    fetch('http://localhost:8000/attivita',{
        method:'POST',
        body: JSON.stringify({
            nome,
            tipologia,
            ripetizione,
            data,
            idpiantagione,
        }),
        headers:{
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
        if(data.isError){
            checkValidation(data.error);
            return
        }
        createActivityModal.close();
        location.reload();
    })
});


//Show lista attivita
const idpiantagione = +piantagioneId;

fetch('http://localhost:8000/attivita/'+idpiantagione,{
    method:'GET',
    headers:{
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
    const padre = document.querySelector('#attivita');
    if(data.length == 0 ){
        let newdiv = document.createElement('div');
        newdiv.id = 'noElement';
        newdiv.className = 'w-full text-xl text-center text-gray-500';
        newdiv.innerHTML = ` Non ci sono Attivita in programma. `;
        padre.appendChild(newdiv);
        new Splide( '#splide',
            {
                type: 'slide',
                rewind: true,
                rewindByDrag: true,
                gap: '1rem',
                start: 0,
                perMove: 1,
                pagination: false
            }
            ).mount();
    }else{
        data.forEach(attivita =>{

            let newdiv = document.createElement('div');
            newdiv.className = 'splide__slide border-2 border-accent rounded-xl justify-center lg:max-w-72 max-w-80 p-2 w-full';
            newdiv.innerHTML = 
            `
            <div class='flex lg:flex-col w-full gap-1 lg:gap-0'>
            <div class='flex justify-between items-center lg:border-b lg:border-b-accent lg:pb-2 gap-1'>
                <p class='lg:text-xl'>${attivita.nome}</p>
            </div>
            <div class='flex items-center justify-between'>
                <p class='mt-1 lg:text-start text-sm'>${attivita.tipologia}</p>
                <p class='text-sm'>${moment(attivita.data).format('DD-MM-YYY')}</p>
            </div>
            <div class='flex justify-between items-center'>
                <p class=' text-2xl'>${attivita.ripetizione}</p>
            </div>
            </div>
            `;
            padre.appendChild(newdiv);
    
            new Splide( '#splide',
            {
                type: 'slide',
                rewind: true,
                rewindByDrag: true,
                gap: '1rem',
                start: 0,
                perMove: 1,
                pagination: false
            }
            ).mount();
        });
    };
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


//lista piante
const plantInput = document.querySelector('#plantList');
fetch('http://localhost:8000/plant',{
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
    },
})
.then((res) => {
    return res.json();
})
.then((data) =>{
    data.forEach(plant =>{
        const plantoption = document.createElement('option');
        plantoption.value = plant.id;
        plantoption.text =plant.nome;
        plantInput.appendChild(plantoption);
    });
});

//lista delle citta e i cap
const cityInput = document.querySelector('#cityList');

fetch('http://localhost:8000/city',{
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
    },
})
.then((res) =>{
    return res.json();
})
.then((data) =>{
    data.forEach(city =>{
            const cityoption = document.createElement('option');
            cityoption.value = city.cap;
            cityoption.text =city.cap+' - '+city.denominazione;
            cityInput.appendChild(cityoption);
        });
});