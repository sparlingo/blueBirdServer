const sanityClient = require('@sanity/client')
const fetch = require('node-fetch')

const UPDATE_PEOPLE_URL = 'http://127.0.0.1:4000/people'

const client = sanityClient({
  projectId: '9rty98wh',
  dataset: 'development',
  token: 'skvJuVk9SRNWvvpRQK0Z1vmNkhCR6yOYaI7RF4ay9N98tR9g4ac2K3zBRW4X7o5iB4UONrZsgUpM8Aj93FvB95YaYE7ClXXtEHBMFgU2C4ncTtOxwoVCtp0A7UnK4hEoss4WatfW93t68jHoIEQ64DvnW9oQKPh5UQOvboePKYtZgGCMKss6',
  useCdn: false
})

const currentPeopleQuery = '*[_type == "person"]{_id, bbrefId, name, slug}'
//const currentPeopleURL = 'https://9rty98wh.api.sanity.io/v1/data/query/development?query=*[_type == "person"]{_id, bbrefId}'

client.fetch(currentPeopleQuery).then(currentPeople => {
  //console.log(currentPeople)
  fetch(UPDATE_PEOPLE_URL)
    .then(res => res.json())
    .then(documents => {

      let subsetDocuments = []
      documents.map(doc => {
        for(let person of currentPeople) { //doc is coming from munenori, person from sanity
          if(doc.bbrefID === person.bbrefId) {
            doc['name'] = person.name
            doc['slug'] = person.slug
            let newPerson = transform(doc)
            //console.log(newPerson)
            return subsetDocuments.push(newPerson)
          }
        }
      })
   
      let transaction = client.transaction()
      subsetDocuments.forEach(doc => {
        transaction.createOrReplace(doc)
      })

      function transform(externalPerson) {
        return {
          _id: externalPerson.playerID + '-' + externalPerson._id,
          _type: 'person',
          name: externalPerson.name,
          bbrefId: externalPerson.playerID,
          slug: externalPerson.slug,
          height: externalPerson.height,
          weight: externalPerson.weight,
          debut: externalPerson.debut,
          finalGame: externalPerson.finalGame
        }
      }
      return transaction.commit()
    })
  return currentPeople
})
.catch(err => {
  console.log('the fetch did not work', err.message)
})