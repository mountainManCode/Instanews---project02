$(document).ready(function () {
// Built by LucyBot. www.lucybot.com

$('#selectedStories').on('change', function(){

  var selectedStories = $(this).val();
  
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
  
    $.each(data.results, function(index, value) {
      console.log(data.results); 
  
      var output = '<li>';
          output += value.title;
          //output += '<img src="' + value.multimedia[4].url + ''">',
         output += '</li>';
      
          $('#stories').append(output);
      
    });
   
  
  }).fail(function(err) {
    throw err;
  });

});
});