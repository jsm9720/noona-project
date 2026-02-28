const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

function openSearchBox() {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
}

let newsList = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`,
  );

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;

  render();
};
const sideMenus = document.querySelectorAll(".side-menu-list button")
sideMenus.forEach(function (sideMenu){
  sideMenu.addEventListener("click", sideMenuFunction)
})

function sideMenuFunction(event){
  getNewsByCategory(event)
}

const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event)),
);

async function getNewsByCategory(event) {
  const category = event.target.textContent.toLowerCase()
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`
  );

  const response = await fetch(url);
  const data = await response.json();
  console.log(category);

  newsList = data.articles;
  render();
}

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`,
  );

  const response = await fetch(url);
  const data = await response.json();

  newsList = data.articles;
  render();
};

const render = () => {
  const newsHTML = newsList
    .map((news) => {
      let summary = "";
      if (!news.description) {
        summary = "내용없음";
      } else if (news.description.length > 200) {
        summary = news.description.substring(0, 200) + "...";
      } else {
        summary = news.description;
      }

      return `<div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size"
              src="${news.urlToImage || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?_=20200913095930"}"
              onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?_=20200913095930';"
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${summary}</p>
            <div>${news.source.name || "no source"} * ${moment(news.publishedAt).fromNow()}</div>
          </div>
        </div>`;
    })
    .join("");
  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
