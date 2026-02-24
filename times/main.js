let news = []
 const getLatestNews = async () => {
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=손흥민`);

    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log(" dddd", news);
}

getLatestNews();