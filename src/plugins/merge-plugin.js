FormBar.plugins.merge = {
    content: '<div class="mask"></div>',
    init: function(){        
        //Set color of bar as gradient
        var bar = this.getBar(),
            mask = bar.querySelector("div.mask");

        bar.style.background = this.colors[0];
        bar.style.textAlign = "center";
        bar.style.width = "100%";

        mask.style.background = this.colors[1];
        mask.style.width = "100%";
        mask.style.height = this.barHeight;
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

