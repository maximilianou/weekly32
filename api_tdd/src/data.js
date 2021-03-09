/* src/data.js */
const Users = [
  {
    id: 1,
    name: "Maximiliano Usich",
    email: "maximilianou@gmail.com",
    posts: [
      {
        id: 1,
        title: "Installing Linux Debian in a Pendrive",
        published: true,
        link: "https://maximilianou.blogspot.com/2017/08/install-debian-9-pendrive-java-web-sql.html",
        author: 1
      },
      {
        id: 2,
        title: "Typescript Minimal React Shopping Cart Sample",
        published: true,
        link: "https://maximilianou.blogspot.com/2021/02/typescript-react-sample-code-minimal.html",
        author: 1
      },
      
    ]
  },
  {
    id: 2,
    name: "Kent Beck",
    email: "tdd@gmail.com",
    posts: [
      {
        id: 3,
        title: "Planning Extreme Programming",
        published: true,
        link: "https://www.amazon.com/s?k=9780201710915",
        author: 2
      },
      {
        id: 4,
        title: "Test Driven Development: By Example",
        published: true,
        link: "https://www.amazon.com/s?k=9780321146533",
        author: 2
      },
    ]
  }
];

module.exports = { Users };

