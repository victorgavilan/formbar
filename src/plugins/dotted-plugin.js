vBar.plugins.dotted = {
    init: function(){
        
        var bar = this.getBar();
        
        bar.style.borderColor = this.colors[0] + ' transparent transparent transparent';
        bar.style.borderWidth = this.barHeight + ' 0px 0px 0px';
        bar.style.borderStyle = "dotted";
        bar.style.height = 0;
    }
};

