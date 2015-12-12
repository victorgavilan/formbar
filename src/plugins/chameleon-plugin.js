vBar.plugins.chameleon = {
    init: function(){

        //Set color of bar as gradient
        var bar = this.getBar();
       
        bar.style.background = this.colors[0];
        this.chameleon_currentColor = null;
    },
    update: function chameleonUpdate(ev) {
       
      var bar = ev.bar,
          _currentColor = this.chameleon_currentColor,
          percentage = ev.percentage,
          indexColor = (percentage === 0 ) ? 0 : Math.round( ( (percentage/100) * this.colors.length ) - 1 );

          bar.style.width = percentage + "%";
          
          //Only update if there is a color change
          if (_currentColor != indexColor ) {
	          this.chameleon_currentColor = indexColor;
  	        bar.style.background = this.colors[ indexColor ];
          }
    }
};


