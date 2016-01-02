vBar.effects.striped = {
    init: function( ){     
      //Set color of bar as gradient
      var bar = this.getBar(),
      spanElements = bar.querySelectorAll('span');
      
      if (spanElements.length > 0){
      	for (var i = 0; i < spanElements.length; ++i){
      		spanElements.item(i).style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.30) 10px, transparent 10px, transparent 20px, rgba(0, 0, 0, 0.20) 20px)';
      	}
      } else {
        bar.style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.30) 10px, transparent 10px, transparent 20px, rgba(0, 0, 0, 0.20) 20px)';
      }
    }
};


