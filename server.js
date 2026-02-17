import express from 'express'

import { Liquid } from 'liquidjs';


// Vul hier jullie team naam in
const teamName = 'Glow';


const app = express()

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views' , './views')

app.use(express.urlencoded({extended: true}))

const messageParams = {
    'filter[for]': `glowbounty`
    // 'sort': '-date_created' 
  }

const personParams = {
    'sort': 'name',
    'fields': '*,squads.*',
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    'filter[squads][squad_id][cohort]': '2526'
  }
  
  
  // Laat eventueel zien wat de filter URL is
  // (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
  // console.log('API URL voor messages:', apiURL)
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(personParams))
  const personResponseJSON = await personResponse.json()

  const messagesResponse = await fetch('https://fdnd.directus.app/items/messages?' + new URLSearchParams(messageParams))
  const messagesResponseJSON = await messagesResponse.json()
console.log(messagesResponseJSON)


app.get('/', async function (request, response) {

  // Filter eerst de berichten die je wilt zien, net als bij personen
  // Deze tabel wordt gedeeld door iedereen, dus verzin zelf een handig filter,
  // bijvoorbeeld je teamnaam, je projectnaam, je person ID, de datum van vandaag, etc..
// const messageParams = {
//     'filter[for]': `glowbounty`,
//     'sort': '-date_created' 
//   }

//   const personParams = {
//     'sort': 'name',
//     'fields': '*,squads.*',
//     'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
//     'filter[squads][squad_id][cohort]': '2526'
//   }
  
  
//   // Laat eventueel zien wat de filter URL is
//   // (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
//   // console.log('API URL voor messages:', apiURL)
//   const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(personParams))
//   const personResponseJSON = await personResponse.json()

//   const messagesResponse = await fetch('https://fdnd.directus.app/items/messages?' + new URLSearchParams(messageParams))
//   const messagesResponseJSON = await messagesResponse.json()


  // Controleer eventueel de data in je console
  // console.log(messagesResponseJSON)

  // En render de view met de messages
  response.render('index.liquid', {
    teamName: teamName,
    messages: messagesResponseJSON.data,
    persons: personResponseJSON.data
  })
})


app.get('/student/:id', async function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  const personDetailResponse = await fetch('https://fdnd.directus.app/items/person/' + request.params.id)
  // En haal daarvan de JSON op
  const personDetailResponseJSON = await personDetailResponse.json()

  const messageIdParams = {
    'filter[for]': `glowbounty`+ request.params.id
    // 'sort': '-date_created' 
  }

  const messagesIdResponse = await fetch('https://fdnd.directus.app/items/messages?' + new URLSearchParams(messageIdParams))
  const messagesIdResponseJSON = await messagesIdResponse.json()
  
  // Render student.liquid uit de views map en geef de opgehaalde data mee als variable, genaamd person
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('student.liquid', {
    person: personDetailResponseJSON.data,
    teamName: teamName,
    messages: messagesResponseJSON.data,
    messagesId: messagesIdResponseJSON.data,
    persons: personResponseJSON.data})
})

app.post('/student/:id', async function (request, response) {

  // Stuur een POST request naar de messages tabel
  // Een POST request bevat ook extra parameters, naast een URL
  await fetch('https://fdnd.directus.app/items/messages', {

    // Overschrijf de standaard GET method, want ook hier gaan we iets veranderen op de server
    method: 'POST',

    // Geef de body mee als JSON string
    body: JSON.stringify({
      // Dit is zodat we ons bericht straks weer terug kunnen vinden met ons filter
      for: `glowbounty`+ request.params.id,
      // En dit zijn onze formuliervelden
      from: request.body.from,
      text: 'accept bounty'

    }),

    // En vergeet deze HTTP headers niet: hiermee vertellen we de server dat we JSON doorsturen
    // (In realistischere projecten zou je hier ook authentication headers of een sleutel meegeven)
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // Stuur de browser daarna weer naar de homepage
  response.redirect(303, '/')
})


app.set('port', process.env.PORT || 8000)

if (teamName == '') {
  console.log('Voeg eerst de naam van jullie team in de code toe.')
} else {
  app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}
