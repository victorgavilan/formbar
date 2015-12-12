vBar.plugins.solid = {
    init: function(){
      //Set color of bar as solid
      var bar = this.getBar();      
      bar.style.background = this.colors[0];        
    },
    update: function( ev ){
        ev.bar.style.width = ev.percentage + "%";
    }
};

