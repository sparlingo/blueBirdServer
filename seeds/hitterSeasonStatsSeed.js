const sanityClient = require('@sanity/client')
const fetch = require('node-fetch')

const client = sanityClient({
  projectId: '9rty98wh',
  dataset: 'development',
  token: 'skvJuVk9SRNWvvpRQK0Z1vmNkhCR6yOYaI7RF4ay9N98tR9g4ac2K3zBRW4X7o5iB4UONrZsgUpM8Aj93FvB95YaYE7ClXXtEHBMFgU2C4ncTtOxwoVCtp0A7UnK4hEoss4WatfW93t68jHoIEQ64DvnW9oQKPh5UQOvboePKYtZgGCMKss6',
  useCdn: false
})

const currentHittersQuery = '*[_type == "hitter"]{..., person->}'

fetch('http://127.0.0.1:4000/hitters/').then(res => res.json())
.then(allTimeHitters => {
  client.fetch(currentHittersQuery).then(currentHitters => {
    let allSeasons = []
    currentHitters.forEach(hitter => {
      for(let dude of allTimeHitters) { // dude is from munenori, hitter is from sanity
        if(dude.playerID === hitter.person.bbrefId) {
          allSeasons.push({
            _id: dude.playerID + '-' + dude.stint + dude.G + dude.HBP + dude.atBats + dude.RBI + dude.SB + '-' + dude.yearID,
            _type: 'hitterSeasonStats',
            hitter: {_type: 'reference', _ref: hitter._id},
            person: {_type: 'reference', _ref: hitter.person._id},
            year: parseInt(dude.yearID),
            games: dude.G,
            atBats: dude.AB,
            runs: dude.R,
            hits: dude.H,
            doubles: dude.doubles,
            triples: dude.triples,
            hr: dude.HR,
            rbi: dude.RBI,
            sb: dude.SB,
            bb: dude.BB,
            cs: dude.CS,
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
    //console.log(allSeasons)
    return allSeasons
  })
  .then(allSeasons => {
    let transaction = client.transaction()
    allSeasons.forEach(doc => {
      transaction.createIfNotExists(doc)
    })
    console.log(transaction)
    //return transaction
    return transaction.commit()
  })
})
.catch(error => {
  console.log(error)
})