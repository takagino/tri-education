(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"wf1_10_sakagami_atlas_1", frames: [[664,802,508,143],[0,802,662,241],[1886,0,122,233],[1886,235,100,130],[0,1045,769,74],[1604,0,280,575],[1832,577,193,385],[1392,802,173,346],[1604,577,226,622],[1174,802,216,291],[0,0,800,800],[802,0,800,800]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_9 = function() {
	this.initialize(ss["wf1_10_sakagami_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["wf1_10_sakagami_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["wf1_10_sakagami_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["wf1_10_sakagami_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["wf1_10_sakagami_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["wf1_10_sakagami_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["wf1_10_sakagami_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["wf1_10_sakagami_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["wf1_10_sakagami_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.Image = function() {
	this.initialize(img.Image);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2092,2991);


(lib.レイヤー0 = function() {
	this.initialize(img.レイヤー0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3117,1629);


(lib.星１ = function() {
	this.initialize(ss["wf1_10_sakagami_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.雲 = function() {
	this.initialize(ss["wf1_10_sakagami_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.雲pngコピー = function() {
	this.initialize(ss["wf1_10_sakagami_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.シンボル7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_1
	this.instance = new lib.星１();
	this.instance.setTransform(30.7,0,0.4074,0.4074,14.9992);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.シンボル7, new cjs.Rectangle(0,0,115.7,137.3), null);


(lib.シンボル6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_1
	this.instance = new lib.雲pngコピー();
	this.instance.setTransform(0,95,0.1445,0.1445);

	this.instance_1 = new lib.雲();
	this.instance_1.setTransform(116,0,0.1907,0.1907);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.シンボル6, new cjs.Rectangle(0,0,268.6,210.6), null);


(lib.シンボル4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_1
	this.instance = new lib.レイヤー0();
	this.instance.setTransform(0,0,0.08,0.08);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.シンボル4, new cjs.Rectangle(0,0,249.4,130.3), null);


(lib.tree02svg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _レイヤー_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5F524C").s().p("AgDA8IgFgDIgCg5IADg3IAHgEQAHgDADAIIABBtIgKAFIgBAAIgDAAg");
	this.shape.setTransform(7.325,33.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6B898E").s().p("AADCJIgIAEIABgBIgvgBQgIgBgNgDQgGgBgBgCIAAgHQAFgdAMgRIABgDIAAgCIgIgDQgFgDgCgDQgBgDACgGQACgGAEgHIASgeIAFgJIgKgDQgKgBgCgFQgDgEAEgKIAIgUQAdg3ATgaQAFgIAJgJQAGgGAEAJIADAIQAEAPAIATIAPAgIAMAeIABAEQACAMgDAEQgCADgJADIgFACIAeAxQAFAJgCADQgBADgJACIgPAEIACAFIAdA0IACAIQgXAFgtADQgCgHgHADg");
	this.shape_1.setTransform(8.0125,14.0887);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0.1,16,39.699999999999996);


(lib.tree01svg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _レイヤー_2
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(0,0,0.2086,0.2086);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,25.5,48.6);


(lib.goods02svg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _レイヤー_2
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,65);


(lib.ClipGroup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("A+CC2IAAlrMA8FAAAIAAFrg");
	mask.setTransform(192.275,18.175);

	// レイヤー_3
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(0,-0.5,0.5,0.5);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(0,0,384.5,36.4), null);


(lib.building08svg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _レイヤー_2
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(-3.9,-25.25,0.172,0.172);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-25.2,48.199999999999996,98.9);


(lib.building07svg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _レイヤー_2
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(0,0,0.2382,0.2382);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,46,91.7);


(lib.building06svg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _レイヤー_2
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(0,0,0.2754,0.2754);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,47.7,95.3);


(lib.building03svg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _レイヤー_2
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(1.8,5.1,0.1811,0.1811);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.8,5.1,41,112.7);


(lib.box01svg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _レイヤー_2
	this.instance = new lib.Image();
	this.instance.setTransform(0,0,0.24,0.24);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,502.1,717.8);


(lib.雲_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_22
	this.instance = new lib.シンボル6();
	this.instance.setTransform(0,148.4,1,1,0,0,0,134.3,105.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({y:137.8},0).wait(1).to({y:127.2},0).wait(1).to({y:116.6},0).wait(1).to({y:106},0).wait(1).to({y:95.45},0).wait(1).to({y:84.85},0).wait(1).to({y:74.25},0).wait(1).to({y:63.65},0).wait(1).to({y:53.05},0).wait(1).to({y:42.45},0).wait(1).to({y:31.85},0).wait(1).to({y:21.25},0).wait(1).to({y:10.65},0).wait(1).to({y:0.05},0).wait(1).to({y:-10.55},0).wait(1).to({y:-21.15},0).wait(1).to({y:-31.75},0).wait(1).to({y:-42.35},0).wait(1).to({y:-52.95},0).wait(1).to({y:-63.55},0).wait(1).to({y:-74.15},0).wait(1).to({y:-84.75},0).wait(1).to({y:-95.35},0).wait(1).to({y:-105.95},0).wait(1).to({y:-116.55},0).wait(1).to({y:-127.15},0).wait(1).to({y:-137.75},0).wait(1).to({y:-148.35},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134.3,-253.6,268.6,507.29999999999995);


(lib.流れ星 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_23
	this.instance = new lib.シンボル7();
	this.instance.setTransform(-523.85,163,1,1,0,0,0,57.9,68.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:-468.7,y:145.8},0).wait(1).to({x:-413.55,y:128.65},0).wait(1).to({x:-358.4,y:111.5},0).wait(1).to({x:-303.25,y:94.35},0).wait(1).to({x:-248.1,y:77.15},0).wait(1).to({x:-192.95,y:60.05},0).wait(1).to({x:-137.8,y:42.9},0).wait(1).to({x:-82.65,y:25.75},0).wait(1).to({x:-27.5,y:8.6},0).wait(1).to({x:27.65,y:-8.6},0).wait(1).to({x:82.8,y:-25.75},0).wait(1).to({x:137.95,y:-42.9},0).wait(1).to({x:193.1,y:-60.05},0).wait(1).to({x:248.25,y:-77.2},0).wait(1).to({x:303.4,y:-94.4},0).wait(1).to({x:358.55,y:-111.55},0).wait(1).to({x:413.7,y:-128.7},0).wait(1).to({x:468.85,y:-145.85},0).wait(1).to({x:524,y:-163.05},0).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-581.7,-231.6,1163.5,463.29999999999995);


(lib.完成 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_0
	this.instance = new lib.レイヤー0();
	this.instance.setTransform(-344.95,-266.7,0.0741,0.0741,6.7009);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// レイヤー_1
	this.instance_1 = new lib.goods02svg("synched",0);
	this.instance_1.setTransform(182.7,234.85,0.9846,0.9846,0,0,0,24.9,32.5);

	this.instance_2 = new lib.CachedBmp_8();
	this.instance_2.setTransform(-75.15,-210.2,0.5,0.5);

	this.instance_3 = new lib.tree01svg("synched",0);
	this.instance_3.setTransform(37.8,211.7,2.0814,2.0814,-14.1689,0,0,12.8,24.6);

	this.instance_4 = new lib.tree02svg("synched",0);
	this.instance_4.setTransform(264.4,194.5,4.9928,3.733,0,0,0,8.1,20.4);

	this.instance_5 = new lib.building08svg("synched",0);
	this.instance_5.setTransform(-393.6,147.55,2.9071,2.9071,0,0,0,20.2,41.5);

	this.instance_6 = new lib.building07svg("synched",0);
	this.instance_6.setTransform(-61.35,181.95,1.8593,1.8593,0,0,0,23.1,46.1);

	this.instance_7 = new lib.building06svg("synched",0);
	this.instance_7.setTransform(-175,182.3,1.7743,1.7743,0,0,0,23.9,47.6);

	this.instance_8 = new lib.building03svg("synched",0);
	this.instance_8.setTransform(400.65,124.85,2.3143,2.3143,0,0,0,22.2,61.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-463.6,-266.7,911.7,533.5999999999999);


(lib.プレゼント１ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_8
	this.instance = new lib.box01svg("synched",0);
	this.instance.setTransform(-353.15,-317.4,0.1729,0.1729,0,0,0,249.3,357.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:251,regY:358.9,rotation:1.6662,x:-331.4,y:-292.95},0).wait(1).to({rotation:3.3324,x:-309.95,y:-268.7},0).wait(1).to({rotation:4.9986,x:-288.5,y:-244.45},0).wait(1).to({rotation:6.6648,x:-267,y:-220.2},0).wait(1).to({rotation:8.3309,x:-245.55,y:-195.95},0).wait(1).to({rotation:9.9971,x:-224.05,y:-171.75},0).wait(1).to({rotation:11.6633,x:-202.65,y:-147.55},0).wait(1).to({rotation:13.3295,x:-181.2,y:-123.3},0).wait(1).to({rotation:14.9957,x:-159.7,y:-99},0).wait(1).to({rotation:8.9958,x:-133.4,y:-89.1},0).wait(1).to({rotation:2.9959,x:-107.05,y:-79.25},0).wait(1).to({rotation:-3.0041,x:-80.7,y:-69.3},0).wait(1).to({rotation:-9.004,x:-54.4,y:-59.4},0).wait(1).to({rotation:-15.0039,x:-28.1,y:-49.55},0).wait(1).to({rotation:-21.0038,x:-1.75,y:-39.6},0).wait(1).to({rotation:-27.0037,x:24.5,y:-29.7},0).wait(1).to({rotation:-33.0037,x:50.85,y:-19.75},0).wait(1).to({rotation:-39.0036,x:77.1,y:-9.85},0).wait(1).to({rotation:-45.0035,x:103.4,y:0},0).wait(1).to({rotation:-39.0034,x:126.95,y:30.85},0).wait(1).to({rotation:-33.0033,x:150.5,y:61.7},0).wait(1).to({rotation:-27.0033,x:174,y:92.5},0).wait(1).to({rotation:-21.0032,x:197.6,y:123.35},0).wait(1).to({rotation:-15.0031,x:221.1,y:154.15},0).wait(1).to({rotation:-9.003,x:244.65,y:185.05},0).wait(1).to({rotation:-3.0029,x:268.2,y:215.9},0).wait(1).to({rotation:2.9971,x:291.7,y:246.7},0).wait(1).to({rotation:8.9972,x:315.2,y:277.6},0).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-396.2,-379.2,763.9,724.8);


(lib.シンボル2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_1
	this.instance = new lib.tree01svg("synched",0);
	this.instance.setTransform(507.1,247.15,2.3966,2.3966,-14.999,0,0,12.7,24.4);

	this.instance_1 = new lib.building08svg("synched",0);
	this.instance_1.setTransform(65.1,223.6,2.7067,2.7067,0,0,0,20.1,41.3);

	this.instance_2 = new lib.building07svg("synched",0);
	this.instance_2.setTransform(405.6,215.2,2.0991,2.0991,0,0,0,23,46);

	this.instance_3 = new lib.building06svg("synched",0);
	this.instance_3.setTransform(277.5,224.75,1.8157,1.8157,0,0,0,23.9,47.6);

	this.instance_4 = new lib.building03svg("synched",0);
	this.instance_4.setTransform(840.25,155.95,2.761,2.761,0,0,0,22.4,61.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.シンボル2, new cjs.Rectangle(0.1,0,896.3,311.3), null);


(lib.街 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_12
	this.instance = new lib.シンボル2();
	this.instance.setTransform(0.05,165.65,1,1,0,0,0,448.2,155.6);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(14).to({_off:false},0).wait(1).to({regX:448.3,x:0.15,y:149.65},0).wait(1).to({y:133.6},0).wait(1).to({y:117.55},0).wait(1).to({y:101.5},0).wait(1).to({y:85.45},0).wait(1).to({y:64.95},0).wait(1).to({y:44.45},0).wait(1).to({y:23.95},0).wait(1).to({y:3.45},0).wait(1).to({y:-17.1},0).wait(1).to({y:-39.65},0).wait(1).to({y:-62.2},0).wait(1).to({y:-84.75},0).wait(1).to({y:-107.35},0).wait(1).to({y:-165.5},0).wait(46));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-448,-321.1,896.3,642.5);


(lib.課題 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.ClipGroup();
	this.instance.setTransform(100.15,-355.95,0.7395,0.7395,0,0,0,192.2,17.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(75));

	// レイヤー_16
	this.instance_1 = new lib.CachedBmp_9();
	this.instance_1.setTransform(274.05,-331.95);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(44).to({_off:false},0).wait(1).to({x:252.765,y:-331.9833},0).wait(1).to({x:231.48,y:-332.0167},0).wait(1).to({x:210.195,y:-332.05},0).wait(1).to({x:188.91,y:-332.0833},0).wait(1).to({x:167.625,y:-332.1167},0).wait(1).to({x:146.34,y:-332.15},0).wait(1).to({x:125.055,y:-332.1833},0).wait(1).to({x:103.77,y:-332.2167},0).wait(1).to({x:82.485,y:-332.25},0).wait(1).to({x:61.2,y:-332.2833},0).wait(1).to({x:39.915,y:-332.3167},0).wait(1).to({x:18.63,y:-332.35},0).wait(1).to({x:-2.655,y:-332.3833},0).wait(1).to({x:-23.94,y:-332.4167},0).wait(1).to({x:-45.225,y:-332.45},0).wait(1).to({x:-66.51,y:-332.4833},0).wait(1).to({x:-87.795,y:-332.5167},0).wait(1).to({x:-109.08,y:-332.55},0).wait(1).to({x:-130.365,y:-332.5833},0).wait(1).to({x:-151.65,y:-332.6167},0).wait(1).to({x:-172.935,y:-332.65},0).wait(1).to({x:-194.22,y:-332.6833},0).wait(1).to({x:-215.505,y:-332.7167},0).wait(1).to({x:-236.79,y:-332.75},0).wait(1).to({x:-258.075,y:-332.7833},0).wait(1).to({x:-279.36,y:-332.8167},0).wait(1).to({x:-300.645,y:-332.85},0).wait(1).to({x:-321.93,y:-332.8833},0).wait(1).to({x:-343.215,y:-332.9167},0).wait(1).to({x:-364.5,y:-332.95},0).wait(1));

	// レイヤー_13
	this.instance_2 = new lib.シンボル4();
	this.instance_2.setTransform(375.55,-240.7,0.8757,0.8757,0,0,0,124.7,64.9);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(34).to({_off:false},0).wait(1).to({regY:65.2,rotation:0.375,x:354.05,y:-239.2},0).wait(1).to({rotation:0.7499,x:332.5,y:-237.95},0).wait(1).to({rotation:1.1249,x:311,y:-236.75},0).wait(1).to({rotation:1.4999,x:289.5,y:-235.55},0).wait(1).to({rotation:1.8749,x:268,y:-234.35},0).wait(1).to({rotation:2.2498,x:246.45,y:-233.1},0).wait(1).to({rotation:2.6248,x:225,y:-231.85},0).wait(1).to({rotation:2.9998,x:203.45,y:-230.7},0).wait(1).to({rotation:3.3748,x:181.95,y:-229.4},0).wait(1).to({rotation:3.7497,x:160.4,y:-228.2},0).wait(1).to({rotation:4.1247,x:138.95,y:-227},0).wait(1).to({rotation:4.4997,x:117.4,y:-225.8},0).wait(1).to({rotation:4.8746,x:96,y:-224.5},0).wait(1).to({rotation:5.2496,x:74.5,y:-223.3},0).wait(1).to({rotation:5.6246,x:52.95,y:-222.1},0).wait(1).to({rotation:5.9996,x:31.5,y:-220.85},0).wait(1).to({rotation:6.3745,x:9.9,y:-219.65},0).wait(1).to({rotation:6.7495,x:-11.55,y:-218.4},0).wait(1).to({rotation:7.1245,x:-33.1,y:-217.2},0).wait(1).to({rotation:7.4995,x:-54.6,y:-216},0).wait(1).to({rotation:7.8744,x:-76.05,y:-214.75},0).wait(1).to({rotation:8.2494,x:-97.6,y:-213.55},0).wait(1).to({rotation:8.6244,x:-119.1,y:-212.35},0).wait(1).to({rotation:8.9993,x:-140.6,y:-211.05},0).wait(1).to({rotation:9.3743,x:-162.1,y:-209.85},0).wait(1).to({rotation:9.7493,x:-183.6,y:-208.65},0).wait(1).to({rotation:10.1243,x:-205.1,y:-207.4},0).wait(1).to({rotation:10.4992,x:-226.65,y:-206.2},0).wait(1).to({rotation:10.8742,x:-248.1,y:-205},0).wait(1).to({rotation:11.2492,x:-269.65,y:-203.75},0).wait(1).to({rotation:11.6241,x:-291.15,y:-202.55},0).wait(1).to({rotation:11.9991,x:-312.65,y:-201.3},0).wait(1).to({rotation:12.3741,x:-334.2,y:-200.1},0).wait(1).to({rotation:12.7491,x:-355.65,y:-198.85},0).wait(1).to({rotation:13.124,x:-377.15,y:-197.65},0).wait(1).to({rotation:13.499,x:-398.7,y:-196.45},0).wait(1).to({rotation:13.874,x:-420.2,y:-195.15},0).wait(1).to({rotation:14.249,x:-441.65,y:-193.95},0).wait(1).to({rotation:14.6239,x:-463.2,y:-192.75},0).wait(1).to({rotation:14.9989,x:-484.75,y:-191.55},0).wait(1));

	// 街
	this.instance_3 = new lib.街("synched",0);
	this.instance_3.setTransform(-205.8,239.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(75));

	// 流れ星
	this.instance_4 = new lib.流れ星("synched",0);
	this.instance_4.setTransform(-187.9,27.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({_off:true},29).wait(46));

	// 雲
	this.instance_5 = new lib.雲_1("synched",0);
	this.instance_5.setTransform(116.15,-306.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({_off:true},29).wait(46));

	// プレゼント１
	this.instance_6 = new lib.プレゼント１("synched",0);
	this.instance_6.setTransform(-257.5,-1.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({_off:true},29).wait(46));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-769.6,-560.6,1551.7,1121.4);


// stage content:
(lib.wf1_10_sakagami = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 課題
	this.instance = new lib.課題("synched",0);
	this.instance.setTransform(687.15,380.85);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(75));

	// 完成
	this.instance_1 = new lib.完成("synched",0);
	this.instance_1.setTransform(479.7,344.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},1).wait(74));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(397.5,140.3,1071.7,801.4000000000001);
// library properties:
lib.properties = {
	id: '14780F66C13A4C49822004A269E50AE2',
	width: 960,
	height: 640,
	fps: 24,
	color: "#333333",
	opacity: 1.00,
	manifest: [
		{src:"images/Image.png", id:"Image"},
		{src:"images/レイヤー0.png", id:"レイヤー0"},
		{src:"images/wf1_10_sakagami_atlas_1.png", id:"wf1_10_sakagami_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['14780F66C13A4C49822004A269E50AE2'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;