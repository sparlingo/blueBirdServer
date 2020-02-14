export default {
  name: "hitter",
  type: "document",
  title: "Hitter",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string"
    },
    {
      title: "Baseball Reference ID",
      name: "bbrefId",
      type: "string"
    },
    {
      title: "Bats Left?",
      name: "batsLeft",
      type: "boolean"
    },
    {
      title: "Throws Left?",
      name: "throwsLeft",
      type: "boolean"
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