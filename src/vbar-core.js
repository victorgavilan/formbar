function vBar( cfg ){

    //container node
    this.node = document.querySelector(cfg.node);
    
    //Check if the node passed by the user exists
    if (!this.node) { 
        console.log("Can't find the bar's container node. Are you sure it exist?");
        return; 
    }

    //methods
    this.nextStep = function() { this.currentStep++; };
    this.prevStep =  function() { this.currentStep--; };

    //callbacks
    this.onComplete = cfg.onComplete;
    this.onChange = cfg.onChange;

    //Color array share by all plugins
    this.colors = cfg.colors || ['#44F'];

    //Multistep form configuration
    this.totalSteps = cfg.totalSteps || 1;
    this.currentStep = cfg.currentStep || 1;

    //Bar border configuration
    this.borderColor = cfg.borderColor || '#bbb'; 
    this.showBorder = cfg.showBorder || false;
    this.borderRadius = cfg.borderRadius || 5;

    //Bar text configuration
    this.showText = cfg.showText || false;
    this.textAlign = cfg.textAlign || 'center';
    this.textPendingPercentage = cfg.textPendingPercentage || false;
    this.beforeText = cfg.beforeText || '';
    this.afterText = cfg.afterText ||'';
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
    
    //Set the behavior and init it
    var behavior = cfg.behavior || 'progressbar';
    this.setBehavior( behavior);
    this.initBehavior( cfg );

    //Set the bar plugin
    var plugin = cfg.plugin || 'solid';
    this.setPlugin( plugin );
}


/**
    Destroy the bar from the DOM and call behaviorDestroy method
    @method destroy
*/
vBar.prototype.destroy = function(){
		this.destroyPlugin();
    this.destroyBehavior();
    this.node.removeChild( this.node.querySelector('.vbar-wrapper') );    
};

/**
    Return the bar DOM node.
    @method getBar
    @return bar's DOM node
*/

vBar.prototype.getBar = function(){
  if ( !this._barNode ) this._barNode = this.node.querySelector(".vbar-content");
	return this._barNode;  
};


/**
    Return the percentage and transform it if is a multistep form
    @method getPercentage
    @return percentage adapted to multisteps forms.
*/

vBar.prototype.getPercentage = function(){

    var percentFilled = this.getPercentageBehavior();

    //If it isn't a multistep form return the completed percentage without transform it
    if (this.totalSteps <= 1) return Math.round( percentFilled  * 100 ); 

    var percentStep =   1 / this.totalSteps, //Step percentage
    adaptedPercentage = percentFilled * percentStep, //Actual form percentage adapted to global multistep percentage
    completeStepsPercentage = ( (this.currentStep - 1) * percentStep );
 
   return Math.round( completeStepsPercentage + adaptedPercentage  * 100 );   
};

/**
    Set the plugin to use to draw the bar
    @method setPlugin
    @throws {Error} Plugin does not exist.
*/
vBar.prototype.setPlugin = function (pluginName){
	
    pluginName = pluginName.toLowerCase();

    if ( pluginName in vBar.plugins ){
        //Destroy phase previous plugin
        this.destroyPlugin(); 

        //Load new plugin
        this.contentPlugin = (vBar.plugins[ pluginName ].content) ? vBar.plugins[ pluginName ].content : null;
        this.initPlugin = (vBar.plugins[ pluginName ].init) ? vBar.plugins[ pluginName ].init : vBar.plugins.solid.init; //default init

        if (vBar.plugins[ pluginName ].update) this.updatePlugin = vBar.plugins[ pluginName ].update; //default update
        this.destroyPlugin = (vBar.plugins[ pluginName ].destroy) ? vBar.plugins[ pluginName ].destroy : vBar.util.noop;
    } else {
        throw new Error('There is not any \"'+ pluginName +'\" plugin registered');
    }
};


/**
    Set bar behavior
    @method setBehavior
    @throws {Error} Behavior does not exist.
*/
vBar.prototype.setBehavior = function (behaviorName){

    behaviorName = behaviorName.toLowerCase();

    if ( behaviorName in vBar.behaviors ){
         this.initBehavior = (vBar.behaviors[ behaviorName ].init ) ? vBar.behaviors[ behaviorName ].init : vBar.util.noop;
         this.destroyBehavior = (vBar.behaviors[ behaviorName ].destroy) ? vBar.behaviors[ behaviorName ].destroy : vBar.util.noop;
         this.getPercentageBehavior = (vBar.behaviors[ behaviorName ].percentage) ? vBar.behaviors[ behaviorName ].percentage : vBar.util.noop;
    } else {
        throw new Error('There is not any \"'+ behaviorName +'\" behavior registered');
    }
};



