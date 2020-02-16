export default {
  name: 'hitter',
  title: 'Hitter',
  type: 'document',
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
      type: 'reference',
      to: [{type: 'position'}]
    }
  ],
  preview: {
    select: {
      name: 'person.name',
      position: 'position.name',
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