FormBar.plugins.chameleon = {
    init: function(){

        //Set color of bar as gradient
        var bar = this.getBar();
       
        bar.style.background = this.colors[0];
    },
    update: function chameleonUpdate() {

      chameleonUpdate._currentColor = null;
        
      var bar = this.getBar(),
          percentage = this.getPercentage(),
          indexColor = (percentage === 0 ) ? 0 : Math.round( ( (percentage/100) * this.colors.length ) - 1 );

          bar.style.width = percentage + "%";
          
          //Only update if there is a color change
          if (chameleonUpdate._currentColor != indexColor ) {
	          chameleonUpdate._currentColor = indexColor;
  	        bar.style.background = this.colors[ bgColor ];
          }
    }
}


