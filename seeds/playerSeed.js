const sanityClient = require('@sanity/client')
const axios = require('axios')

const client = sanityClient({
  projectId: '9rty98wh',
  dataset: 'development',
  token: 'skvJuVk9SRNWvvpRQK0Z1vmNkhCR6yOYaI7RF4ay9N98tR9g4ac2K3zBRW4X7o5iB4UONrZsgUpM8Aj93FvB95YaYE7ClXXtEHBMFgU2C4ncTtOxwoVCtp0A7UnK4hEoss4WatfW93t68jHoIEQ64DvnW9oQKPh5UQOvboePKYtZgGCMKss6',
  useCdn: false
})

const currentPeopleQuery = '*[_type == "person"]{...}'

client.fetch(currentPeopleQuery)
.then(people => {
  //console.log(people)
  
  people.map(person => {
    let hitters = []
    let pitchers = []
    //console.log(person)
    axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&name_part='${person.name}'`)
    .then(resp => {
      let data = resp.data.search_player_all.queryResults.row
      //console.log(data)
      makePlayer(data)

      function makePlayer(thing) {
        if (thing.position === 'P') {
          let pitcher = {}
          pitcher['_id'] = person._id
          pitcher['person'] = {'_type': 'reference', '_ref': person._id }
          pitcher['hand'] = thing.throws
          return pitchers.push(pitcher)
        } else {
          let hitter = {}
          hitter['_id'] = person._id
          hitter['person'] = {'_type': 'reference', '_ref': person._id }
          hitter['bats'] = thing.bats
          hitter['throws'] = thing.throws
          //player['position'] = data.position
          return hitters.push(hitter)
        } // end of else
      }
    }) //end of axios .then
    .catch(err => {
      console.log(err)
    })
    
    //return transaction.commit()
  })
    // let transaction = client.transaction()
    // pitcher.forEach(doc => {
    //   transaction.createOrReplace(doc)
    // })
    // hitter.forEach(doc => {
    //   transaction.createOrReplace(doc)
    // })

  // let transaction = client.transaction()
  console.log(hitters)
  return people
})
.catch(err => {
  console.log(err)
})