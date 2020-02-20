const sanityClient = require('@sanity/client')
const fetch = require('node-fetch')

const client = sanityClient({
  projectId: '9rty98wh',
  dataset: 'development',
  token: 'skvJuVk9SRNWvvpRQK0Z1vmNkhCR6yOYaI7RF4ay9N98tR9g4ac2K3zBRW4X7o5iB4UONrZsgUpM8Aj93FvB95YaYE7ClXXtEHBMFgU2C4ncTtOxwoVCtp0A7UnK4hEoss4WatfW93t68jHoIEQ64DvnW9oQKPh5UQOvboePKYtZgGCMKss6',
  useCdn: false
})

const currentPeopleQuery = '*[_type == "person"]{...}'
//const currentPeopleURL = 'https://9rty98wh.api.sanity.io/v1/data/query/development?query='

const MLB_API_URL = 'http://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season=%271977%27&end_season=%272018%27&team_id=%27141%27'

fetch(MLB_API_URL).then(res => res.json())
.then(players => {
  let data = players.roster_team_alltime.queryResults.row
  return data
})
.then(allTimePlayers => {
  
  client.fetch(currentPeopleQuery).then(currentPeople => {
    //console.log(currentPeople)
    let allPitchers = []
    currentPeople.forEach(person => {
      for(let dude of allTimePlayers) { //dude is from mlb, person is from sanity
        if(dude.name_first_last === person.name && dude.primary_position === 'P') {
          //console.log(dude)
          return allPitchers.push({
            _id: person.bbrefId + '-' + dude.weight + dude.jersey_number + dude.player_id,
            _type: 'pitcher',
            person: {_type: 'reference', _ref: person._id},
            hand: dude.throws
          })
        }
      }
    })
    return allPitchers
  })
  .then(allPitchers => {
    console.log(allPitchers)
    let transaction = client.transaction()
    allPitchers.forEach(doc => {
      transaction.createOrReplace(doc)
    })
    //console.log(transaction)
    //return transaction
    return transaction.commit()
  })
  .catch(error => {
    console.log(error)
  })
  return allTimePlayers
})
.catch(error => {
  console.log(error)
}) 
