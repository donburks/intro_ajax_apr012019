const handlers = {
  makePost: (post) => {
    const article = $("<article>");
    $("<header>").text(post.title).appendTo(article);
    $("<main>").text(post.body).appendTo(article);
    $.getJSON(`https://jsonplaceholder.typicode.com/users/${post.userId}`, (userData) => {
      handlers.getUserData(userData, article);
    });
  },
  getUserData: (userData, article) => {
    $("<footer>").text(`Written by ${userData.name} (${userData.email})`).appendTo(article);
    article.appendTo("section");
  },
  getPosts: (data) => {
    $("section").empty();
    data.slice(0, 10).forEach(handlers.makePost);
  },
  btnClick: () => {
    $.getJSON('https://jsonplaceholder.typicode.com/posts', handlers.getPosts);
    /*
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET',
      dataType: 'json',
      success: getPosts,
      failure: (error) => {
        $("<p>").text(error.message).appendTo("section");
      }
    });
   */
  }
};

$(() => {
  $("#getPostBtn").on('click', handlers.btnClick);
});
