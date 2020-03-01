export default {
  name: "pitcherCareerStats",
  type: "document",
  title: "Pitcher Career",
  fields: [
    {
      title: 'Person',
      name: 'person',
      type: 'reference',
      to: [{type: 'person'}]
    },
    {
      title: 'Pitcher',
      name: 'pitcher',
      type: 'reference',
      to: [{type: 'pitcher'}]
    },
    {
      title: 'Games',
      name: 'games',
      type: 'number'
    },
    {
      title: 'Wins',
      name: 'wins',
      type: 'number'
    },
    {
      title: 'Losses',
      name: 'losses',
      type: 'number'
    },
    {
      title: 'Starts',
      name: 'starts',
      type: 'number'
    },
    {
      title: 'Complete Games',
      name: 'completeGames',
      type: 'number'
    },
    {
      title: 'Shutouts?',
      name: 'shutouts',
      type: 'number'
    },
    {
      title: 'Saves',
      name: 'saves',
      type: 'number'
    },
    {
      title: 'IP Outs',
      name: 'ipOuts',
      type: 'number'
    },
    {
      title: 'Hits',
      name: 'hits',
      type: 'number'
    },
    {
      title: 'Earned Runs',
      name: 'er',
      type: 'number'
    },
    {
      title: 'Home Runs',
      name: 'hr',
      type: 'number'
    },
    {
      title: 'Walks',
      name: 'bb',
      type: 'number'
    },
    {
      title: 'Strikeouts',
      name: 'so',
      type: 'number'
    },
    {
      title: 'Opponent BA',
      name: 'baOpp',
      type: 'number'
    },
    {
      title: 'ERA',
      name: 'era',
      type: 'number'
    },
    {
      title: 'Intentional Walks',
      name: 'ibb',
      type: 'number'
    },
    {
      title: 'Wild Pitches',
      name: 'wp',
      type: 'number'
    },
    {
      title: 'Hit Batters',
      name: 'hbp',
      type: 'number'
    },
    {
      title: 'Balks',
      name: 'bk',
      type: 'number'
    },
    {
      title: 'Batters Faced',
      name: 'bfp',
      type: 'number'
    },
    {
      title: 'Games Finished',
      name: 'gf',
      type: 'number'
    },
    {
      title: 'Runs',
      name: 'runs',
      type: 'number'
    },
    {
      title: 'Sacrifice Hit',
      name: 'sh',
      type: 'number'
    },
    {
      title: 'Sacrifice Fly',
      name: 'sf',
      type: 'number'
    },
    {
      title: 'Double Plays',
      name: 'gidp',
      type: 'number'
    }
  ],
  preview: {
    select: {
      title: 'person.name',
      subtitle: 'year'
    }
  },
  prepare(selection) {
    const {name, year} = selection
    return {
      title: name,
      subtitle: year
    }
  }
}