const sanityClient = require('@sanity/client')

const PEOPLE_URL = 'http://127.0.0.1:4000/people'

const client = sanityClient({
  projectId: '9rty98wh',
  dataset: 'development',
  token: 'skvJuVk9SRNWvvpRQK0Z1vmNkhCR6yOYaI7RF4ay9N98tR9g4ac2K3zBRW4X7o5iB4UONrZsgUpM8Aj93FvB95YaYE7ClXXtEHBMFgU2C4ncTtOxwoVCtp0A7UnK4hEoss4WatfW93t68jHoIEQ64DvnW9oQKPh5UQOvboePKYtZgGCMKss6',
  useCdn: false
})

const currentPeopleURL = 'https://9rty98wh.api.sanity.io/v1/data/query/development  '

fetch(PEOPLE_URL)
  .then(res => res.json())
  .then(people => people.map(transform))
  .then(documents => {

    const peopleToWrite = documents.filter(doc =>
      doc.bbrefId === 
    )

    const matches = Promise.all(peopleToWrite.map(player => 
      client.setIfMissing(player)
    ))
  })




function transform(externalPerson) {
  return {
    _type: 'person',
    bbrefId: externalPerson.playerID,
    height: externalPerson.height,
    weight: externalPerson.weight,
    debut: externalPerson.debut,
    finalGame: externalPerson.finalGame
  }
}