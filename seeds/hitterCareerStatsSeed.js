const sanityClient = require('@sanity/client')
const fetch = require('node-fetch')

const client = sanityClient({
  projectId: '9rty98wh',
  dataset: 'development',
  token: 'skvJuVk9SRNWvvpRQK0Z1vmNkhCR6yOYaI7RF4ay9N98tR9g4ac2K3zBRW4X7o5iB4UONrZsgUpM8Aj93FvB95YaYE7ClXXtEHBMFgU2C4ncTtOxwoVCtp0A7UnK4hEoss4WatfW93t68jHoIEQ64DvnW9oQKPh5UQOvboePKYtZgGCMKss6',
  useCdn: false
})

const currentHittersQuery = '*[_type == "hitter"]{..., person->}'
//const currentHittersQueryURL = 'https://9rty98wh.api.sanity.io/v1/data/query/development?query=*[_type%20==%20%22hitterSeason%22]{...,%20person-%3E}'
fetch('http://127.0.0.1:4000/hitters/careers').then(res => res.json())
.then(allTheHitters => {
  client.fetch(currentHittersQuery).then(currentHitters => {
    let allCareers = []
    currentHitters.forEach(hitter => {
      for(let dude of allTheHitters) {
        if(dude.playerID === hitter.person.bbrefId) {
          allCareers.push({
            _id: dude.player + '-' + dude.CS + dude.AB + dude.GIDP + dude.SB + dude.HR,
            _type: 'hitterCareerStats',
            hitter: {_type: 'reference', _ref: hitter._id},
            person: {_type: 'reference', _ref: hitter.person._id},
            games: dude.G,
            atBats: dude.AB,
            runs: dude.R,
            hits: dude.H,
            doubles: dude.doubles,
            triples: dude.triples,
            hr: dude.HR,
            rbi: dude.RBI,
            sb: dude.SB,
            cs: dude.CS,
            bb: dude.BB,
            so: dude.SO,
            ibb: dude.IBB,
            hbp: dude.HBP,
            sh: dude.SH,
            sf: dude.SF,
            gidp: dude.GIDP
          })
        }
      }
    })
    return allCareers
  })
  .then(allCareers => {
    //console.log(allCareers)
    let transaction = client.transaction()
    allCareers.forEach(career => {
      transaction.createOrReplace(career)
    })
    console.log(transaction)
    transaction.commit()
  })
})

