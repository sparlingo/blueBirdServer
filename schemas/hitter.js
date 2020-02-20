export default {
  title: 'Hitter',
  name: 'hitter',
  type: 'document',
  fields: [
    {
      title: 'Person',
      name: 'person',
      type: 'reference',
      to: [{type: 'person'}]
    },
    {
      title: 'Bats?',
      name: 'bats',
      type: 'text'
    },
    {
      title: 'Throws?',
      name: 'throws',
      type: 'text'
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