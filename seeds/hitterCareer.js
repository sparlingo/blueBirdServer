const sanityClient = require('@sanity/client')
const axios = require('axios')

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
  let allPlayers = []
  currentHitters.forEach(hitter => {
    
    function getStats(query) {
      let data = axios.get('http://127.0.0.1:4000/hitter/' + hitter.person.bbrefId)
      return data
    }
    let career = getStats(hitter.person.bbrefId)
    .then(response => {
      let careerStats = {
        _id: hitter.person.bbrefId + '-' + hitter.person.height + hitter.person.weight + hitter.bats + hitter.throws + hitter.position,
        _type: 'hitterCareer',
        hitter: {_type: 'reference', _ref: hitter._id},
        person: {_type: 'reference', _ref: hitter.person._id},
        games: 0,
        atBats: 0,
        runs: 0,
        hits: 0,
        doubles: 0,
        triples: 0,
        hr: 0,
        rbi: 0,
        sb: 0,
        cs: 0,
        so: 0,
        ibb: 0,
        hbp: 0,
        sh: 0,
        sf: 0,
        gidp: 0
      }
      
      response.data.forEach(season => {
        careerStats['games'] += season.G
        careerStats['atBats'] += season.AB
        careerStats['runs'] += season.R
        careerStats['hits'] += season.H
        careerStats['doubles'] += season.doubles
        careerStats['triples'] += season.triples
        careerStats['hr'] += season.HR
        careerStats['rbi'] += season.RBI
        careerStats['sb'] += season.SB
        careerStats['cs'] += season.CS
        careerStats['so'] += season.SO
        careerStats['ibb'] += season.IBB
        careerStats['hbp'] += season.HBP 
        careerStats['sh'] += season.SH
        careerStats['sf'] += season.SF
        careerStats['gidp'] += season.GIDP
      })
      return careerStats
    })
    return career
  })
  console.log(career)
})
