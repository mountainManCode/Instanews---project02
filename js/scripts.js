$(document).ready(() => {

$('#selectArticle').on('change', function() {

  const selectArticle = $(this).val();

  $('#newsArticles').empty();

  $('header').removeClass('header__large').addClass('header__small');

  $('#loader').show();
  
  let url = 'https://api.nytimes.com/svc/topstories/v2/' + selectArticle + '.json';
  url += '?' + $.param({ 'api-key': 'bf7509976e704a8e9e899853b9a17f98'
  });
  
  $.ajax({
    url: url,
    method: 'GET',
  })
  .done((data) => {

    $('#loader').hide();

    $.each(data.results.filter((item) => {
        return item.multimedia.length !== 0;})
        .slice(0, 12), (index, value) => {

      const outputAbstract = value.abstract;
      const outputUrl = value.url;

      $('#newsArticles').append(`<a href="${outputUrl}" class="article__clips" style="background-image: url(${value.multimedia[4].url})"><p>${outputAbstract}</p></a>`);
      });

  }).fail((err) => {
      throw err;
    }); 
});
});