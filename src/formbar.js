function FormBar( cfg ){

    //container node
    this.node = document.querySelector(cfg.node);
    
    //Check if the node passed by the user exists
    if (!this.node) { 
        console.log("Can't find the bar's container node. ¿Are you sure it exist?");
        return; 
    }

    //methods
    this.nextStep = function() { this.currentStep += 1; }

    //callbacks
    this.onComplete = cfg.onComplete;
    this.onChange = cfg.onChange;

    //Form Html node containing the form we want observe
    this.formNode = document.querySelector( cfg.formNode ) || document.body;

    //Color array share by all plugins
    this.colors = cfg.colors || ['#44F'];

    //Multistep form configuration
    this.totalSteps = cfg.totalSteps || 1;
    this.currentStep = cfg.currentStep || 1;

    //Bar border configuration
    this.borderColor = cfg.borderColor || '#bbb'; 
    this.showBorder = cfg.showBorder || false;

    //Bar text configuration
    this.showText = cfg.showText || false;
    this.textColors = cfg.textColors || ['black', 'white']; //-50% +50% colors
    this.textSize = cfg.textSize || '1em';
    if (typeof this.textSize == 'number') this.textSize += 'px';
    this.textTop = cfg.textTop || '5px';
    if (typeof this.textTop == 'number') this.textTop += 'px';
    
    //Bar height configuration
    //Allow define the bar height by a number (translate it to pixels) or by a string (using any CSS unit)
    if (cfg.barHeight && typeof cfg.barHeight === "number") cfg.barHeight +="px"; 
    this.barHeight = cfg.barHeight || '4px';
    
    //Bar background color
    this.node.style.background = cfg.background || 'transparent';

    //Internal use variables
    this._barNode = null; //Bar html node reference
    this._currentPercentage = null;
    this._currentTextColor = this.textColors[0];
    this._formElements = [];
    this._formBar = cfg.formBar || true; //Set if the bar must work as a form progress bar or as a simple progress bar.
    
    //Set the bar plugin
    var plugin = cfg.plugin || 'solid';
    this.setPlugin( plugin );

    //Form progress bar behavior initialization
    if ( this._formBar ){
        //Initialize attach events
        this.formNode.addEventListener( "input", this );

        //Get the input elements to control
        var elems = this.formNode.querySelectorAll("input, textarea, select");

        for (var j = 0; j < elems.length; j++) {
         
            if ( FormBar.util.allowedField( elems[j] ) ) {
                this._formElements.push( elems[j] );
            }
        }
    }

};


/**
    Destroy the bar from the DOM and remove the event listeners.
    @method destroy
*/
FormBar.prototype.destroy = function(){

    if ( this._formBar ){
        this.formNode.removeEventListener( "input", this );
    }

    this.node.removeChild( this.node.firstChild );
}

/**
    Return the bar DOM node.
    @method getBar
    @return bar's DOM node
*/

FormBar.prototype.getBar = function(){
  if ( !this._barNode ) this._barNode = this.node.querySelector(".fpbar");
	return this._barNode;  
}


/**
    Return the completed percentage this method must be overwritten if you use the bar as a simple progress bar.
    @method getCompletePercentage
    @return Completed percentage.
*/

FormBar.prototype.getCompletePercentage = function(){
    var Filled = 0;    
    for (var i = 0; i < this._formElements.length; i++) {
        if (this._formElements[i].value.length) Filled++
    }

    return Filled / this._formElements.length; 
}

/**
    Return the percentage and transform it if is a multistep form
    @method getPercentage
    @return percentage adapted to multisteps forms.
*/

FormBar.prototype.getPercentage = function(){

    var percentFilled = this.getCompletePercentage();

    //If it isn't a multistep form return the completed percentage without transform it
    if (this.totalSteps <= 1) return Math.round( percentFilled  * 100 ); 

    var percentStep =   1 / this.totalSteps, //Step percentage
    adaptedPercentage = percentFilled * percentStep, //Actual form percentage adapted to global multistep percentage
    completeStepsPercentage = ( (this.currentStep - 1) * percentStep );
 
   return Math.round( completeStepsPercentage + adaptedPercentage  * 100 );   
}

