$( document ).ready(function() {
  var $main = $( '#pt-main' ),
    $pages = $main.children( 'div.c-page' ),
    $iterate = $( '.js-btn-next' ),
    $iterateBack = $( '.js-btn-prev' ),
    animcursor = parseInt(getParam('p')) || parseInt(getParam('page')) || 0,
    cursorDirection = 1,      // multiplier for forward (1) or back (-1)
    pagesCount = $pages.length,
    current = animcursor,
    isAnimating = false,
    endCurrPage = false,
    endNextPage = false,
    animEndEventNames = {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'OAnimation' : 'oAnimationEnd',
    'msAnimation' : 'MSAnimationEnd',
    'animation' : 'animationend'
  },
  // animation end event name
  animEndEventName = animEndEventNames[ 'animation' ],
    // supportAnimations css animations
    supportAnimations = true,
    animations = {
    max: 1
  },
  keys = {
    DOWN: 40,
    ENTER: 13,
    LEFT: 37,
    RIGHT: 39,
    PAGE_DOWN: 34,
    PAGE_UP: 33
  };

  function renderCurrentPage() {
    if (getParam('debug') === 'true') {
      $('.c-current-page').addClass('c-current-page--dark').text(current + " => " + slides[current] + ".slim");
    } else {
      $('.c-current-page').text(current);
    }
  }
  renderCurrentPage();

  function getParam(param) {
    var params={};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {
      params[key] = value;
    });
    return params[param];
  }

  function init() {
    $( "body" ).keyup(function(event) {
      var key = event.which;

      if ( key == keys.RIGHT || key == keys.ENTER || key == keys.DOWN || key == keys.PAGE_DOWN ) {
        moveToNextPage();
      }
      if ( key == keys.LEFT || key == keys.PAGE_UP ) {
        moveToPrevPage();
      }
    });


    $pages.each( function() {
      var $page = $( this );
      $page.data( 'originalClassList', $page.attr( 'class' ) );
    } );

    $pages.eq( current ).addClass( 'c-page-current' );

    function moveToNextPage() {
      cursorDirection = 1;
      animcursor += cursorDirection;
      nextPage( animcursor );
    }

    function moveToPrevPage() {
      cursorDirection = -1;
      animcursor += cursorDirection;
      nextPage( animcursor );
    }

    $iterate.on( 'click', function() {
      moveToNextPage();
    } );
    $iterateBack.on( 'click', function() {
      moveToPrevPage();
    } );

  }

  function nextPage(options ) {
    var animation = (options.animation) ? options.animation : options;

    if( isAnimating ) {
      return false;
    }

    isAnimating = true;

    var $currPage = $pages.eq( current );

    current += cursorDirection;
    if( cursorDirection == 1 && current >= pagesCount ) {
      current = 0;
    }
    if( cursorDirection == -1 && current < 0 ) {
      current = pagesCount - 1;
    }

    renderCurrentPage();

    var $nextPage = $pages.eq( current ).addClass( 'c-page-current' ),
      outClass = '', inClass = '';

    if (cursorDirection == 1) {
      outClass = 'c-page-moveToLeft';
      inClass = 'c-page-moveFromRight';
    } else {
      outClass = 'c-page-moveToRight';
      inClass = 'c-page-moveFromLeft';
    }

    $currPage.addClass( outClass ).on( animEndEventName, function() {
      $currPage.off( animEndEventName );
      endCurrPage = true;
      if( endNextPage ) {
        onEndAnimation( $currPage, $nextPage );
      }
    } );

    $nextPage.addClass( inClass ).on( animEndEventName, function() {
      $nextPage.off( animEndEventName );
      endNextPage = true;
      if( endCurrPage ) {
        onEndAnimation( $currPage, $nextPage );
      }
    } );

    if( !supportAnimations ) {
      onEndAnimation( $currPage, $nextPage );
    }
  }

  function onEndAnimation( $outpage, $inpage ) {
    endCurrPage = false;
    endNextPage = false;
    resetPage( $outpage, $inpage );
    isAnimating = false;
  }

  function resetPage( $outpage, $inpage ) {
    $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
    $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' c-page-current' );
  }

  init();
});
