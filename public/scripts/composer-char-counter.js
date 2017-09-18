$(document).ready(function(){
  $('textarea').on('keyup', function(){
    let count = $(this).val().length;
    let counter = $('textarea').parent().find('.counter').text(140 - count);
    if (counter.text() < 0){
      $(counter).addClass('error');
    }
  });

});