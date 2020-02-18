const sanityClient = require('@sanity/client')
const axios = require('axios')

const MLB_API = "http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&name_part=''"

const client = sanityClient({
  projectId: '9rty98wh',
  dataset: 'development',
  token: 'skvJuVk9SRNWvvpRQK0Z1vmNkhCR6yOYaI7RF4ay9N98tR9g4ac2K3zBRW4X7o5iB4UONrZsgUpM8Aj93FvB95YaYE7ClXXtEHBMFgU2C4ncTtOxwoVCtp0A7UnK4hEoss4WatfW93t68jHoIEQ64DvnW9oQKPh5UQOvboePKYtZgGCMKss6',
  useCdn: false
})

const currentPeopleQuery = '*[_type == "person"]{_id, name}'

client.fetch(currentPeopleQuery).then(allCurrentPeople => {
  //console.log(currentPeople)
  //console.log(typeof currentPeople)
  return allCurrentPeople
})
// .then(people => {
//   const names = []
//   for(let person of people) {
//     names.push(person.name)
//   }
//   return names
// })
.then(names => {
  function transform(person, bbrefId) {
    return {
      _id: `hitter-${bbrefId}`,
      _type: 'hitter',
      person: {_type: 'reference', '_ref': bbrefId},
      bats: person.bats,
      throws: person.throws,
      position: person.position
    }
  }
  
  function getAllPeopleData(name, bbrefId) {
    axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&name_part='${name}'`)
    .then((res) => {
      if(res.data.search_player_all.queryResults.row.position !== 'P') {
        let newPerson = transform(res.data.search_player_all.queryResults.row, bbrefId)
        console.log(newPerson)
        //I have the correctish values here
      }
    }) 
  }
  for(let hitter of names) {
    let result = getAllPeopleData(hitter.name, hitter._id)
    //console.log(result)
  }
})
.catch(error => {
  console.log(error)
})


