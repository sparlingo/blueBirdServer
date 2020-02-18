export default {
  name: 'position',
  title: 'Position',
  type: 'document',
  fields: [
    {
      title: 'Position',
      name: 'name',
      type: 'text'
    },
    {
      title: 'Position #',
      name: 'positionNumber',
      type: 'number'
    },
    {
      title: 'Verbose Name',
      name: 'longName',
      type: 'text'
    },
    {
      title: 'Bats?',
      name: 'baysYorN',
      type: 'boolean'
    },
  ],
  preview: {
    select: {title: 'name'}
  },
}