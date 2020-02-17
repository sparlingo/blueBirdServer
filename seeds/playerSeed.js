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
    //console.log(person)
    let hitter = []
    let pitcher = []
    axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&name_part='${person.name}'`)
    .then(resp => {
      let data = resp.data.search_player_all.queryResults.row
      //console.log(data)
      if (data.position === 'P') {
        let player = {}
        player['_id'] = person._id
        player['person'] = {'_type': 'reference', '_ref': person._id }
        player['hand'] = data.throws
        pitcher.push(player)
      } else {
        let player = {}
        player['_id'] = person._id
        player['person'] = {'_type': 'reference', '_ref': person._id }
        player['bats'] = data.bats
        player['throws'] = data.throws
        //player['position'] = data.position
        hitter.push(player)
      } // end of else
    return pitcher, hitter
    })
    .catch(err => {
      console.log(err)
    })
    let transaction = client.transaction()
    pitcher.forEach(doc => {
      transaction.createOrReplace(doc)
    })
    hitter.forEach(doc => {
      transaction.createOrReplace(doc)
    })
    return transaction.commit()
  })
  // collect all the player and pitcher objects here
  // console.log(hitter)
  // console.log(pitcher)
  // let transaction = client.transaction()
return people
})
.catch(err => {
  console.log(err)
})