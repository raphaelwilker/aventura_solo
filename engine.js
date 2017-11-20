$(document).ready(function(){
  
  var navigation = 0;
  loadContent(navigation);  

});


function loadContent(navigation){
	
  $('.textArea').html(json[navigation].text);
  
  for(var i in json[navigation].options){
  	$('.listOptions').append(json[navigation].options[i].text);
  	$('.listOptions').find('a').eq(i).attr('data-goto',json[navigation].options[i].goto);
  	$('.listOptions').find('a').eq(i).on('click',function(){
  		goto($(this).attr('data-goto'));
  	});
  }	
}

function refresh(){
	
	$('.textArea').html("");	
	$('.listOptions').html("");
}

function goto(param){

	refresh();
	navigation = param;
	loadContent(navigation);
}