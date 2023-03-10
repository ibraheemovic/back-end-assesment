const fortunes = [
  {
    user: `unon`,
    fortune: [
      `Be careful what you wish for, because you might just get it`,
      `The path less followed may lead to treasures unfound`,
      `Expectations can kill a simple man`,
      `The wind may blow with the force of the sea, but the mountain remains unmoved`,
      `A lifetime friend shall soon be made`,
      `A lifetime of happiness lies ahead of you`,
      `A light heart carries you through all the hard times`,
      `A new perspective will come with the new year`,
      `A person is never too old to learn`,
    ],
  },
];

const compliments = [
  "Gee, you're a smart cookie!",
  "Cool shirt!",
  "Your Javascript skills are stellar.",
];

module.exports = {
  getAllFortune: (req, res) => {
    res.status(200).send(fortunes);
  },

  getFortune: (req, res) => {
    const rand = Math.floor(Math.random() * fortunes.length);
    const randUser = { ...fortunes[rand] };
    res.status(200).send(randUser);
  },

  addFortune: (req, res) => {
    let { user, fortune } = req.body;
    for (let i = 0; i < fortunes.length; i++) {
      if (user === fortunes[i].user) {
        let userFortune = { ...fortunes[i] };
        console.log(userFortune);
        userFortune.fortune.push(fortune);
        res.status(200).send(userFortune);
        return;
      }
    }
    let newUser = {
      user,
      fortune,
    };

    fortunes.push(newUser);
    console.log(`Fortune added`);
    res.status(200).send(newUser);
  },

  deleteUser: (req, res) => {
    let { user } = req.params;
    for (let i = 0; i < fortunes.length; i++) {
      if (user === fortunes[i].user) {
        fortunes.splice(i, 1);
        res.status(200).send(fortunes);
        return;
      }
    }
    res.status(404).send(`User Not Found`);
  },
  getCompliment: (req, res) => {
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },
};
