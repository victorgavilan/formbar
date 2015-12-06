/** TIMER BAR BEHAVIOR **/
FormBar.behaviors.timerbar = {
    init: function( cfg ){
      this._timerBehaviorTimerId = null;
      this._timerBehaviorTimerMax = (cfg.maxTime || 30) * 1000; //Max time
      this._timerBehaviorTimerCurrent = 0;
      this._timerBehaviorTimerRunning = false;
      this._timerBehaviorInterval = cfg.timerInterval || 500; //Time to setInterval method
      
      //Reset the timer
      this.reset = function( initValue ){
      	this._timerBehaviorTimerCurrent = (initValue || 0) * 1000;
      };
      
      //Starts the timer
    	this.start = function( initValue ){

    	  if (initValue) {
    	  
    	  	if (initValue > this._timerBehaviorTimerMax){
    	  		initValue = this._timerBehaviorTimerMax;
    	  	}
    	  	
    	  	this._timerBehaviorTimerCurrent = initValue * 1000;

    	  }
    	  
    		this._timerBehaviorTimerId = setInterval( function(){
    			if ( (this._timerBehaviorTimerCurrent += this._timerBehaviorInterval) >= this._timerBehaviorTimerMax ){
    				this.stop();
      			this._update();
    				return;    				
    			}
    			this._timerBehaviorTimerRunning = true;
    			this._update();
    		}.bind(this), this._timerBehaviorInterval );
    	};
    	
    	//Stop the timer
    	this.stop = function(){
       	this._timerBehaviorTimerRunning = false;
    		clearInterval( this._timerBehaviorTimerId );
    	};
       
    },
    destroy: function(){
      if ( this._timerBehaviorTimerRunning ){
	      this.stop();
      }
      
      delete this._timerBehaviorTimerCurrent;
      delete this._timerBehaviorTimerMax;
      delete this._timerBehaviorTimerId;
    },
    percentage: function(){
        return this._timerBehaviorTimerCurrent / this._timerBehaviorTimerMax;
    }
};

