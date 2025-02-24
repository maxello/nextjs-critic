// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const movies = [
  {
    id: "3fb3faa4-c54e-4fc6-9654-eac035e9a982",
    title: "The Substance",
    directedBy: "Coralie Fargeat",
    thumbnail: "/public/movies/substance.webp",
    images: [],
    description: "Have you ever dreamt of a better version of yourself? You. Only better in every way. You've got to try this new product. It changed my life."
  },
  {
    id: "c41d7385-aeeb-4dce-ad8e-e2ee06a78bbd",
    title: "Home Alone",
    directedBy: "Chris Columbus",
    thumbnail: "/public/movies/home-alone.webp",
    images: [],
    description: "Eight-year-old Kevin McCallister has become the man of the house, overnight! Accidentally left behind when his family rushes off on a Christmas vacation, Kevin gets busy decorating the house for the holidays. But he's not decking the halls with tinsel and holly. Two bumbling burglars are trying to break in, and Kevin's rigging a bewildering battery of booby traps to welcome them!"
  },
]

const reviews = [
  {
    customer_id: customers[0].id,
    movie_id: movies[0].id,
    score: 83,
    date: "2022-12-06",
    review: "All in all, this is probably the best production of the litany of Tolkien pre-Ring stories I’ve seen on the big screen and I’d count The Hobbit in that estimation. There is a part where it drags a little, and some moments that are campy (I blame those on the anime elements), but all in all, this is definitely something that I would recommend seeing on the big screen."
  },
  {
    customer_id: customers[1].id,
    movie_id: movies[0].id,
    score: 70,
    date: "2022-11-14",
    review: "Animation was a bit choppy at points, but it did have some fun set pieces. I over all enjoyed it. I personally don't understand all the complaints abouts 'girl boss' and stuff. She has the lowest kill count of all of her family and friendly combatants."
  },
  {
    customer_id: customers[4].id,
    movie_id: movies[0].id,
    score: 90,
    date: "2022-10-29",
    review: "Great movie! Story was great. Animation could have been better in certain scenes."
  },
  {
    customer_id: customers[3].id,
    movie_id: movies[0].id,
    score: 88,
    date: "2023-09-10",
    review: "It's not a perfect film but for major fans of the movie it will scratch the LOTR itch. Some of my favourite parts as follows. They reproduced the same style amazing panoramic shots of mountains and eagles in the sky. "
  },
  {
    customer_id: customers[5].id,
    movie_id: movies[0].id,
    score: 77,
    date: "2023-08-05",
    review: "A smartly written movie whose visual quality sadly suffers from budget constraints. It plays it fast-and-loose with the lore, but the writing is good enough that you can enjoy the story on its own merits."
  },
  {
    customer_id: customers[2].id,
    movie_id: movies[0].id,
    score: 10,
    date: "2022-11-14",
    review: "If Rings of Power is a sunken turd, this is a straggling floater. The shoddy animation is often horrendous and the story is just another woke subversive parasite. Avoid at all costs."
  },
];

export { users, customers, reviews, movies };
