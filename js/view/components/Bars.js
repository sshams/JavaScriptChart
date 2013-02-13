/**
* @author Saad Shams :: saad@muizz.com
* Manages the functionality of Bars
* */

puremvc.define(
{
    name: "view.components.Bars",
    parent: view.components.TagObject,

    /**
    * @constructor
    * @extends {view.components.TagObject}
    * @param (Object) elementID
    */
   
    constructor: function(elementID) {
        view.components.TagObject.call(this, document.getElementById(elementID)); //bars_0
        
        for(var i=0; i<2; i++) { //adding eventHandler on each anchor with li's
            this.addEventHandler(document.getElementById(this.element.id + "_" + i).firstChild, events.MouseEvent.MOUSE_DOWN, Delegate.create(this, this.bars_mouseDownHandler));
        }
    
        this.mouseMoveHandler = Delegate.create(this, this.document_mouseMoveHandler);
        this.addEventHandler(document, events.MouseEvent.MOUSE_UP, Delegate.create(this, this.document_mouseUpHandler));
    }
},
{
    /* Instance Methods and variables */
    start: 0,
    end: 0,
    height: 0,
    bar: null,
    mouseMoveHandler: null,
    maxHeight: 260,
    ids: null,
    
    offset: 0,
    direction: "",
    UP: "up",
    DOWN: "down",
    
    lastScreenY: 0,
    
    /**
     * @param {number} index
     * @param {number} value
     * scale the bars
     */
    
    scale: function(index, value) {
        TweenLite.to(document.getElementById(this.element.id + "_" + index), .5, {css:{height:value}});
    },
    
    /**
     * @param {number} group
     * @param {number} value
     * animate the bars
     */
     
    animate: function(group, value) {
       //alert(group + " " + value);
    },

    bars_mouseDownHandler: function(event) {
        view.components.Event.adapt(event); //adapting event.target with event.srcElement
        event.preventDefault();
        
        this.start = event.screenY;
        this.bar = event.target.parentNode;
        this.constructor.bar = this.bar;
	this.height = this.bar.offsetHeight;  
        
        this.addEventHandler(document, events.MouseEvent.MOUSE_MOVE, this.mouseMoveHandler);
    },
   
    document_mouseMoveHandler: function(event) {
        view.components.Event.adapt(event);
        this.direction = this.lastScreenY > event.screenY ? this.UP : this.DOWN;
        this.lastScreenY = event.screenY;
        this.bar = view.components.Bars.bar;
        
        this.ids = this.bar.id.split("_");
        
        if(this.bar.offsetHeight < this.maxHeight && this.direction == this.UP) {
            TweenLite.to(this.bar, .1, {css:{height:this.height + this.start - event.screenY}});
            this.dispatchEvent(new view.components.Event(this.constructor.DRAG, this.bar, [parseInt(this.ids[1]), parseInt(this.ids[2]), this.bar.offsetHeight]));
        } else if(this.bar.offsetHeight > this.maxHeight) {
            TweenLite.to(this.bar, 0, {css:{height:this.maxHeight}});
            this.dispatchEvent(new view.components.Event(this.constructor.DRAG, this.bar, [parseInt(this.ids[1]), parseInt(this.ids[2]), this.maxHeight]));
        } else if(this.bar.offsetHeight > 0 && this.bar.offsetHeight <= this.maxHeight && this.direction == this.DOWN) {
            TweenLite.to(this.bar, .1, {css:{height:this.height + this.start - event.screenY}});
            this.dispatchEvent(new view.components.Event(this.constructor.DRAG, this.bar, [parseInt(this.ids[1]), parseInt(this.ids[2]), this.bar.offsetHeight]));
        } else if(this.bar.offsetHeight <=0 && this.direction == this.DOWN) {
            TweenLite.to(this.bar, 0, {css:{height:0}});
            this.dispatchEvent(new view.components.Event(this.constructor.DRAG, this.bar, [parseInt(this.ids[1]), parseInt(this.ids[2]), this.bar.offsetHeight]));
        }
    },
        
    document_mouseUpHandler: function(event) {
        if(!view.components.Bars.bar) { 
            return;
        }
    
        view.components.Event.adapt(event);
        this.removeEventHandler(document, events.MouseEvent.MOUSE_MOVE, this.mouseMoveHandler);

        this.bar = view.components.Bars.bar;
        if(this.bar.offsetHeight > this.maxHeight) {
            TweenLite.to(this.bar, 0, {css:{height:this.maxHeight}});
            //this.bar.style.height = this.maxHeight + 'px';
            this.dispatchEvent(new view.components.Event(this.constructor.DRAG, this.bar, [parseInt(this.ids[1]), parseInt(this.ids[2]), this.maxHeight]));
        }
    }
}, 
{   
    /* Static methods and variables */
    bar: null,
            
    //Custom type event name for dispatching events to it's Mediator (FieldsMediator)
    DRAG: "drag"
}
);
