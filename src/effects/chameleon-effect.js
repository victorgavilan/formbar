vBar.effects.chameleon = {
    init: function( ){

      this._chameleon_currentColorIndex = 0;      

      //Set the color percentages
      if (this.config.colorPercentages){
	      this.colorPercentages = this.config.colorPercentages;
      } else {
      	this.colorPercentages = this.colors.map( function( value, index, colors){
      	  return Math.round( 100 / colors.length ) * (index + 1);
      	});
      }
    },
    update: function chameleonUpdate(ev) {
       
      var bar = ev.bar,
          percentage = ev.percentage,
          colorIndex = 0,
          spanElements = bar.querySelectorAll('span');
          
          while ( this.colorPercentages[colorIndex + 1] && ( percentage >= this.colorPercentages[ colorIndex ] ) ) ++colorIndex;
          
          //Update if there is a color change
          if ( this._chameleon_currentColorIndex !== colorIndex )		
          {                        
            this._chameleon_currentColorIndex = colorIndex;
            
            if (spanElements.length > 0){
            	for (var i = 0; i < spanElements.length; ++i){
            		spanElements.item(i).style.backgroundColor = this.colors[ this._chameleon_currentColorIndex ];
            	}
            } else {
	            bar.style.backgroundColor = this.colors[ this._chameleon_currentColorIndex ];
            }
          }          
    },
    destroy: function(){
    	delete this._chameleon_currentColorIndex;
    }
};


