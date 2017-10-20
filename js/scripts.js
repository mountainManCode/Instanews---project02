$(document).ready(function () {
// Built by LucyBot. www.lucybot.com

$('#selectedStories').on('change', function(){



  var selectedStories = $(this).val();

  $("#stories").empty();

  //$('#stories').toggle('class="loading">');
  
    //console.log(selectedStories);

  var url = "https://api.nytimes.com/svc/topstories/v2/" + selectedStories + ".json";
  url += '?' + $.param({
    'api-key': "bf7509976e704a8e9e899853b9a17f98"
  });
  
  $.ajax({
    url: url,
    method: 'GET',
  })
  
  .done(function(data) {
  

    // var multimedia = value.multimedia.filter(function(multimedia) {
    //   return multimedia.length > 1;
    // });

    $.each(data.results.filter(function(item) {
        return item.multimedia.length !== 0;})
        .slice(0, 12), function(index, value) {
      //console.log(data.results); 

      var outputTitle = value.title;
      var outputImage = '<img src="' + value.multimedia[3].url + '">';
      var outputAbstract = value.abstract;
      var outputUrl = value.url;

          $('#stories').append('<li>' + '<h2>' + '<a href="' + value.url + '">' + outputTitle + '</h2>' + outputImage + '<p>' + outputAbstract +'</a>' + '</p>' + outputUrl + '</li>');
    });
  
  }).fail(function(err) {
    throw err;
  });
});
});