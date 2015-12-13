vBar.plugins.striped = {
    init: function(){
      //Set color of bar as solid
      var bar = this.getBar();      
      bar.style.background = this.colors[0];      
console.log('SETTING BACKGROUND IMAGE STRIPPED');
      bar.style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.30) 10px, transparent 10px, transparent 20px, rgba(0, 0, 0, 0.20) 20px)';
    }
};

