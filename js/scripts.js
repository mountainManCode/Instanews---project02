$(document).ready(function () {
// Built by LucyBot. www.lucybot.com

$('#selectArticle').on('change', function(){

  var selectArticle = $(this).val();

  $("#articles").empty();

  $('#loader').show();
  
    //console.log(selectArticle);

  var url = "https://api.nytimes.com/svc/topstories/v2/" + selectArticle + ".json";
  url += '?' + $.param({
    'api-key': "bf7509976e704a8e9e899853b9a17f98"
  });
  
  $.ajax({
    url: url,
    method: 'GET',
  })
  
  .done(function(data) {

    $('#loader').hide();

    $.each(data.results.filter(function(item) {
        return item.multimedia.length !== 0;})
        .slice(0, 12), function(index, value) {
      //console.log(data.results); 

      // var outputTitle = value.title;
      // var outputImage = '<img src="' + value.multimedia[4].url + '">';
      var outputAbstract = value.abstract;
      var outputUrl = value.url;

          $('#articles').append('<li class="article__clips" style="background-image: url(' + value.multimedia[4].url + ')">' + '<a href="' + outputUrl + '">' + '<p>' + outputAbstract + '</p>' + '</a>' + '</li>');
        });

  }).fail(function(err) {
    throw err;
  });
});
});
// $('#articles').append('<li class="articles_clips" style="background-image: url(' + value.multimedia[4].url + ')">' + '<a href="' + outputUrl + '">' + '<h2 class="article_titles">' + outputTitle + '</h2>' + '<p>' + outputAbstract + '</p>' + '</a>' + '</li>');