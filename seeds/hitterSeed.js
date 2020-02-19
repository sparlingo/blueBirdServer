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
  //console.log(allCurrentPeople)
  return allCurrentPeople
})
.then(names => {
  //console.log(names)
  let documents = []
  let transaction = client.transaction()

  function transform(person, id) {
    return {
      _id: `hitter-${id}`,
      _type: 'hitter',
      person: {_type: 'reference', '_ref': id},
      bats: person.bats,
      throws: person.throws,
      position: person.position
    }
  }
  
  function getAllPeopleData(name, id) {
    axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&name_part='${name}'`)
    .then((res) => {
      let data = res.data.search_player_all.queryResults.row
      //console.log(data)
      if(data.position !== 'P') {
        var newHitter = transform(data, id)
        //console.log(newHitter)
        return documents.push(newHitter)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  names.forEach(hitter => {
    let document = getAllPeopleData(hitter.name, hitter._id)
    return document
  })
  
  console.log(documents)
  documents.forEach(doc => {
    transaction.createOrReplace(doc)
  })
  return transaction.commit()

})
.catch(error => {
  console.log(error)
})


