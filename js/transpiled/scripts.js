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

      $('#loader').hide();

      data.results.filter(function (item) {
        return item.multimedia.length !== 0;
      }).slice(0, 12).forEach(function (value) {

        // data.results.filter(function(item) {
        //   return item.multimedia.length !== 0;
        // }).slice(0, 12).each(function() {

        // $.each(data.results.filter((item) => {
        //     return item.multimedia.length !== 0;
        //   }).slice(0, 12), (index, value) => {

        var outputAbstract = value.abstract;
        var outputUrl = value.url;
        // const outputImage = value.multimedia[4].url;

        $('#newsArticles').append('<a href="' + outputUrl + '" class="article__clips" style="background-image: url(' + value.multimedia[4].url + ')"><p class="article__abstract">' + outputAbstract + '</p></a>');
      });
    }).fail(function () {
      return 'Your request can not be processed.';
    });
  });
});