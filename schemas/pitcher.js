export default {
  name: 'pitcher',
  title: 'Pitcher',
  type: 'object',
  fields: [
    {
      title: 'Person',
      name: 'person',
      type: 'reference',
      to: [{type: 'person'}]
    },
    
    {
      title: 'Lefty?',
      name: 'hand',
      type: 'boolean'
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
