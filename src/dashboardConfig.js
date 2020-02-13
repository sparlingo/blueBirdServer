export default {
  widgets: [
      {
      name: 'netlify',
      options: {
        title: 'My Netlify BBB deploys',
        sites: [
          {
            title: 'BBB Server',
            apiId: 'b275fa9c-5c8d-40c2-a2ba-560a8492b010',
            buildHookId: '5e4521f07b52157406ea8b72',
            name: 'bbbserver',
          },
          {
            title: 'BBB Client',
            apiId: '33c00dd0-6663-4688-9e4f-6ee3af25f833',
            buildHookId: '5e45299880a391f1329be5ea',
            name: 'bluebirdbarter'
          }
        ]
      }
    }
  ]
}