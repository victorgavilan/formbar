function FormBar( cfg ){

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
FormBar.prototype.destroy = function(){
		this.destroyPlugin();
    this.destroyBehavior();
    this.node.removeChild( this.node.querySelector('.fpbar-wrapper') );    
};

/**
    Return the bar DOM node.
    @method getBar
    @return bar's DOM node
*/

FormBar.prototype.getBar = function(){
  if ( !this._barNode ) this._barNode = this.node.querySelector(".fpbar-content");
	return this._barNode;  
};


/**
    Return the percentage and transform it if is a multistep form
    @method getPercentage
    @return percentage adapted to multisteps forms.
*/

FormBar.prototype.getPercentage = function(){

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
FormBar.prototype.setPlugin = function (pluginName){
	
    pluginName = pluginName.toLowerCase();

    if ( pluginName in FormBar.plugins ){
        //Destroy phase previous plugin
        this.destroyPlugin(); 

        //Load new plugin
        this.contentPlugin = (FormBar.plugins[ pluginName ].content) ? FormBar.plugins[ pluginName ].content : null;
        this.initPlugin = (FormBar.plugins[ pluginName ].init) ? FormBar.plugins[ pluginName ].init : FormBar.plugins.solid.init; //default init

        this.updatePlugin = (FormBar.plugins[ pluginName ].update) ? FormBar.plugins[ pluginName ].update : FormBar.plugins.solid.update; //default update
        this.destroyPlugin = (FormBar.plugins[ pluginName ].destroy) ? FormBar.plugins[ pluginName ].destroy : FormBar.util.noop;
    } else {
        throw new Error('There is not any \"'+ pluginName +'\" plugin registered');
    }
};


/**
    Set bar behavior
    @method setBehavior
    @throws {Error} Behavior does not exist.
*/
FormBar.prototype.setBehavior = function (behaviorName){

    behaviorName = behaviorName.toLowerCase();

    if ( behaviorName in FormBar.behaviors ){
         this.initBehavior = (FormBar.behaviors[ behaviorName ].init ) ? FormBar.behaviors[ behaviorName ].init : FormBar.util.noop;
         this.destroyBehavior = (FormBar.behaviors[ behaviorName ].destroy) ? FormBar.behaviors[ behaviorName ].destroy : FormBar.util.noop;
         this.getPercentageBehavior = (FormBar.behaviors[ behaviorName ].percentage) ? FormBar.behaviors[ behaviorName ].percentage : FormBar.util.noop;
    } else {
        throw new Error('There is not any \"'+ behaviorName +'\" behavior registered');
    }
};



/**
    Update the bar state. 
    @method update
*/
FormBar.prototype._update = function( ) {
        
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
FormBar.prototype.render = function() {

    //Create the dom structure
    //Allow to pass a function or a string to generate the html content. 
    //The function must return an html string.
    var fpbar,
        fpwrapper,
        fpborder,
        fpcontent,
        fptext,
        content = '',
        html,
        htmlborder = (this.showBorder) ? 'border: 1px solid ' + this.borderColor +'; border-radius:'+ this.borderRadius + 'px;': '';
        
        
        //html bar DOM structure
        fpwrapper = '<div class="fpbar-wrapper" style="position: relative; height: '+ this.barHeight + ';">';       
        fpborder = '<div class="fpbar-border" style="height: 100%; width:100%; overflow: hidden; '+ htmlborder + '">';
        fpbar = '<div class="fpbar" style="position: relative; height: 100%; ">';
        fpcontent = '<div class="fpbar-content" style="height: 100%; transition: all 0.5s;">';     
        fptext = (this.showText) ? '<span class="text" style="position: absolute; transition: color 0.5s; top:'+ this.textTop +'; font-weight: bold; display:block; left: 0px; text-align: '+ this.textAlign +'; width:'+ this.node.offsetWidth +'px; font-size: '+ this.textSize +'; color: '+ this._currentTextColor +'"></span>' : '';
        
 
    if (this.contentPlugin) {
        if (typeof this.content === "function") {
            content = this.contentPlugin();
        } else {
            content = this.contentPlugin;       
        }
    }
    html = fpwrapper + fpborder + fpbar + fpcontent + content + '</div></div></div>' + fptext + '</div>';
    
    
    /*'<div class="fpbar" style="position: relative; height:'+ this.barHeight +'; overflow: hidden;'+ border +'"><div class="fpbar-content" style="position: relative; height:'+ this.barHeight +'; transition: all 1s;width:0px;">'+ content +'</div>' + text + '</div>';
*/
    
    
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
FormBar.util = {};

/**
    Check if the element has the CSS class
    @method hasClass
    @param element An HTML element.
    @param className CSS class to check if it's in the element.
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
    return ( type != "button" && type != "submit" && type != "checkbox" && type != "hidden" && (!FormBar.util.hasClass(field, 'ignore')) );
};

// No operation
FormBar.util.noop = function(){};


/*************
 ** PLUGINS **
 *************/
FormBar.plugins = {};

/** SOLID PLUGIN (DEFAULT PLUGIN) **/
FormBar.plugins.solid = {
    init: function(){
      //Set color of bar as solid
      var bar = this.getBar();      
      bar.style.background = this.colors[0];        
    },
    update: function( ev ){
        ev.bar.style.width = ev.percentage + "%";
    }
};



/***************
 ** BEHAVIORS **
 ***************/

FormBar.behaviors = {};



/** PROGRESSBAR BEHAVIOR (DEFAULT BEHAVIOR)**/

FormBar.behaviors.progressbar = {
    init: function(){
      this.value = this.value || 0;       
      this.setValue = function( val ){
      	this.value = val / 100;
      	this._update( );
      };
    },
    destroy: function(){
    	delete this.setValue;
    	delete this.value;
    },
    percentage: function(){
    	return this.value;
    }
};


/************************
 ** EXTENSIONS METHODS **
 ************************/

//Plugins
FormBar.prototype.destroyPlugin = FormBar.util.noop;
FormBar.prototype.initPlugin = FormBar.plugins.solid.init;
FormBar.prototype.contentPlugin = null;
FormBar.prototype.updatePlugin = FormBar.plugins.solid.update;

//Behaviors
FormBar.prototype.initBehavior = FormBar.util.noop;
FormBar.prototype.destroyBehavior = FormBar.util.noop;
FormBar.prototype.getPercentageBehavior = FormBar.util.noop;		
