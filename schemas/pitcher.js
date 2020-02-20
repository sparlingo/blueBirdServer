export default {
  name: 'pitcher',
  title: 'Pitcher',
  type: 'document',
  fields: [
    {
      title: 'Person',
      name: 'person',
      type: 'reference',
      to: [{type: 'person'}]
    },
    {
      title: 'Pitching Hand',
      name: 'hand',
      type: 'text'
    },
    {
      title: 'Starter?',
      name: 'startOrRelief',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      name: 'person.name',
      startOrRelief: 'startOrRelief',
      media: 'person.profile'
    },
    prepare(selection) {
      const {name, startOrRelief, profile} = selection
      return {
        title: name,
        subtitle: `${startOrRelief}`,
        profile
      }
    }
  }
}
