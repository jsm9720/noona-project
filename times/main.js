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

const sideMenus = document.querySelectorAll(".side-menu-list button");
sideMenus.forEach(function (sideMenu) {
  sideMenu.addEventListener("click", sideMenuFunction);
});

function sideMenuFunction(event) {
  getNewsByCategory(event);
}

const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event)),
);

let url = new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`,
);

let totalResults = 0;
let page = 1;
const pageSize = 11;
const groupSize = 5;

let getNews = async () => {
  try {
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

let newsList = [];
const getLatestNews = () => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`,
  );
  
  getNews();
};

async function getNewsByCategory(event) {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`,
  );
  page = 1;
  getNews();
}

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`,
  );
  page = 1;
  getNews();
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class= "alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }

  let firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  if (lastPage === totalPages && lastPage - (groupSize - 1) > 0){
    firstPage = totalPages - groupSize + 1
  }

  let paginationHTML = ``
  if (page !== 1) {
    paginationHTML = `<li class="page-item"><a class="page-link" onclick="moveToPage(${1})" href="#"><<</a></li>`;
    paginationHTML += `<li class="page-item"><a class="page-link" onclick="moveToPage(${page-1})" href="#"><</a></li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${i === page ? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`;
  }
  if (page !== totalPages){
    paginationHTML += `<li class="page-item"><a class="page-link" onclick="moveToPage(${page+1})" href="#">></a></li>`
    paginationHTML += `<li class="page-item"><a class="page-link" onclick="moveToPage(${totalPages})" href="#">>></a></li>`;
  }
  
  document.querySelector(".pagination").innerHTML = paginationHTML;

  // <nav aria-label="Page navigation example">
  // <ul class="pagination">
  //   <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  //   <li class="page-item"><a class="page-link" href="#">1</a></li>
  //   <li class="page-item"><a class="page-link" href="#">2</a></li>
  //   <li class="page-item"><a class="page-link" href="#">3</a></li>
  //   <li class="page-item"><a class="page-link" href="#">Next</a></li>
  // </ul>
  // </nav>
};

const moveToPage = (pageNum) => {
  // console.log("movetopage", pageNum);
  page = pageNum;
  getNews();
};

getLatestNews();
