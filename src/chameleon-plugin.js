FormBar.plugins.chameleon = {
    init: function(){

        //Set color of bar as gradient
        var bar = this.getBar();
       
        bar.style.background = this.colors[0];
    },
    update: function() {
        
      var bar = this.getBar(),
          percentage = this.getPercentage(),
          bgColor = (percentage === 0 ) ? 0 : Math.round( ( (percentage/100) * this.colors.length ) - 1 );

          bar.style.width = percentage + "%";
          bar.style.background = this.colors[ bgColor ];
    }
}