/**
    Handle the input event to update the bar
    @method handleEvent
*/
FormBar.prototype.handleEvent = function(ev){

    if ( FormBar.util.allowedField( ev.target ) ) {
        this._update();
    }
};

/**
    Set the plugin to use to draw the bar
    @method setPlugin
*/
FormBar.prototype.setPlugin = function (pluginName){

    pluginName = pluginName.toLowerCase();

    if ( pluginName in FormBar.plugins ){
         this.content = (FormBar.plugins[ pluginName ].content) ? FormBar.plugins[ pluginName ].content : null;
         this.initPlugin = (FormBar.plugins[ pluginName ].init) ? FormBar.plugins[ pluginName ].init : null;		
         this.updatePlugin = (FormBar.plugins[ pluginName ].update) ? FormBar.plugins[ pluginName ].update : null;
    } else {
        console.log('There is not any \"'+ pluginName +'\"plugin registered'); 
    }
}


/**
    Update the bar state. 
    @method update
*/
FormBar.prototype._update = function() {
        
    var bar = this.getBar(),
        percentage = this.getPercentage();
        
    //If there is no change in the percentage value don't update the bar
    if (percentage === this._currentPercentage){
    	return;
    } else {
    	this._currentPercentage = percentage;
    }

    //Default action 
    if (!this.updatePlugin) {
        bar.style.width = percentage + "%";
    } else {
        this.updatePlugin();
    }

    //Change text color if percentage > 50
    if (this.showText) {
        var textNode = this.node.querySelector('span.text');
        textNode.textContent = percentage + "%";
        if (percentage > 50) {
            if (this._currentTextColor != this.textColors[1]) {
                 textNode.style.color = this.textColors[1];
                 this._currentTextColor = this.textColors[1];
            }
        } else {
            if (this._currentTextColor != this.textColors[0]) {
                textNode.style.color = this.textColors[0];
                this._currentTextColor = this.textColors[0];
            }
        }
    }

    //Call the callback onChange every update
    if ( this.onChange && typeof this.onChange == "function"){
        this.onChange( percentage );
    }

    //If is 100% call the callback
    if ( percentage >= 100 && this.onComplete && typeof this.onComplete == "function"){
        this.onComplete();
    }
}

/**
    Render the bar's initial state
    @method render
*/ 
FormBar.prototype.render = function() {

    //Create the dom structure
    //Allow to pass a function or a string to generate the html content. 
    //The function must return an html string.
    var content = '',
        text = (this.showText) ? '<span class="text" style="position: absolute; transition: color 0.5s; top:'+ this.textTop +'; font-weight: bold; display:block; left: 0px; text-align: center; width:'+ this.node.offsetWidth +'px; font-size: '+ this.textSize +'; color: '+ this._currentTextColor +'"></span>' : '',
        html;
 
    if (this.content) {
        if (typeof this.content === "function") {
            content = this.content();
        } else {
            content = this.content;       
        }
    }

    html = '<div class="fpbar" style="position: relative; height:'+ this.barHeight +'; transition: all 1s; width: 0px; overflow: hidden">'+ content +'</div>' + text;
    
    this.node.style.position = 'relative';
    if (this.showBorder) this.node.style.border = '1px solid ' + this.borderColor;
    this.node.innerHTML = html;

    //Do de initialization
    if (this.initPlugin) this.initPlugin();

    //Update the plugin state
    this._update();
}


//Utility methods namespace
FormBar.util = {};

/**
    Check if the element has the CSS class
    @method hasClass
    @param element An HTML element.
    @param className CSS class to check if it´s in the element.
*/
FormBar.util.hasClass = function( element, className ){
    var classes = element.className.replace(/\s+/g, ' ').split(' ');
   
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] === className) {
            return true;
        }
    }

    return false;
};

/**
    Indicates if a field must be observed by the formBar
*/
FormBar.util.allowedField = function( field ){
    var type = field.type;
    return ( type != "button" && type != "submit" && type != "checkbox" && type != "hidden" && (!FormBar.util.hasClass(field, 'ignore')) )
};


/** PLUGINS **/
FormBar.plugins = new Object();

/** SOLID PLUGIN **/
FormBar.plugins.solid = {
    init: function(){

        //Set color of bar as solid
        var bar = this.getBar();
        
        bar.style.background = this.colors[0];        
    }
}

