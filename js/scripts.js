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

      data.results.filter(function(item) {
          return item.multimedia.length !== 0;
        }).slice(0, 12).forEach(function(value) {
  
        const outputAbstract = value.abstract;
        const outputUrl = value.url;
        const imageQuality = value.multimedia.length -1;
        const outputImage = value.multimedia[imageQuality].url;

        $('#newsArticles').append(`<a href="${outputUrl}" class="article__clips" style="background-image: url(${outputImage})"><p class="article__abstract">${outputAbstract}</p></a>`);
      });
    })
      .fail((err) => {

       $('.newsArticles').html('Your request can not be processed, please try refreshing the page.');
        throw err;

        }).always(() => {

         $('#loader').hide();

        });
  });
});