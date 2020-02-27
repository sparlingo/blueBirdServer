export default {
  name: "hitterCareerStats",
  type: "document",
  title: "Hitter Career",
  fields: [
    {
      title: 'Person',
      name: 'person',
      type: 'reference',
      to: [{type: 'person'}]
    },
    {
      title: 'Hitter',
      name: 'hitter',
      type: 'reference',
      to: [{type: 'hitter'}]
    },
    {
      title: "Games",
      name: "games",
      type: "number"
    },
    {
      title: "At Bats",
      name: "atBats",
      type: "number"
    },
    {
      title: "Runs",
      name: "runs",
      type: "number"
    },
    {
      title: "Hits",
      name: "hits",
      type: "number"
    },
    {
      title: "Doubles",
      name: "doubles",
      type: "number"
    },
    {
      title: "Triples",
      name: "triples",
      type: "number"
    },
    {
      title: "Home Runs",
      name: "hr",
      type: "number"
    },
    {
      title: "RBI",
      name: "rbi",
      type: "number"
    },
    {
      title: "Stolen Bases",
      name: "sb",
      type: "number"
    },
    {
      title: "Caught Stealing",
      name: "cs",
      type: "number"
    },
    {
      title: "Strike Outs",
      name: "so",
      type: "number"
    },
    {
      title: "Intentional BB",
      name: "ibb",
      type: "number"
    },
    {
      title: "Hit by Pitch",
      name: "hbp",
      type: "number"
    },
    {
      title: "Sacrifice Hits",
      name: "sh",
      type: "number"
    },
    {
      title: "Sacrifice Flys",
      name: "sf",
      type: "number"
    },
    {
      title: "Ground into Double Plays",
      name: "gidp",
      type: "number"
    }
  ],
  preview: {
    select: {
      name: 'person.name',
      subtitle: 'year'
    },
    prepare(selection) {
      const {name, year} = selection
      return {
        title: name,
        subtitle: year
      }
    }
  }
}