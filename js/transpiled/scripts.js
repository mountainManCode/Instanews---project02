'use strict';

$(document).ready(function () {

  $('#selectArticle').on('change', function () {

    var selectArticle = $(this).val();

    $('#newsArticles').empty();

    $('header').removeClass('header__large').addClass('header__small');

    $('#loader').show();

    var url = 'https://api.nytimes.com/svc/topstories/v2/' + selectArticle + '.json';
    url += '?' + $.param({ 'api-key': 'bf7509976e704a8e9e899853b9a17f98'
    });

    $.ajax({
      url: url,
      method: 'GET'
    }).done(function (data) {

      // $('#loader').hide();

      data.results.filter(function (item) {
        return item.multimedia.length !== 0;
      }).slice(0, 12).forEach(function (value) {

        var outputAbstract = value.abstract;
        var outputUrl = value.url;
        var imageQuality = value.multimedia.length - 1;
        var outputImage = value.multimedia[imageQuality].url;

        $('#newsArticles').append('<a href="' + outputUrl + '" class="article__clips" style="background-image: url(' + outputImage + ')"><p class="article__abstract">' + outputAbstract + '</p></a>');
      });
    }).fail(function (err) {
      $('.newsArticles').html('Your request can not be processed, please try refreshing the page.');
      throw err;
    }).always(function () {
      $('#loader').hide();
    });
  });
});