/**
    Update the bar state. 
    @method update
*/
vBar.prototype._update = function( ) {
        
    var bar = this.getBar(),
        percentage = this.getPercentage();
        
    //If there is no change in the percentage value don't update the bar
    if (percentage === this._currentPercentage){
    	return;
    } else {
    	this._currentPercentage = percentage;
    }

    //Call the callback onChange every update
    if ( this.onChange && typeof this.onChange == "function"){
        this.onChange( percentage );
    }

    //If is 100% call the callback
    if ( percentage >= 100 && this.onComplete && typeof this.onComplete == "function"){
        this.onComplete();
    }
    
    this.updatePlugin( {bar: bar, percentage: percentage} );


    //Change text color if percentage > 50
    if (this.showText) {
        var textNode = this.node.querySelector('span.text'),
            percentageText = (this.textPendingPercentage) ? 100 - percentage : percentage;

        percentageText = " " + percentageText + "% ";

        textNode.textContent = this.beforeText + percentageText + this.afterText;
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
};

/**
    Render the bar's initial state
    @method render
*/ 
vBar.prototype.render = function() {

    //Create the dom structure
    //Allow to pass a function or a string to generate the html content. 
    //The function must return an html string.
    var dbar,
        dwrapper,
        dcontent,
        dtext,
        content = '',
        html,
        htmlborder = (this.showBorder) ? 'border: 1px solid ' + this.borderColor +'; border-radius:'+ this.borderRadius + 'px;': '';
        
        
        //html bar DOM structure
        dwrapper = '<div class="vbar-wrapper" style="position: relative; height: '+ this.barHeight + ';">';       
        dbar = '<div class="vbar" style="position: relative; height: 100%; width:100%; overflow: hidden; '+ htmlborder + '">';
        dcontent = '<div class="vbar-content" style="height: 100%; overflow: hidden;transition: all 0.5s;">';     
        dtext = (this.showText) ? '<span class="text" style="position: absolute; transition: color 0.5s; top:'+ this.textTop +'; font-weight: bold; display:block; left: 0px; text-align: '+ this.textAlign +'; width:'+ this.node.offsetWidth +'px; font-size: '+ this.textSize +'; color: '+ this._currentTextColor +'"></span>' : '';
        
 
    if (this.contentPlugin) {
        if (typeof this.contentPlugin === "function") {
            content = this.contentPlugin();
        } else {
            content = this.contentPlugin;       
        }
    }
    html = dwrapper + dbar + dcontent + content + '</div></div>' + dtext + '</div>';
    
          
    
    this.node.innerHTML = html;

    //Do de initialization
    this.initPlugin();

    //Update the plugin state
    this._update();
    
    //Replace render behavior
    //Render will be call only once
    this.render = function(){
    	console.log('Render can only be called once');
    };
};



/***************
 ** UTILITIES **
 ***************/
vBar.util = {};

/**
    Check if the element has the CSS class
    @method hasClass
    @param element An HTML element.
    @param className CSS class to check if it's in the element.
*/
vBar.util.hasClass = function( element, className ){
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
vBar.util.allowedField = function( field ){
    var type = field.type;
    return ( type != "button" && type != "submit" && type != "checkbox" && type != "hidden" && (!vBar.util.hasClass(field, 'ignore')) );
};

// No operation
vBar.util.noop = function(){};


/*************
 ** PLUGINS **
 *************/
vBar.plugins = {};


/***************
 ** BEHAVIORS **
 ***************/
vBar.behaviors = {};


/************************
 ** EXTENSIONS METHODS **
 ************************/

//Plugins
vBar.prototype.destroyPlugin = vBar.util.noop;
vBar.prototype.initPlugin = vBar.util.noop;
vBar.prototype.contentPlugin = null;
vBar.prototype.updatePlugin = function( ev ){
	ev.bar.style.width = ev.percentage + "%";
};

//Behaviors
vBar.prototype.initBehavior = vBar.util.noop;
vBar.prototype.destroyBehavior = vBar.util.noop;
vBar.prototype.getPercentageBehavior = vBar.util.noop;		
