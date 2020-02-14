export default {
  name: 'pitcher',
  type: "document",
  title: "Pitcher",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string"
    },
    {
      title: "Lefty?",
      name: "hand",
      type: "boolean"
    },
    {
      title: "Starter?",
      name: "startOrRelief",
      type: "boolean"
    },
    {
      title: "Baseball Reference ID",
      name: "bbrefId",
      type: "string"
    },
    {
      title: "Baseball Reference URL",
      name: "bbrefUrl",
      type: "url"
    },
    {
      title: "Head Shot",
      name: "profile",
      type: "image"
    }
  ]
}
