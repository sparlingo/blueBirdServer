export default {
  name: 'hitter',
  title: 'Hitter',
  type: 'object',
  fields: [
    {
      title: 'Person',
      name: 'person',
      type: 'reference',
      to: [{type: 'person'}]
    },
    {
      title: 'Bats Left?',
      name: 'batsLeft',
      type: 'boolean'
    },
    {
      title: 'Throws Left?',
      name: 'throwsLeft',
      type: 'boolean'
    },
    {
      title: 'Position',
      name: 'position',
      type: 'text'
    }
  ],
  preview: {
    select: {
      name: 'person.name',
      position: 'position',
      media: 'person.profile'
    },
    prepare(selection) {
      const {name, position, profile} = selection
      return {
        title: name,
        subtitle: `${position}`,
        profile
      }
    }
  }
}