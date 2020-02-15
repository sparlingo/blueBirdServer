const sanityClient = require('@sanity/client')
const fetch = require('node-fetch')

const UPDATE_PEOPLE_URL = 'http://127.0.0.1:4000/people'

const client = sanityClient({
  projectId: '9rty98wh',
  dataset: 'development',
  token: 'skvJuVk9SRNWvvpRQK0Z1vmNkhCR6yOYaI7RF4ay9N98tR9g4ac2K3zBRW4X7o5iB4UONrZsgUpM8Aj93FvB95YaYE7ClXXtEHBMFgU2C4ncTtOxwoVCtp0A7UnK4hEoss4WatfW93t68jHoIEQ64DvnW9oQKPh5UQOvboePKYtZgGCMKss6',
  useCdn: false
})

const currentPeopleQuery = '*[_type == "person"]{_id, bbrefId}'
//const currentPeopleURL = 'https://9rty98wh.api.sanity.io/v1/data/query/development?query=*[_type == "person"]{_id, bbrefId}'

client.fetch(currentPeopleQuery).then(currentPeople => {
  //console.log(currentPeople)
  fetch(UPDATE_PEOPLE_URL)
    .then(res => res.json())
    //.then(people => people.map(transform))
    .then(documents => {
      
      const subsetDocuments = documents.filter(doc => {
        for(let person of currentPeople) {
          return doc.playerID === person.bbrefId
        }
      })
      // now I have the correct values from munenori that I want to put into sanity. I need to add the matching ID from the currentpeople

      let newPeople = []
      
      newPeople = subsetDocuments.forEach(doc => {
        for(let person of currentPeople) {
          if(doc.bbrefID === person.bbrefId) {
            doc['_id'] = person._id
            //console.log(doc)
            return doc
          }
        }
      })
      console.log(newPeople)
      // const transformPeople = (x) => {
      //   return x.map(transform)
      // }
      // let subTransPeople = transformPeople(subsetPeople)
      // //console.log(subTransPeople)

      // let transaction = client.transaction()

      // subTransPeople.forEach(doc => {
      //   transaction.createOrReplace(doc)
      // })
      // return transaction.commit()

      // const allUpdatedPeople = Promise.all(updatePeople.map(doc => {
      //   client.patch(currentPeople)
      //   .setIfMissing(
      //     {height: doc.height},
      //     {weight: doc.weight},
      //     {debut: doc.debut},
      //     {finalGame: doc.finalGame}
      //   ).commit()
      //   .then(updatedPeople => {
      //     console.log('hooray, something happened: ')
      //     console.log(updatedPeople)
      //   })
      //   .catch(err => {
      //     console.log('uh-oh, something went wrong: ', err.message)
      //   })
      // }))
      //return allUpdatedPeople
      function transform(externalPerson) {
        return {
          _id: externalPerson._id,
          _type: 'person',
          bbrefId: externalPerson.playerID,
          height: externalPerson.height,
          weight: externalPerson.weight,
          debut: externalPerson.debut,
          finalGame: externalPerson.finalGame
        }
      }
    })
})
.catch(err => {
  console.log('the fetch did not work', err.message)
})






