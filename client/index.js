const baseURL = `https://sg-monitoring-lab.herokuapp.com/api`;

const responseFormater = () => {
  document.querySelector(`#fortuneResponse`).className = `fortuneResponse`;
  document.querySelector(`#fortuneResponse`).innerHTML = ``;
};

const userCard = (userFortunes) => {
  responseFormater();
  console.log(userFortunes);
  let { user, fortune } = userFortunes;
  let header = document.createElement(`h2`);
  let body = document.createElement(`ul`);

  header.textContent = user;
  fortune.forEach((ele) => {
    let fortunes = document.createElement(`li`);
    fortunes.textContent = ele;
    body.appendChild(fortunes);
  });

  document.querySelector(`#fortuneResponse`).appendChild(header);
  document.querySelector(`#fortuneResponse`).appendChild(body);
};

const allUserCard = (userFortunes) => {
  if (userFortunes[0]) {
    responseFormater();
    userFortunes.forEach((ele) => {
      let { user, fortune } = ele;
      let header = document.createElement(`h2`);
      let body = document.createElement(`ul`);

      header.textContent = user;
      fortune.forEach((element) => {
        let fortunes = document.createElement(`li`);
        fortunes.textContent = element;
        body.appendChild(fortunes);
      });

      document.querySelector(`#fortuneResponse`).appendChild(header);
      document.querySelector(`#fortuneResponse`).appendChild(body);
    });
  } else {
    document.querySelector(`#fortuneResponse`).className = `hiden`;
  }
};

const randomFortune = (randUser) => {
  responseFormater();
  let { user, fortune } = randUser;
  let header = document.createElement(`h2`);
  let body = document.createElement(`ul`);
  let randFort = Math.floor(Math.random() * fortune.length);
  let fortunes = document.createElement(`li`);

  fortunes.textContent = fortune[randFort];
  header.textContent = user;

  body.appendChild(fortunes);
  document.querySelector(`#fortuneResponse`).appendChild(header);
  document.querySelector(`#fortuneResponse`).appendChild(body);
};

document.getElementById("complimentButton").onclick = function () {
  axios.get(`${baseURL}/compliment/`).then(function (response) {
    const data = response.data;
    alert(data);
  });
};

document.querySelector(`#allFortunesButton`).addEventListener(`click`, () => {
  axios
    .get(`${baseURL}/fortune`)
    .then((res) => allUserCard(res.data))
    .catch((error) => console.log(error));
});

document.querySelector(`#randomFortuneButton`).addEventListener(`click`, () => {
  axios.get(`${baseURL}/fortune/random`).then((res) => randomFortune(res.data));
});

document.querySelector(`#fortuneForm`).addEventListener(`submit`, (event) => {
  event.preventDefault();
  let user = event.target.querySelector(`#name`).value.toLowerCase().trim();
  let fortune = [event.target.querySelector(`#fortune`).value];
  let body = {
    user: user,
    fortune: fortune,
  };
  if (user && fortune[0]) {
    axios
      .post(`${baseURL}/fortune`, body)
      .then((res) => userCard(res.data))
      .catch((error) => console.log(error));
  } else {
    axios.get(`/formError`).catch((err) => console.log(err));
    alert(`Please Fill Out Both The Name And Fortune Textboxes`);
  }
});

document.querySelector(`#deleteForm`).addEventListener(`submit`, (event) => {
  event.preventDefault();
  let user = event.target
    .querySelector(`#deleteName`)
    .value.toLowerCase()
    .trim();
  axios
    .delete(`${baseURL}/fortune/${user}`)
    .then((res) => allUserCard(res.data))
    .catch((error) => {
      axios.post(`/deleteError`, { error }).catch((er) => console.log(er));
      alert(error);
    });
});
