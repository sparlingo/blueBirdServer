const sanityClient = require('@sanity/client')
const axios = require('axios')

const client = sanityClient({
  projectId: '9rty98wh',
  dataset: 'development',
  token: 'skvJuVk9SRNWvvpRQK0Z1vmNkhCR6yOYaI7RF4ay9N98tR9g4ac2K3zBRW4X7o5iB4UONrZsgUpM8Aj93FvB95YaYE7ClXXtEHBMFgU2C4ncTtOxwoVCtp0A7UnK4hEoss4WatfW93t68jHoIEQ64DvnW9oQKPh5UQOvboePKYtZgGCMKss6',
  useCdn: false
})

const currentPeopleQuery = '*[_type == "person"]{...}'
const currentPeopleURL = 'https://9rty98wh.api.sanity.io/v1/data/query/development?query='

client.fetch(currentPeopleQuery).then(currentPeople => {
  console.log(currentPeople)
  // let pitchers = []
  // currentPeople.forEach(person => {
  //   pitchers.push(person.name)
  //   return pitchers
  // })
  // console.log(pitchers)

  // for(let person of currentPeople) { //loops through each player
  //   axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&name_part='${person.name}'`)
  //   .then(resp => {
  //     let data = resp.data.search_player_all.queryResults.row
  //     //console.log(data)
  //     if (data.position === 'P') {
  //       let pitcher = {}
  //       pitcher['_id'] = person._id
  //       pitcher['_type'] = 'pitcher'
  //       pitcher['person'] = {'_type': 'reference', '_ref': person._id }
  //       pitcher['hand'] = data.throws
  //       //console.log(pitcher)
  //       return pitchers.push(pitcher)
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }
  //console.log(documents)
  // let transaction = client.transaction()
  // pitchers.forEach(doc => {
  //   transaction.createOrReplace(doc)
  // })
  // return transaction.commit()
  return currentPeople

}) //end of currentPeople fetch
.catch(err => {
  console.log(err)
})
