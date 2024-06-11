# OrtoPlan - Progetto di fine anno Infobasic

OrtoPlan è un progetto sviluppato con l'obiettivo di imparare le tecniche di programmazione durante il suo stesso sviluppo.
Il progetto sviluppato in poco più di tre settimane è il risultato di un percorso di apprendimento, studio e ricerca conseguito alla scuila di informatica Infobasic.

## Indice

1. [Introduzione](#introduzione)
2. [Requisiti](#requisiti)
3. [Installazione](#installazione)
4. [Utilizzo](#utilizzo)
5. [Architettura del Progetto](#architettura-del-progetto)
6. [Contributi](#contributi)
7. [Licenza](#licenza)
8. [Ringraziamenti](#ringraziamenti)

## Introduzione
OrtoPlan consiste in una web app, che mira ad essere un supporto per la gestione di uno o più orti personali.
L'applicazione fornisce un area personale, nella quale si ha la possibilità creare, gestire ed eliminare le proprie piantagioni e di assegnarne delle attvità personalizzate; la scelta delle piante è fra ortaggi o fiori;
L'utente può usufruire di diverse api come il meteo locale giornaliero e settimanale.
Inoltre per migliorare l'esperienza ho integrato un sistema di notifiche che avviserà l'utente aiutandolo nella gestione degli orti.

## Requisiti

SoftWare e Versioni richieste:
    NodeJs: v21.5.0.
    MySql: v8.0

Dipendenze di sistema:
BackEnd:
    Prisma client: v5.13.0
    Cors: v2.8.5
    Express js: v4.19.2
    jsonwebtoken: v9.0.2
    moment js: v2.30.1
    validate.js: v0.13.1
    nodemon: v3.1.0

FrontEnd:
    express: v4.19.2
    ejs: v3.1.10
    splidejs/splide: v4.1.4
    aos: v2.3.4
    moment: v2.30.1
    validate.js: v0.13.1
    tailwindcss: v3.4.3
    daisyui: v4.10.1

## Installazione

1. Clonare il repository
    git clone https://github.com/FabioSarci/Brief-Giugno-OrtoPlan

2. Installare le dipendenze per il BackEnd
    cd BackEnd
    npm install

3. Installare le dipendenze per il FrontEnd
    cd FrontEnd
    npm install

## Utilizzo

Come avviare il progetto:
    Avviare il BackEnd:
        cd BackEnd
        npm run dev
        <!-- Gira sulla porta 8000 -->

    Avviare il FrontEnd:
        cd BackEnd
        npm run dev
        npm run tw
        <!-- Gira sulla porta 3000 -->

## Architettura del Progetto

Il sito contiene una landing page che in poche parole spiega all' utente cosa offre l'applicazione, e una sezione per il login o la registrazione dell' utente.

Una volta loggato l' utente verrà indirizzato nella propria dashboard nella quale egli potrà usufruire di una api del meteo giornaliero o e settimanale, dalla quale potra controllare facilmente il tempo atmosferico ed organizzarsi di conseguenza.
Sempre nella home della dashboard si trova la lista delle attività in scadenza, cioè le più vicine alla data odierna.

Nella barra laterale l'utente potrà uscire dal proprio account (e dalla conseguente sessione) o modificarlo, dovendo rieseguire il login;
è anche presente nella barra laterare la sezione 'Le tue coltivazioni', nella quale si potranno creare le proprie coltivazioni potendo scegliere la citta (in italia) e la pianta (tra ortaggi e fiori); inoltre nella pagina verranno mostrate tutte le coltivazioni possedute dall'utente.

Cliccando su una coltivazione si può accedere alla pagina personale della piantagione, nella quale vengono mostrate tutte le caratteristiche e le si potranno assegnare (creare) delle attività.

Infine l'ultima sezione è quella delle previsioni settimanali.


## Aggiornamenti Futuri
In futuro nel progetto mi piacerebbe inserire funzionalità di sicurezza più avanzate di quelle studiate.