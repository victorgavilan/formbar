vBar.behaviors.progressbar = {
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
