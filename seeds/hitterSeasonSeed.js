const sanityClient = require('@sanity/client')
const axios = require('axios')

const client = sanityClient({
  projectId: '9rty98wh',
  dataset: 'development',
  token: 'skvJuVk9SRNWvvpRQK0Z1vmNkhCR6yOYaI7RF4ay9N98tR9g4ac2K3zBRW4X7o5iB4UONrZsgUpM8Aj93FvB95YaYE7ClXXtEHBMFgU2C4ncTtOxwoVCtp0A7UnK4hEoss4WatfW93t68jHoIEQ64DvnW9oQKPh5UQOvboePKYtZgGCMKss6',
  useCdn: false
})

const HITTERS_URL = 'http://127.0.0.1:4000/hitter/'

const currentHittersQuery = '*[_type == "hitter"]{..., person->}'

client.fetch(currentHittersQuery)
.then(hitters => {
  //console.log(hitters)
  // build an array to get multiple axios requests, use person.bbrefId
  let hittersCareers = [] 
  for(let hitter of hitters) {
    axios.get(HITTERS_URL + hitter.person.bbrefId)
    .then(resp => {
      let data = resp.data
      let career = []
      
      // 
      data.forEach(season => {
        // right now I'm delgado, and I have to transform all his seasons
        let playerSeason = transform(season)
        //console.log(playerSeason)
        return career.push(playerSeason)
      })
      //console.log(career)


      return hittersCareers.push(career)
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  function transform(season) {
    return {
      _id: season.playerID + '-' + season.yearID,
      type: 'hitterSeason',
      hitter: {_type: 'reference', _ref: season.bbrefId},
      person: {_type: 'reference', _ref: season.bbrefId},
      year: season.yearID,
      games: season.G,
      atBats: season.AB,
      runs: season.R,
      hits: season.H,
      doubles: season.doubles,
      triples: season.triples,
      hr: season.HR,
      rbi: season.RBI,
      sb: season.SB,
      cs: season.CS,
      so: season.SO,
      ibb: season.IBB,
      hbp: season.HBP,
      sh: season.SH,
      sf: season.SF,
      gidp: season.GIDP
    }
  }
  return hittersCarers
})
.catch((err) => { // catch for the first query
  console.log(err)
})


