vBar.plugins.merge = {
    content: '<div class="mask"></div>',
    init: function(){        
        //Set color of bar as gradient
        var bar = this.getBar(),
            mask = bar.querySelector("div.mask");

        bar.style.background = this.colors[0];
        
        if (this.striped){
 		     	bar.style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.30) 10px, transparent 10px, transparent 20px, rgba(0, 0, 0, 0.20) 20px)';
 		    }

        bar.style.textAlign = "center";
        bar.style.width = "100%";

        mask.style.background = this.colors[1];
        mask.style.width = "100%";
        mask.style.height = this.barHeight + 'px';
        mask.style.margin = "auto";
        mask.style.transition = "width 1s";
    },
    update: function() {
        
      var bar = this.getBar(),
          mask = bar.querySelector("div.mask"),
          percentage = this.getPercentage();

          mask.style.width = 100 - percentage + "%";
    }
};

