vBar.plugins.sections = {
    content: function (){
        var sectionWidth = this.node.offsetWidth / (this.colors.length),
            html = '<div style="position: relative">';

        for ( var i=0; i < this.colors.length; ++i){            
            html += '<span style="display: inline-block; position: absolute; top: 0; left: '+ sectionWidth * i +'px; background-color: '+ this.colors[i] +'; height: '+ this.barHeight +'px; width: '+ sectionWidth +'px;"></span>';            
        }

        html += "</div>";
        return html;               
    },
    fx: {
    	'striped': true
    }
};

