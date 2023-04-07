export const fileConfig = {
  id: "1",
  name: "root",
  isFolder: true,
  parentId: null,
  items: [
    {
      id: "2",
      name: "Apps",
      isFolder: true,
      parentId: "1",
      items: [
        {
          id: "3",
          name: "nested folder",
          isFolder: true,
          parentId: "2",
          items: [
            {
              id: "4",
              name: "index.html",
              isFolder: false,
              parentId: "3",
              items: []
            },
            {
              id: "5",
              name: "hello.html",
              isFolder: false,
              parentId: "3",
              items: []
            }
          ]
        },
        {
          id: "6",
          name: "nested file.txt",
          isFolder: false,
          parentId: "2",
          items: []
        }
      ]
    },
    {
      id: "7",
      name: "Pictures",
      isFolder: true,
      parentId: "1",
      items: [
        {
          id: "8",
          name: "App.js",
          isFolder: false,
          parentId: "7",
          items: []
        },
        {
          id: "9",
          name: "Index.js",
          isFolder: false,
          parentId: "7",
          items: []
        },
        {
          id: "10",
          name: "styles.css",
          isFolder: false,
          parentId: "7",
          items: []
        }
      ]
    },
    {
      id: "11",
      name: "Videos",
      isFolder: true,
      parentId: "1",
      items: []
    },
    {
      id: "12",
      name: "Docs",
      isFolder: true,
      parentId: "1",
      items: []
    },
    {
      id: "13",
      name: "budget.pdf",
      isFolder: false,
      parentId: "1",
      items: []
    },
    {
      id: "14",
      name: "profile.jpg",
      isFolder: false,
      parentId: "1",
      items: []
    },
    {
      id: "15",
      name: "Test Folder",
      isFolder: true,
      parentId: "1",
      items: []
    },
    {
      id: "16",
      name: "New Folder",
      isFolder: true,
      parentId: "1",
      items: []
    }
  ]
};
