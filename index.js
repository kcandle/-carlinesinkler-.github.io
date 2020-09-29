  var $ = jQuery;
  $(function(){
    "use strict";

    var container = document.querySelector('.post-grid'); 


    container.addEventListener('click', function(e){
        if(e.target != e.currentTarget){
          e.preventDefault();

          var target_url = $(this).attr('href');
        var scrollposition = $(document).scrollTop();
        $('#scroll-position').val(scrollposition);


        var data = e.target.getAttribute('data-name'),
            url = e.target.getAttribute('data-target');


            //current title
            $('#home-title').val(document.title);

            console.log(document.title);

            //article title
            var articleTitle = e.target.getAttribute('data-title')+ ' | Carline Sinkler'
            $('#article-title').val(articleTitle);



            loadArticle(url);
            document.title = articleTitle;

            history.pushState(data, null, url);
            //document.title = articleTitle;

        }
        e.stopPropagation();
      }, false);


    window.addEventListener('popstate', function(e){

        var character = e.state;

        if (character == null) {

          document.title = 'Default title';
          backCategory();

          document.title = $('#home-title').val();

        } else {

          forwardArticle();
          document.title = $('#article-title').val();

        }
    });

    function backCategory(){
      $('#main #temp-container').fadeOut('slow', function() {

            $('#main #save-grid').fadeIn('fast', function() {
              $(document).scrollTop($('#scroll-position').val());
            });


        });
    }

    function forwardArticle(){

      $('#main #save-grid').fadeOut('slow', function() {
            $('#main #temp-container').fadeIn('fast');
        });
        $(document).scrollTop(0);
    }

    function loadArticle(target_url){
      $.ajax({
          url: target_url,
          beforeSend: function(){
            $('#main #save-grid').fadeOut('slow', function(){
              $('#main #secondary').hide();
            $('#loading').fadeIn('slow');
          });
        },
          success:function(data) {

            //$('#post_content').html(data);
            $('#main #temp-container').html($(data).find('#primary').html());
            //$('#main #secondary').html();

            $('#loading').fadeOut('slow', function(){
              $('#main #temp-container').show();
              $('#main #secondary').show();
              //$('#main #secondary').html();
              //$('#main #secondary', $.parseHTML(data))
            });

            var url      = window.location.href;
          $('#forward-url').val(url);

          $(document).scrollTop(0);

          },
      });
    }
  });




