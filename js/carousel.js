var A_ARAI = A_ARAI || {};
A_ARAI.SAMPLE = {};

A_ARAI.SAMPLE.CAROUSEL = function($carouselWrap, $slideContents, $left, $right){
  this.$carouselWrap = $carouselWrap;
  this.$slideContents = $slideContents;
  this.$left = $left;
  this.$right =$right;

  this.init();
};
A_ARAI.SAMPLE.CAROUSEL.prototype = {
  SLIDE_TIME : 300,

  init: function() {
    this.setParameters();
    this.insertNav();
    this.insertImg();
    this.bindEvent();
  },
  setParameters : function(){
    this.$container = $('.container');
    this.imgWidth = this.$slideContents.width();
    this.imgLength = this.$slideContents.length;
    this.lastImgPosition = this.imgWidth * (this.imgLength) * -1;
    this.containerPosition = 0;

  },
  insertImg: function(){
    this.$container.append(this.$slideContents.eq(0).clone());
  },
  insertNav: function(){
    this.$carouselWrap.append('<div class="carouselNav"></div>');
    this.$carouselNav = $('.carouselNav');
    for(var i = 0; i < this.imgLength; i++) {
      this.$carouselNav.append('<span>'+(i+1)+'</span>');
    }
    this.$navBtn = this.$carouselNav.find('span');
    this.$navBtn.eq(0).addClass('curNav');
  },
  bindEvent: function() {
    var _self = this;
    this.$left.on('click', $.proxy(this.moveToLeft, this));
    this.$right.on('click', $.proxy(this.moveToRight, this));
    this.$navBtn.on('click', function(){
      _self.moveToNav($(this));
    });
  },
  moveToLeft : function(){
    this.moveContainer(-this.imgWidth, 'left');
  },
  moveToRight : function(){
    this.moveContainer(this.imgWidth, 'right');
  },
  moveToNav : function($this) {
    if ( this.$container.is(':animated') ) {
      return;
    }
    var navIndex = $this.index();
    this.removeCurClass();
    $this.addClass('curNav');
    this.$container.animate({'left': -(navIndex * this.imgWidth)}, this.SLIDE_TIME);
  },
  removeCurClass : function () {
    this.$slideContents.removeClass('cur');
    this.$navBtn.removeClass('curNav');
  },
  addCurClass :function(TARGETINDEX) {
    this.$slideContents.eq(TARGETINDEX).addClass('cur');
    this.$navBtn.eq(TARGETINDEX).addClass('curNav');
  },
  getCurrentImgIndex :function(offset) {
    this.removeCurClass();
    var index = Math.abs((this.containerPosition + offset) / this.imgWidth);

    this.setClass(index);
  },
  setClass : function(INDEX) {
    if(this.imgLength  > INDEX) {
      this.addCurClass(INDEX);
    } else {
      this.addCurClass(0);
    }
  },
  moveContainer: function(offset, turn) {
    if ( this.$container.is(':animated') ) {
      return;
    }
    this.containerPosition = this.$container.position().left;

    if ( turn == 'left' && this.containerPosition == this.lastImgPosition ) {
      this.$container.css('left', 0);
      this.containerPosition = this.$container.position().left;
    } else if ( turn =='right' && this.containerPosition === 0 ) {
      this.$container.css('left', this.lastImgPosition);
      this.containerPosition = this.$container.position().left;
    }
    this.$container.animate({'left': this.containerPosition + offset}, this.SLIDE_TIME);
    this.getCurrentImgIndex(offset);
  }
};

$(window).on('load', function(){
  new A_ARAI.SAMPLE.CAROUSEL($('.carouselWrapper'), $('.container').find('li'), $('#jsiLeft'), $('#jsiRight'));
});