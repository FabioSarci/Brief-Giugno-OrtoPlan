let lat = '41.8919';
let lon = '12.5113';
const elemento = document.querySelector('#previsionisettimana');
let immagine = '';

meteo(lat,lon);

cityForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    document.querySelectorAll('.error-message').forEach(element =>{
        element.remove();
    })
      document.querySelectorAll('.input-error').forEach(element =>{
        element.classList.remove('input-error');
    });

    const nomecitta = e.target[0].value;

    const validation = validate({
        nomecitta
    },
    {
        nomecitta:{
            presence:{allowEmpty: false,
                message: 'Campo Richiesto'
            },
        }
    });
    if(validation){
        checkValidation(validation);
        return;
    };

    fetch('http://localhost:8000/city',{
        method: 'POST',
        body:JSON.stringify({
            nomecitta
        }),
        headers: {
            "Content-Type": "application/json",
            authorization: 'Bearer ' + localStorage.getItem('token')
        },
    })
    .then((res) =>{
        return res.json();
    })
    .then((data) =>{
        if(data.isError){
            checkValidation(data.error);
            return
        };
        lat = JSON.stringify(data.lat);
        lon = JSON.stringify(data.lon);
        meteo(lat,lon);
    });

});

function meteo(lat,lon){

    let previsionigiornaliere = [];
    let orario = {};
    let indice = 0;

    const eliminadiv = document.querySelector('.splide__slide');
    document.querySelectorAll('.splide__slide').forEach(element =>{
        element.remove();
    });

    fetch('https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+'&hourly=uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,wind_speed_10m_max&timezone=GMT',
    {method: 'GET'}
)
.then((res) => {
    return res.json();
})
.then((data) => {
    data.daily.time.forEach(element => {
        giornata = {
            giorno: element,
            codice: data.daily.weather_code[indice],
            temp_max: data.daily.temperature_2m_max[indice],
            temp_min: data.daily.temperature_2m_min[indice],
            uv: data.daily.uv_index_max[indice],
            mm_precipitazioni: data.daily.precipitation_sum[indice],
        };
        previsionigiornaliere.push(giornata);
        indice += 1;
    });


    // Ottieni la data di oggi nel formato YYYY-MM-DD
    let today = moment().format('YYYY-MM-DD');

    previsionigiornaliere.forEach(element => {
        // Controlla se la data è uguale a oggi
        if (moment(element.ora).isSame(today, 'day')) {
            if(element.codice == 0){
                element.codice = 'Cielo sereno';
                immagine = 'Sole.svg';
            }else if(element.codice >= 1 && element.codice <=3){
                element.codice = 'Parzialmente Nuvoloso';
                immagine = 'Parzialmente-Nuvoloso.svg';
            }else if(element.codice >= 45 && element.codice <=48){
                element.codice = 'Nebbia e deposito di brina';
                immagine = 'Nebbia.svg';
            }else if(element.codice >= 51 && element.codice <=57){
                element.codice = 'Pioggia Leggera';
                immagine = 'Pioggia-Leggera.svg';
            }else if(element.codice >= 61 && element.codice <=67){
                element.codice = 'Pioggia';
                immagine = 'Pioggia-Forte.svg';
            }else if(element.codice >= 71 && element.codice <=75){
                element.codice = 'Lieve Nevicata';
                immagine = 'Neve.svg';
            }else if(element.codice ==77){
                element.codice = 'Nevicata';
                immagine = 'Nevicata.svg';
            }else if(element.codice >= 80 && element.codice <=82){
                element.codice = 'Pioggia Moderata';
                immagine = 'Pioggia-Forte.svg';
            }else if(element.codice >= 85 && element.codice <=86){
                element.codice = 'Nevicata Modetara';
                immagine = 'Nevicata.svg';
            }else if(element.codice == 95 ){
                element.codice = 'Temporale';
                immagine = 'Temporale.svg';
            }else if(element.codice >= 96 && element.codice <=99){
                element.codice = 'Temporale Con Grandinate';
                immagine = 'Temporale-con-Pioggia.svg';
            }
            // Crea un nuovo div
            let newDiv = document.createElement('div');
            // Aggiungi le classi al div
            newDiv.className = 'splide__slide border-2 border-accent rounded-xl justify-center p-4';
            // Aggiungi contenuto al div (opzionale)
            newDiv.innerHTML = `
                    <div class='flex-col w-full gap-1 lg:gap-0'>
                        <div class='flex justify-between items-center border-b border-b-accent pb-2 gap-1'>
                            <p class='lg:text-xl'>${moment(element.giorno).format('dddd,DD-MM-YYY')}</p>
                            <img src="/assets/meteo/${immagine}" alt="">
                        </div>
                        <div class='flex items-center'>
                            <p class='mt-1 lg:text-start text-sm'>${element.codice}</p>
                        </div>
                        <div class='flex justify-between'>
                            <div class=flex>
                                <p class='mt-1 lg:text-start text-sm'>min</p>
                                <p class=' text-2xl'>${element.temp_min}°C</p>
                            </div>
                            <div class=flex>
                                <p class='mt-1 lg:text-start text-sm'>max</p>
                                <p class=' text-2xl'>${element.temp_max}°C</p>
                            </div>
                        </div>
                        <div class='flex justify-between items-center'>
                            <p>UV Index: ${element.uv}</p>
                            <p>Pioggia: ${element.mm_precipitazioni} mm</p>
                        </div>
                    </div>
            `;
            const orattuale = JSON.parse(moment().format('H'));
            elemento.appendChild(newDiv);
        }
    });
});
};