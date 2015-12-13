vBar.plugins.chameleon = {
    init: function(){

      //Set color of bar as gradient
      var bar = this.getBar();
     
      bar.style.background = this.colors[0];
      if (this.striped){
    		bar.style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.30) 10px, transparent 10px, transparent 20px, rgba(0, 0, 0, 0.20) 20px)';
    	}

      
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
  	        bar.style.backgroundColor = this.colors[ indexColor ];
          }
    }
};


