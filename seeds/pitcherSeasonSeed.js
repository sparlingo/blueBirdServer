const sanityClient = require('@sanity/client')
const fetch = require('node-fetch')

const client = sanityClient({
  projectId: '9rty98wh',
  dataset: 'development',
  token: 'skvJuVk9SRNWvvpRQK0Z1vmNkhCR6yOYaI7RF4ay9N98tR9g4ac2K3zBRW4X7o5iB4UONrZsgUpM8Aj93FvB95YaYE7ClXXtEHBMFgU2C4ncTtOxwoVCtp0A7UnK4hEoss4WatfW93t68jHoIEQ64DvnW9oQKPh5UQOvboePKYtZgGCMKss6',
  useCdn: false
})

const currentPitchersQuery = '*[_type == "pitcher"]{..., person->}'

fetch('http://127.0.0.1:4000/pitchers/').then(res => res.json())
.then(seasons => {
  client.fetch(currentPitchersQuery).then(currentPitchers => {
    let allPitchers = []
    currentPitchers.forEach(pitcher => { //from sanity, an existing pitcher
      for(let season of seasons) { //from munenori, every pitching season ever
        //console.log(season)
        if (season.playerID === pitcher.person.bbrefId) {
          allPitchers.push({
            _id: pitcher.person.bbrefId + '-' + pitcher.person.height + pitcher.hand + pitcher.person.weight + season.G + '-' + season.yearID,
            _type: 'pitcherSeason',
            pitcher: {_type: 'reference', _ref: pitcher._id},
            person: {_type: 'reference', _ref: pitcher.person._id},
            year: parseInt(season.yearID),
            games: season.G,
            wins: season.W,
            losses: season.L,
            starts: season.GS,
            completeGames: season.CG,
            shutouts: season.SHO,
            saves: season.SV,
            ipOuts: season.IPouts,
            hits: season.H,
            er: season.ER,
            hr: season.HR,
            bb: season.BB,
            so: season.SO,
            baOpp: season.BAOpp,
            era: season.ERA,
            ibb: season.IBB,
            wp: season.WP,
            hbp: season.HBP,
            bk: season.BK,
            bfp: season.BFP,
            gf: season.GF,
            runs: season.R,
            sh: season.SH,
            sf: season.SF,
            gidp: season.GIDP
          })
        }
      }
    })
    //console.log(allPitchers)
    return allPitchers
  })
  .then(allPitchers => {
    //console.log(allPitchers)
    let transaction = client.transaction()
    allPitchers.forEach(doc => {
      transaction.createOrReplace(doc)
    })
    console.log(transaction)
    return transaction.commit()
  })
})
.catch(error => {
  console.log(error)
})