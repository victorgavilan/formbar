vBar.effects.gradient = {
    init: function( ){
        //Set color of bar as gradient
        var bar = this.getBar(),
            gradient = 'linear-gradient( to right, ' + this.colors[0] + ', ' + this.colors[1] + ')';

        bar.style.background = gradient;

    }
};

