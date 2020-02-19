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

  let guid = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4();
  }

  function transform(person, id, hitterID) {
    return {
      _id: `hitter-${hitterID}`,
      _type: 'hitter',
      person: {_type: 'reference', '_ref': id},
      bats: person.bats,
      throws: person.throws,
      position: person.position
    }
  }
  
  let transaction = client.transaction()

  function getHitters(hitterNames) {
    for(let person of hitterNames) {
      axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&name_part='${person.name}'`)
      .then((res) => {
        let data = res.data.search_player_all.queryResults.row
        //console.log(data)
        if(data.position !== 'P') {
          let hitterID = guid()
          let thing = transform(data, person._id, hitterID)
          console.log(thing)
          transaction.createIfNotExists(thing)
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
  getHitters(names)
  return transaction.commit()
})
.catch(error => {
  console.log(error)
})


