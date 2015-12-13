vBar.plugins.sections = {
    content: function (){
        var sectionWidth = this.node.offsetWidth / (this.colors.length),
            html = '<div style="position: relative">',
            stripedCSS = '';

            if (this.striped){
            	stripedCSS = 'background-image: repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.30) 10px, transparent 10px, transparent 20px, rgba(0, 0, 0, 0.20) 20px)';
    	      }

        for ( var i=0; i < this.colors.length; ++i){            
            html += '<span style="display: inline-block; position: absolute; top: 0; left: '+ sectionWidth * i +'px; background-color: '+ this.colors[i] +'; height: '+ this.barHeight +'; width: '+ sectionWidth +'px;'+ stripedCSS +'"></span>';            
        }

        html += "</div>";
        return html;               
    }
};

