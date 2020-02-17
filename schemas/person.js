export default {
  title: 'Person',
  name: 'person',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Please use "Firstname Lastname" format'
    },
    {
      title: 'Baseball Reference ID',
      name: 'bbrefId',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 20
      }
    },
    {
      name: 'profile',
      title: 'Profile Pic',
      type: 'image',
      options: {
      }
    },
    {
      name: 'height',
      title: 'Height',
      type: 'number'
    },
    {
      name: 'weight',
      title: 'Weight',
      type: 'number'
    },
    {
      name: 'debut',
      title: 'MLB Debut',
      type: 'date'
    },
    {
      name: 'finalGame',
      title: 'Final MLB Game',
      type: 'date'
    }
  ],
  preview: {
    select: {title: 'name', media: 'profile', subtitle: 'bbrefId'}
  },
}