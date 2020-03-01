const sanityClient = require('@sanity/client')
const fetch = require('node-fetch')

const client = sanityClient({
  projectId: '9rty98wh',
  dataset: 'development',
  token: 'skvJuVk9SRNWvvpRQK0Z1vmNkhCR6yOYaI7RF4ay9N98tR9g4ac2K3zBRW4X7o5iB4UONrZsgUpM8Aj93FvB95YaYE7ClXXtEHBMFgU2C4ncTtOxwoVCtp0A7UnK4hEoss4WatfW93t68jHoIEQ64DvnW9oQKPh5UQOvboePKYtZgGCMKss6',
  useCdn: false
})

const currentHittersQuery = '*[_type == "pitcher"]{..., person->}'
//const currentHittersQueryURL = 'https://9rty98wh.api.sanity.io/v1/data/query/development?query=*[_type%20==%20%22hitterSeason%22]{...,%20person-%3E}'
fetch('http://127.0.0.1:4000/pitchers/careers').then(res => res.json())
.then(allThePitchers => {
  client.fetch(currentHittersQuery).then(currentPitchers => {
    let allCareers = []
    currentPitchers.forEach(pitcher => {
      for(let dude of allThePitchers) {
        if(dude.playerID === pitcher.person.bbrefId) {
          allCareers.push({
            _id: pitcher.person.bbrefId + '-' + dude.ER + dude.G + dude.IPouts + dude.R + dude.L,
            _type: 'pitcherCareerStats',
            pitcher: {_type: 'reference', _ref: pitcher._id},
            person: {_type: 'reference', _ref: pitcher.person._id},
            games: dude.G,
            wins: dude.W,
            losses: dude.L,
            starts: dude.GS,
            completeGames: dude.CG,
            shutouts: dude.SHO,
            saves: dude.SV,
            ipOuts: dude.IPouts,
            hits: dude.H,
            er: dude.ER,
            hr: dude.HR,
            bb: dude.BB,
            so: dude.SO,
            baOpp: dude.BAOpp,
            era: dude.ERA,
            ibb: dude.IBB,
            wp: dude.WP,
            hbp: dude.HBP,
            bk: dude.BK,
            bfp: dude.BFP,
            gf: dude.GF,
            runs: dude.R,
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

