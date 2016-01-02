vBar.plugins.dashed = {
    init: function(){
        
        var bar = this.getBar(),
            dWidth = this.config.dashWidth || 5,
            dSep = this.config.dashSeparation || 2,
            dColor = this.colors[0] || '#0F0',
            computedWidth = parseInt(window.getComputedStyle( bar ).getPropertyValue('width')),
            style = 'style="position:relative; width:'+ dWidth +'px; margin-right:'+ dSep +'px; height: 100%; background-color:'+ dColor +';"',
            html = '';   
            
            
            for (var i=0; i < computedWidth; i += dWidth + dSep){
            	html += '<span '+ style +'>&nbsp;</span>';            	           
            }

    		bar.innerHTML = html;
    },
    fx: {
    	'chameleon': true
    }
};

