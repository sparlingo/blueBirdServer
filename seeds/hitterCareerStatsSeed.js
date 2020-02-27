const sanityClient = require('@sanity/client')
const axios = require('axios')
const fetch = require('node-fetch')

const client = sanityClient({
  projectId: '9rty98wh',
  dataset: 'development',
  token: 'skvJuVk9SRNWvvpRQK0Z1vmNkhCR6yOYaI7RF4ay9N98tR9g4ac2K3zBRW4X7o5iB4UONrZsgUpM8Aj93FvB95YaYE7ClXXtEHBMFgU2C4ncTtOxwoVCtp0A7UnK4hEoss4WatfW93t68jHoIEQ64DvnW9oQKPh5UQOvboePKYtZgGCMKss6',
  useCdn: false
})

const currentHittersQuery = '*[_type == "hitter"]{..., person->}'
//const currentHittersQueryURL = 'https://9rty98wh.api.sanity.io/v1/data/query/development?query=*[_type%20==%20%22hitterSeason%22]{...,%20person-%3E}'
client.fetch(currentHittersQuery).then(currentHitters => {
  //console.log(currentHitters)
  return currentHitters
})
.then(currentHitters => {
  let transaction = client.transaction()
  let allCareers = []
  currentHitters.forEach(hitter => {

    const getStats = async query => {
      const response = await axios.get('http://127.0.0.1:4000/hitter/career/' + query)
      //console.log(response.data)
      return response.data
    }

    const makeTransaction = async hitter => {
      let career = await getStats(hitter.person.bbrefId)
      career['_id'] = career.playerID + '-' + career.AB + career.SO + career.SH + career.doubles + career.RBI
      career['hitter'] = {'_type': 'reference', '_ref': hitter._id }
      console.log(career)
      return career
    }
    let career = makeTransaction(hitter)
    //console.log(career)
    return allCareers.push(career)
  }) //end of forEach for hitters
  allCareers.forEach(career => {
    transaction.createOrReplace(career)
  })
  console.log(transaction)
  //return transaction.commit()
})
