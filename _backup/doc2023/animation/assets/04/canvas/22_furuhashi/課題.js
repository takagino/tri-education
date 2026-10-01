(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"課題_atlas_1", frames: [[255,1183,60,71],[186,1183,67,90],[369,1183,100,130],[495,1082,125,228],[0,1082,184,218],[186,1082,307,99],[0,1302,367,50],[0,0,1920,1080]]}
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



(lib.CachedBmp_7 = function() {
	this.initialize(ss["課題_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["課題_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["課題_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["課題_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["課題_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["課題_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["課題_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Image = function() {
	this.initialize(img.Image);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2092,2991);


(lib.backgroundimage = function() {
	this.initialize(ss["課題_atlas_1"]);
	this.gotoAndStop(7);
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


(lib.飾り１ = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(0,-18.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-18.3,30,35.5);


(lib.木 = function(mode,startPosition,loop,reversed) {
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


(lib.シーン_1_背景 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 背景
	this.instance = new lib.backgroundimage();
	this.instance.setTransform(149,141,0.3316,0.3302);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(177));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.シーン_1_happywinter = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// happywinter
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(332.4,63.95,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:332.2262,y:63.893},0).wait(1).to({x:332.0524,y:63.836},0).wait(1).to({x:331.8787,y:63.7789},0).wait(1).to({x:331.7049,y:63.7219},0).wait(1).to({x:331.5311,y:63.6649},0).wait(1).to({x:331.3573,y:63.6079},0).wait(1).to({x:331.1836,y:63.5509},0).wait(1).to({x:331.0098,y:63.4938},0).wait(1).to({x:330.836,y:63.4368},0).wait(1).to({x:330.6622,y:63.3798},0).wait(1).to({x:330.4885,y:63.3228},0).wait(1).to({x:330.3147,y:63.2658},0).wait(1).to({x:330.1409,y:63.2088},0).wait(1).to({x:329.9671,y:63.1517},0).wait(1).to({x:329.7933,y:63.0947},0).wait(1).to({x:329.6196,y:63.0377},0).wait(1).to({x:329.4458,y:62.9807},0).wait(1).to({x:329.272,y:62.9237},0).wait(1).to({x:329.0983,y:62.8666},0).wait(1).to({x:328.9245,y:62.8096},0).wait(1).to({x:328.7507,y:62.7526},0).wait(1).to({x:328.5769,y:62.6956},0).wait(1).to({x:328.4031,y:62.6386},0).wait(1).to({x:328.2294,y:62.5815},0).wait(1).to({x:328.0556,y:62.5245},0).wait(1).to({x:327.8818,y:62.4675},0).wait(1).to({x:327.708,y:62.4105},0).wait(1).to({x:327.5343,y:62.3535},0).wait(1).to({x:327.3605,y:62.2965},0).wait(1).to({x:327.1867,y:62.2394},0).wait(1).to({x:327.0129,y:62.1824},0).wait(1).to({x:326.8392,y:62.1254},0).wait(1).to({x:326.6654,y:62.0684},0).wait(1).to({x:326.4916,y:62.0114},0).wait(1).to({x:326.3178,y:61.9543},0).wait(1).to({x:326.1441,y:61.8973},0).wait(1).to({x:325.9703,y:61.8403},0).wait(1).to({x:325.7965,y:61.7833},0).wait(1).to({x:325.6227,y:61.7263},0).wait(1).to({x:325.449,y:61.6692},0).wait(1).to({x:325.2752,y:61.6122},0).wait(1).to({x:325.1014,y:61.5552},0).wait(1).to({x:324.9276,y:61.4982},0).wait(1).to({x:324.7539,y:61.4412},0).wait(1).to({x:324.5801,y:61.3842},0).wait(1).to({x:324.4063,y:61.3271},0).wait(1).to({x:324.2325,y:61.2701},0).wait(1).to({x:324.0587,y:61.2131},0).wait(1).to({x:323.885,y:61.1561},0).wait(1).to({x:323.7112,y:61.0991},0).wait(1).to({x:323.5374,y:61.042},0).wait(1).to({x:323.3636,y:60.985},0).wait(1).to({x:323.1899,y:60.928},0).wait(1).to({x:323.0161,y:60.871},0).wait(1).to({x:322.8423,y:60.814},0).wait(1).to({x:322.6685,y:60.7569},0).wait(1).to({x:322.4948,y:60.6999},0).wait(1).to({x:322.321,y:60.6429},0).wait(1).to({x:322.1472,y:60.5859},0).wait(1).to({x:321.9734,y:60.5289},0).wait(1).to({x:321.7997,y:60.4719},0).wait(1).to({x:321.6259,y:60.4148},0).wait(1).to({x:321.4521,y:60.3578},0).wait(1).to({x:321.2783,y:60.3008},0).wait(1).to({x:321.1046,y:60.2438},0).wait(1).to({x:320.9308,y:60.1868},0).wait(1).to({x:320.757,y:60.1297},0).wait(1).to({x:320.5832,y:60.0727},0).wait(1).to({x:320.4094,y:60.0157},0).wait(1).to({x:320.2357,y:59.9587},0).wait(1).to({x:320.0619,y:59.9017},0).wait(1).to({x:319.8881,y:59.8446},0).wait(1).to({x:319.7143,y:59.7876},0).wait(1).to({x:319.5406,y:59.7306},0).wait(1).to({x:319.3668,y:59.6736},0).wait(1).to({x:319.193,y:59.6166},0).wait(1).to({x:319.0192,y:59.5595},0).wait(1).to({x:318.8455,y:59.5025},0).wait(1).to({x:318.6717,y:59.4455},0).wait(1).to({x:318.4979,y:59.3885},0).wait(1).to({x:318.3241,y:59.3315},0).wait(1).to({x:318.1504,y:59.2745},0).wait(1).to({x:317.9766,y:59.2174},0).wait(1).to({x:317.8028,y:59.1604},0).wait(1).to({x:317.629,y:59.1034},0).wait(1).to({x:317.4553,y:59.0464},0).wait(1).to({x:317.2815,y:58.9894},0).wait(1).to({x:317.1077,y:58.9323},0).wait(1).to({x:316.9339,y:58.8753},0).wait(1).to({x:316.7602,y:58.8183},0).wait(1).to({x:316.5864,y:58.7613},0).wait(1).to({x:316.4126,y:58.7043},0).wait(1).to({x:316.2388,y:58.6472},0).wait(1).to({x:316.065,y:58.5902},0).wait(1).to({x:315.8913,y:58.5332},0).wait(1).to({x:315.7175,y:58.4762},0).wait(1).to({x:315.5437,y:58.4192},0).wait(1).to({x:315.3699,y:58.3622},0).wait(1).to({x:315.1962,y:58.3051},0).wait(1).to({x:315.0224,y:58.2481},0).wait(1).to({x:314.8486,y:58.1911},0).wait(1).to({x:314.6748,y:58.1341},0).wait(1).to({x:314.5011,y:58.0771},0).wait(1).to({x:314.3273,y:58.02},0).wait(1).to({x:314.1535,y:57.963},0).wait(1).to({x:313.9797,y:57.906},0).wait(1).to({x:313.806,y:57.849},0).wait(1).to({x:313.6322,y:57.792},0).wait(1).to({x:313.4584,y:57.7349},0).wait(1).to({x:313.2846,y:57.6779},0).wait(1).to({x:313.1109,y:57.6209},0).wait(1).to({x:312.9371,y:57.5639},0).wait(1).to({x:312.7633,y:57.5069},0).wait(1).to({x:312.5895,y:57.4499},0).wait(1).to({x:312.4157,y:57.3928},0).wait(1).to({x:312.242,y:57.3358},0).wait(1).to({x:312.0682,y:57.2788},0).wait(1).to({x:311.8944,y:57.2218},0).wait(1).to({x:311.7206,y:57.1648},0).wait(1).to({x:311.5469,y:57.1077},0).wait(1).to({x:311.3731,y:57.0507},0).wait(1).to({x:311.1993,y:56.9937},0).wait(1).to({x:311.0255,y:56.9367},0).wait(1).to({x:310.8518,y:56.8797},0).wait(1).to({x:310.678,y:56.8226},0).wait(1).to({x:310.5042,y:56.7656},0).wait(1).to({x:310.3304,y:56.7086},0).wait(1).to({x:310.1567,y:56.6516},0).wait(1).to({x:309.9829,y:56.5946},0).wait(1).to({x:309.8091,y:56.5376},0).wait(1).to({x:309.6353,y:56.4805},0).wait(1).to({x:309.4616,y:56.4235},0).wait(1).to({x:309.2878,y:56.3665},0).wait(1).to({x:309.114,y:56.3095},0).wait(1).to({x:308.9402,y:56.2525},0).wait(1).to({x:308.7665,y:56.1954},0).wait(1).to({x:308.5927,y:56.1384},0).wait(1).to({x:308.4189,y:56.0814},0).wait(1).to({x:308.2779,y:76.589},0).wait(1).to({x:308.1369,y:97.0966},0).wait(1).to({x:307.9959,y:117.6043},0).wait(1).to({x:307.8549,y:138.1119},0).wait(1).to({x:307.714,y:158.6195},0).wait(1).to({x:307.573,y:179.1271},0).wait(1).to({x:307.432,y:199.6348},0).wait(1).to({x:307.291,y:220.1424},0).wait(1).to({x:307.15,y:240.65},0).wait(30));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.シンボル1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Image();
	this.instance.setTransform(0,0,0.1727,0.1727);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.シンボル1, new cjs.Rectangle(0,0,361.4,516.7), null);


(lib.イッヌ = function(mode,startPosition,loop,reversed) {
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
p.nominalBounds = new cjs.Rectangle(0,0,33.5,45);


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
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,65);


(lib.girl01svg = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,62.5,114);


(lib.boy1 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,92,109);


(lib.logo01svg = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,153.5,49.5);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-481,-321,962,642);


(lib.シーン_1_飾り = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 飾り
	this.instance = new lib.飾り１("synched",0);
	this.instance.setTransform(483.9,337.5,0.9999,0.9999,0,0,0,13.9,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:15,regY:-0.6,scaleX:0.997,scaleY:0.9957,x:484.95,y:336.9},0).wait(1).to({scaleX:0.9941,scaleY:0.9914},0).wait(1).to({scaleX:0.9912,scaleY:0.9871,x:484.9},0).wait(1).to({scaleX:0.9882,scaleY:0.9828},0).wait(1).to({scaleX:0.9853,scaleY:0.9785},0).wait(1).to({scaleX:0.9824,scaleY:0.9742},0).wait(1).to({scaleX:0.9794,scaleY:0.9699,x:484.85},0).wait(1).to({scaleX:0.9765,scaleY:0.9657},0).wait(1).to({scaleX:0.9736,scaleY:0.9614},0).wait(1).to({scaleX:0.9707,scaleY:0.9571,x:484.8,y:336.95},0).wait(1).to({scaleX:0.9677,scaleY:0.9528},0).wait(1).to({scaleX:0.9648,scaleY:0.9485,x:484.75},0).wait(1).to({scaleX:0.9619,scaleY:0.9442,x:484.8},0).wait(1).to({scaleX:0.9589,scaleY:0.9399,x:484.75},0).wait(1).to({scaleX:0.956,scaleY:0.9357},0).wait(1).to({scaleX:0.9531,scaleY:0.9314},0).wait(1).to({scaleX:0.9502,scaleY:0.9271,x:484.7},0).wait(1).to({scaleX:0.9472,scaleY:0.9228},0).wait(1).to({scaleX:0.9443,scaleY:0.9185,x:484.65},0).wait(1).to({scaleX:0.9414,scaleY:0.9142},0).wait(1).to({scaleX:0.9384,scaleY:0.9099},0).wait(1).to({scaleX:0.9355,scaleY:0.9057},0).wait(1).to({scaleX:0.9326,scaleY:0.9014},0).wait(1).to({scaleX:0.9296,scaleY:0.8971,x:484.6},0).wait(1).to({scaleX:0.9267,scaleY:0.8928},0).wait(1).to({scaleX:0.9238,scaleY:0.8885,x:484.55},0).wait(1).to({scaleX:0.9209,scaleY:0.8842},0).wait(1).to({scaleX:0.9179,scaleY:0.8799,x:484.5},0).wait(1).to({scaleX:0.915,scaleY:0.8756},0).wait(1).to({scaleX:0.9121,scaleY:0.8714,x:484.55,y:337},0).wait(1).to({scaleX:0.9091,scaleY:0.8671,x:484.5},0).wait(1).to({scaleX:0.9062,scaleY:0.8628},0).wait(1).to({scaleX:0.9033,scaleY:0.8585,x:484.45},0).wait(1).to({scaleX:0.9003,scaleY:0.8542},0).wait(1).to({scaleX:0.8974,scaleY:0.8499,x:484.4},0).wait(1).to({scaleX:0.8945,scaleY:0.8456},0).wait(1).to({scaleX:0.8916,scaleY:0.8414,x:484.35},0).wait(1).to({scaleX:0.8886,scaleY:0.8371,x:484.4},0).wait(1).to({scaleX:0.8857,scaleY:0.8328},0).wait(1).to({scaleX:0.8828,scaleY:0.8285,x:484.35},0).wait(1).to({scaleX:0.8798,scaleY:0.8242},0).wait(1).to({scaleX:0.8769,scaleY:0.8199,x:484.3},0).wait(1).to({scaleX:0.874,scaleY:0.8156},0).wait(1).to({scaleX:0.8711,scaleY:0.8113,x:484.25},0).wait(1).to({scaleX:0.8681,scaleY:0.8071},0).wait(1).to({scaleX:0.8652,scaleY:0.8028,x:484.3},0).wait(1).to({scaleX:0.8623,scaleY:0.7985,x:484.25},0).wait(1).to({scaleX:0.8593,scaleY:0.7942},0).wait(1).to({scaleX:0.8564,scaleY:0.7899,x:484.2,y:337.05},0).wait(1).to({scaleX:0.8535,scaleY:0.7856},0).wait(1).to({scaleX:0.8505,scaleY:0.7813,x:484.15},0).wait(1).to({scaleX:0.8476,scaleY:0.7771},0).wait(1).to({scaleX:0.8447,scaleY:0.7728},0).wait(1).to({scaleX:0.8418,scaleY:0.7685},0).wait(1).to({scaleX:0.8388,scaleY:0.7642},0).wait(1).to({scaleX:0.8359,scaleY:0.7599,x:484.1},0).wait(1).to({scaleX:0.833,scaleY:0.7556},0).wait(1).to({scaleX:0.83,scaleY:0.7513,x:484.05},0).wait(1).to({scaleX:0.8271,scaleY:0.7471},0).wait(1).to({scaleX:0.8242,scaleY:0.7428},0).wait(1).to({scaleX:0.8213,scaleY:0.7385,x:484},0).wait(1).to({scaleX:0.8183,scaleY:0.7342},0).wait(1).to({scaleX:0.8154,scaleY:0.7299},0).wait(1).to({scaleX:0.8125,scaleY:0.7256},0).wait(1).to({scaleX:0.8095,scaleY:0.7213,x:483.95},0).wait(1).to({scaleX:0.8066,scaleY:0.717},0).wait(1).to({scaleX:0.8037,scaleY:0.7128,x:483.9},0).wait(1).to({scaleX:0.8007,scaleY:0.7085},0).wait(1).to({scaleX:0.7978,scaleY:0.7042,y:337.1},0).wait(1).to({scaleX:0.7949,scaleY:0.6999,x:483.85},0).wait(1).to({scaleX:0.792,scaleY:0.6956,x:483.9},0).wait(1).to({scaleX:0.789,scaleY:0.6913,x:483.85},0).wait(1).to({scaleX:0.7861,scaleY:0.687},0).wait(1).to({scaleX:0.7832,scaleY:0.6828,x:483.8},0).wait(1).to({scaleX:0.7802,scaleY:0.6785},0).wait(1).to({scaleX:0.7773,scaleY:0.6742},0).wait(1).to({scaleX:0.7744,scaleY:0.6699,x:483.75},0).wait(1).to({scaleX:0.7715,scaleY:0.6656},0).wait(1).to({scaleX:0.7685,scaleY:0.6613},0).wait(1).to({scaleX:0.7656,scaleY:0.657},0).wait(1).to({scaleX:0.7627,scaleY:0.6527,x:483.7},0).wait(1).to({scaleX:0.7597,scaleY:0.6485},0).wait(1).to({scaleX:0.7568,scaleY:0.6442},0).wait(1).to({scaleX:0.7539,scaleY:0.6399,x:483.65},0).wait(1).to({scaleX:0.7509,scaleY:0.6356},0).wait(1).to({scaleX:0.748,scaleY:0.6313,x:483.6},0).wait(1).to({scaleX:0.7451,scaleY:0.627,x:483.65},0).wait(1).to({scaleX:0.7422,scaleY:0.6227,x:483.6,y:337.15},0).wait(1).to({scaleX:0.7392,scaleY:0.6185},0).wait(1).to({scaleX:0.7363,scaleY:0.6142},0).wait(1).to({scaleX:0.7334,scaleY:0.6099,x:483.55},0).wait(1).to({scaleX:0.7304,scaleY:0.6056},0).wait(1).to({scaleX:0.7275,scaleY:0.6013,x:483.5},0).wait(1).to({scaleX:0.7246,scaleY:0.597},0).wait(1).to({scaleX:0.7216,scaleY:0.5927,x:483.45},0).wait(1).to({scaleX:0.7187,scaleY:0.5884,x:483.5},0).wait(1).to({scaleX:0.7158,scaleY:0.5842,x:483.45},0).wait(1).to({scaleX:0.7129,scaleY:0.5799},0).wait(1).to({scaleX:0.7099,scaleY:0.5756},0).wait(1).to({scaleX:0.707,scaleY:0.5713,x:483.4},0).wait(1).to({scaleX:0.7041,scaleY:0.567},0).wait(1).to({scaleX:0.8265,scaleY:0.6641,x:472.15,y:320.9},0).wait(1).to({scaleX:0.9489,scaleY:0.7611,x:460.95,y:304.65},0).wait(1).to({scaleX:1.0713,scaleY:0.8581,x:449.7,y:288.4},0).wait(1).to({scaleX:1.1937,scaleY:0.9552,x:438.45,y:272.2},0).wait(1).to({scaleX:1.3161,scaleY:1.0522,x:427.25,y:255.9},0).wait(1).to({scaleX:1.4384,scaleY:1.1493,x:416,y:239.65},0).wait(1).to({scaleX:1.5608,scaleY:1.2463,x:404.75,y:223.45},0).wait(1).to({scaleX:1.6832,scaleY:1.3433,x:393.55,y:207.2},0).wait(1).to({scaleX:1.8056,scaleY:1.4404,x:382.3,y:190.95},0).wait(1).to({scaleX:1.928,scaleY:1.5374,x:371.05,y:174.7},0).wait(1).to({scaleX:2.0504,scaleY:1.6345,x:359.85,y:158.45},0).wait(1).to({scaleX:2.1728,scaleY:1.7315,x:348.6,y:142.2},0).wait(1).to({scaleX:2.2952,scaleY:1.8285,x:337.4,y:125.95},0).wait(1).to({scaleX:2.4176,scaleY:1.9256,x:326.1,y:109.75},0).wait(1).to({scaleX:2.4321,scaleY:1.9371,x:384.15,y:106.2},0).wait(1).to({scaleX:2.4465,scaleY:1.9486,x:442.15,y:102.65},0).wait(1).to({scaleX:2.4609,scaleY:1.9601,x:500.15,y:99.05},0).wait(1).to({scaleX:2.4754,scaleY:1.9717,x:558.2,y:95.5},0).wait(1).to({scaleX:2.4898,scaleY:1.9832,x:616.2,y:91.95},0).wait(1).to({scaleX:2.5043,scaleY:1.9947,x:674.15,y:88.4},0).wait(1).to({scaleX:2.5187,scaleY:2.0062,x:732.2,y:84.9},0).wait(1).to({scaleX:2.5332,scaleY:2.0178,x:728.4,y:100.4},0).wait(1).to({scaleX:2.5476,scaleY:2.0293,x:724.65,y:115.9},0).wait(1).to({scaleX:2.5621,scaleY:2.0408,x:720.9,y:131.4},0).wait(1).to({scaleX:2.5765,scaleY:2.0524,x:717.1,y:146.85},0).wait(1).to({scaleX:2.591,scaleY:2.0639,x:713.3,y:162.35},0).wait(1).to({scaleX:2.6054,scaleY:2.0755,x:709.6,y:177.85},0).wait(1).to({scaleX:2.6198,scaleY:2.087,x:705.8,y:193.35},0).wait(1).to({scaleX:2.6343,scaleY:2.0986,x:702,y:208.85},0).wait(1).to({scaleX:2.6487,scaleY:2.1101,x:698.25,y:224.35},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.シーン_1_素材_雪だるま = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 素材_雪だるま
	this.instance = new lib.goods02svg("synched",0);
	this.instance.setTransform(482.8,343.5,0.53,0.53,0,0,0,1.2,57.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:25,regY:32.5,scaleY:0.5299,x:495.35,y:330.4},0).wait(1).to({scaleY:0.5298},0).wait(1).to({scaleY:0.5297},0).wait(1).to({scaleY:0.5296},0).wait(1).to({scaleY:0.5295},0).wait(1).to({scaleY:0.5294},0).wait(1).to({scaleY:0.5293},0).wait(1).to({startPosition:0},0).wait(1).to({scaleY:0.5292},0).wait(1).to({scaleY:0.5291,y:330.45},0).wait(1).to({scaleY:0.529},0).wait(1).to({scaleY:0.5289},0).wait(1).to({scaleY:0.5288},0).wait(1).to({scaleY:0.5287},0).wait(1).to({scaleY:0.5286},0).wait(1).to({scaleY:0.5285},0).wait(1).to({scaleY:0.5284,y:330.4},0).wait(1).to({scaleY:0.5283},0).wait(1).to({scaleY:0.5282,y:330.45},0).wait(1).to({scaleY:0.5281},0).wait(1).to({scaleY:0.528},0).wait(1).to({scaleY:0.5279},0).wait(1).to({startPosition:0},0).wait(1).to({scaleY:0.5278},0).wait(1).to({scaleY:0.5277,rotation:2.022,x:497.4,y:330.9},0).wait(1).to({scaleY:0.5276,rotation:4.044,x:499.4,y:331.4},0).wait(1).to({scaleY:0.5275,rotation:6.066,x:501.45,y:331.85},0).wait(1).to({scaleY:0.5274,rotation:8.088,x:503.35,y:332.35},0).wait(1).to({scaleY:0.5273,rotation:10.11,x:505.35,y:332.9},0).wait(1).to({scaleY:0.5272,rotation:12.1321,x:507.25,y:333.4},0).wait(1).to({scaleY:0.5271,rotation:14.1541,x:509.2,y:333.95},0).wait(1).to({scaleY:0.527,rotation:16.1761,x:511.15,y:334.5},0).wait(1).to({scaleY:0.5269,rotation:18.1981,x:513,y:335.05},0).wait(1).to({scaleY:0.5268,rotation:20.2201,x:514.85,y:335.65},0).wait(1).to({scaleY:0.5267,rotation:22.2421,x:516.65,y:336.2},0).wait(1).to({scaleY:0.5266,rotation:22.6206,x:516.85,y:336.35},0).wait(1).to({rotation:22.9991,x:517,y:336.45},0).wait(1).to({scaleY:0.5265,rotation:23.3777,x:517.15,y:336.55},0).wait(1).to({scaleY:0.5264,rotation:23.7562,x:517.3,y:336.65},0).wait(1).to({scaleY:0.5263,rotation:24.1347,x:517.45,y:336.75},0).wait(1).to({scaleY:0.5262,rotation:24.5132,x:517.6,y:336.9},0).wait(1).to({scaleY:0.5261,rotation:24.8917,x:517.7,y:337},0).wait(1).to({scaleY:0.526,rotation:25.2703,x:517.9,y:337.1},0).wait(1).to({scaleY:0.5259,rotation:25.6488,x:518,y:337.25},0).wait(1).to({scaleY:0.5258,rotation:26.0273,x:518.15,y:337.35},0).wait(1).to({scaleY:0.5257,rotation:26.4058,x:518.25,y:337.45},0).wait(1).to({scaleY:0.5256,rotation:26.7843,x:518.45,y:337.55},0).wait(1).to({scaleY:0.5255,rotation:27.1629,x:518.55,y:337.7},0).wait(1).to({scaleY:0.5254,rotation:27.5414,x:518.65,y:337.85},0).wait(1).to({scaleY:0.5253,rotation:27.9199,x:518.75,y:337.95},0).wait(1).to({scaleY:0.5252,rotation:28.2984,x:518.85,y:338.1},0).wait(1).to({scaleY:0.5251,rotation:28.6769,x:518.95},0).wait(1).to({rotation:29.0554,x:519.1,y:338.25},0).wait(1).to({scaleY:0.525,rotation:29.434,x:519.2,y:338.35},0).wait(1).to({scaleY:0.5249,rotation:29.8125,x:519.3,y:338.5},0).wait(1).to({scaleY:0.5248,rotation:30.191,x:519.4,y:338.6},0).wait(1).to({scaleY:0.5247,rotation:30.5695,x:519.55,y:338.75},0).wait(1).to({scaleY:0.5246,rotation:30.948,x:519.6,y:338.8},0).wait(1).to({scaleY:0.5245,rotation:31.3266,x:519.7,y:338.95},0).wait(1).to({scaleY:0.5244,rotation:31.7051,x:519.8,y:339.1},0).wait(1).to({scaleY:0.5243,rotation:32.0836,x:519.9,y:339.25},0).wait(1).to({scaleY:0.5242,rotation:32.4621,x:519.95,y:339.3},0).wait(1).to({scaleY:0.5241,rotation:32.8406,x:520.05,y:339.45},0).wait(1).to({scaleY:0.524,rotation:33.2192,x:520.1,y:339.55},0).wait(1).to({scaleY:0.5239,rotation:33.5977,x:520.2,y:339.7},0).wait(1).to({scaleY:0.5238,rotation:33.9762,x:520.25,y:339.8},0).wait(1).to({rotation:32.1017,x:520.1,y:339.2},0).wait(1).to({scaleY:0.5237,rotation:30.2271,x:520.05,y:338.65},0).wait(1).to({scaleY:0.5236,rotation:28.3526,x:519.85,y:338.05},0).wait(1).to({scaleY:0.5235,rotation:26.478,x:519.7,y:337.55},0).wait(1).to({scaleY:0.5234,rotation:24.6035,x:519.55,y:336.95},0).wait(1).to({scaleY:0.5233,rotation:22.7289,x:519.35,y:336.45},0).wait(1).to({scaleY:0.5232,rotation:20.8544,x:519.15,y:335.9},0).wait(1).to({scaleY:0.5231,rotation:18.9798,x:518.85,y:335.4},0).wait(1).to({scaleY:0.523,rotation:21.1219,x:519.15,y:335.95},0).wait(1).to({scaleY:0.5229,rotation:23.264,x:519.4,y:336.6},0).wait(1).to({scaleY:0.5228,rotation:25.4061,x:519.65,y:337.25},0).wait(1).to({scaleY:0.5227,rotation:27.5481,x:519.9,y:337.9},0).wait(1).to({scaleY:0.5226,rotation:29.6902,x:520.05,y:338.5},0).wait(1).to({scaleY:0.5225,rotation:31.8323,x:520.2,y:339.2},0).wait(1).to({scaleY:0.5224,rotation:33.9744,x:520.3,y:339.85},0).wait(1).to({rotation:30.1418,x:520,y:338.65},0).wait(1).to({scaleY:0.5223,rotation:26.3093,x:519.65,y:337.45},0).wait(1).to({scaleY:0.5222,rotation:22.4767,x:519.1,y:336.4},0).wait(1).to({scaleY:0.5221,rotation:18.6441,x:518.5,y:335.35},0).wait(1).to({scaleY:0.522,rotation:14.8116,x:517.8,y:334.25},0).wait(1).to({scaleY:0.5219,rotation:10.979,x:517.05,y:333.2},0).wait(1).to({scaleY:0.5218,rotation:14.8878,x:517.65,y:334.3},0).wait(1).to({scaleY:0.5217,rotation:18.7966,x:518.15,y:335.35},0).wait(1).to({scaleY:0.5216,rotation:22.7055,x:518.5,y:336.45},0).wait(1).to({scaleY:0.5215,rotation:26.6143,x:518.8,y:337.65},0).wait(1).to({scaleY:0.5214,rotation:30.5231,x:518.95,y:338.8},0).wait(1).to({scaleY:0.5213,rotation:34.4319,x:519.05,y:340},0).wait(1).to({scaleY:0.5212,rotation:28.435,x:518.35,y:338.15},0).wait(1).to({scaleY:0.5211,rotation:22.438,x:517.4,y:336.4},0).wait(1).to({scaleY:0.521,rotation:16.4411,x:515.5,y:334.7},0).wait(1).to({rotation:10.4442,x:511.65,y:333.1},0).wait(1).to({scaleY:0.5209,rotation:4.4472,x:504.85,y:331.7},0).wait(1).to({scaleY:0.5208,rotation:-1.5497,x:492.3,y:330.3},0).wait(1).to({scaleX:0.637,scaleY:0.5207,rotation:-1.5497,x:491.9,y:314.1},0).wait(1).to({scaleX:0.744,scaleY:0.5206,x:491.5,y:297.95},0).wait(1).to({scaleX:0.851,scaleY:0.5205,x:491.05,y:281.8},0).wait(1).to({scaleX:0.9581,scaleY:0.5204,x:490.65,y:265.65},0).wait(1).to({scaleX:1.0651,scaleY:0.5203,x:490.25,y:249.5},0).wait(1).to({scaleX:1.1721,scaleY:0.5202,x:489.85,y:233.35},0).wait(1).to({scaleX:1.2791,scaleY:0.7359,x:489.25,y:211.85},0).wait(1).to({scaleX:1.3861,scaleY:0.9515,x:488.75,y:190.35},0).wait(1).to({scaleX:1.4931,scaleY:1.1672,x:488.2,y:168.85},0).wait(1).to({scaleX:1.6001,scaleY:1.3828,x:487.6,y:147.35},0).wait(1).to({scaleX:1.7071,scaleY:1.5985,x:487.05,y:125.9},0).wait(1).to({scaleX:1.8141,scaleY:1.8142,x:486.5,y:104.35},0).wait(1).to({y:103.5},0).wait(1).to({y:102.65},0).wait(1).to({y:101.8},0).wait(1).to({scaleY:1.8141,y:100.9},0).wait(1).to({y:100.05},0).wait(1).to({y:99.2},0).wait(1).to({y:98.35},0).wait(1).to({y:97.5},0).wait(1).to({y:96.6},0).wait(1).to({y:95.75},0).wait(1).to({y:94.9},0).wait(1).to({y:94.05},0).wait(1).to({y:93.2},0).wait(1).to({y:92.35},0).wait(1).to({y:91.45},0).wait(1).to({y:90.6},0).wait(1).to({y:89.75},0).wait(1).to({y:88.9},0).wait(1).to({y:88.05},0).wait(1).to({y:87.15},0).wait(1).to({y:86.3},0).wait(1).to({y:85.45},0).wait(1).to({y:84.6},0).wait(1).to({y:83.75},0).wait(1).to({y:82.85},0).wait(1).to({y:82},0).wait(1).to({y:81.15},0).wait(1).to({y:80.3},0).wait(1).to({y:79.45},0).wait(1).to({y:78.6},0).wait(1).to({y:77.7},0).wait(1).to({y:76.85},0).wait(1).to({y:76},0).wait(1).to({y:75.15},0).wait(1).to({y:74.3},0).wait(1).to({y:73.4},0).wait(1).to({y:72.55},0).wait(1).to({y:99.8},0).wait(1).to({y:127},0).wait(1).to({y:154.25},0).wait(1).to({y:181.45},0).wait(1).to({y:208.65},0).wait(1).to({y:235.9},0).wait(1).to({y:263.1},0).wait(1).to({y:290.35},0).wait(1).to({y:317.55},0).wait(1).to({y:344.75},0).wait(1).to({scaleY:1.814,y:372},0).wait(1).to({y:399.2},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.シーン_1_素材_イッヌ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 素材_イッヌ
	this.instance = new lib.イッヌ("synched",0);
	this.instance.setTransform(482.1,330.3,0.42,0.22,0,0,0,16.6,21.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:16.8,regY:22.5,scaleX:0.4217,scaleY:0.222,x:482.2,y:330.55},0).wait(1).to({scaleX:0.4234,scaleY:0.224,x:482.15},0).wait(1).to({scaleX:0.4252,scaleY:0.2259,x:482.2},0).wait(1).to({scaleX:0.4269,scaleY:0.2279,x:482.15},0).wait(1).to({scaleX:0.4286,scaleY:0.2299,x:482.2,y:330.5},0).wait(1).to({scaleX:0.4303,scaleY:0.2319},0).wait(1).to({scaleX:0.432,scaleY:0.2338},0).wait(1).to({scaleX:0.4338,scaleY:0.2358},0).wait(1).to({scaleX:0.4355,scaleY:0.2378,x:482.15},0).wait(1).to({scaleX:0.4372,scaleY:0.2397,x:482.2},0).wait(1).to({scaleX:0.4389,scaleY:0.2417,x:482.15},0).wait(1).to({scaleX:0.4406,scaleY:0.2437,x:482.2},0).wait(1).to({scaleX:0.4424,scaleY:0.2456},0).wait(1).to({scaleX:0.4441,scaleY:0.2476,y:330.4},0).wait(1).to({scaleX:0.4458,scaleY:0.2496},0).wait(1).to({scaleX:0.4475,scaleY:0.2515,x:482.15},0).wait(1).to({scaleX:0.4493,scaleY:0.2535,x:482.2},0).wait(1).to({scaleX:0.451,scaleY:0.2555},0).wait(1).to({scaleX:0.4527,scaleY:0.2574},0).wait(1).to({scaleX:0.4544,scaleY:0.2594},0).wait(1).to({scaleX:0.4561,scaleY:0.2614},0).wait(1).to({scaleX:0.4579,scaleY:0.2633},0).wait(1).to({scaleX:0.4596,scaleY:0.2653,x:482.15,y:330.35},0).wait(1).to({scaleX:0.4613,scaleY:0.2673,x:482.2},0).wait(1).to({scaleX:0.463,scaleY:0.2693},0).wait(1).to({scaleX:0.4647,scaleY:0.2712},0).wait(1).to({scaleX:0.4665,scaleY:0.2732},0).wait(1).to({scaleX:0.4682,scaleY:0.2752,y:330.3},0).wait(1).to({scaleX:0.4699,scaleY:0.2771},0).wait(1).to({scaleX:0.4716,scaleY:0.2791,x:482.15},0).wait(1).to({scaleX:0.4733,scaleY:0.2811,x:482.2,y:330.25},0).wait(1).to({scaleX:0.4751,scaleY:0.283},0).wait(1).to({scaleX:0.4768,scaleY:0.285},0).wait(1).to({scaleX:0.4785,scaleY:0.287},0).wait(1).to({scaleX:0.4802,scaleY:0.2889},0).wait(1).to({scaleX:0.4819,scaleY:0.2909},0).wait(1).to({scaleX:0.4837,scaleY:0.2929},0).wait(1).to({scaleX:0.4854,scaleY:0.2948},0).wait(1).to({scaleX:0.4871,scaleY:0.2968},0).wait(1).to({scaleX:0.4888,scaleY:0.2988,y:330.2},0).wait(1).to({scaleX:0.4906,scaleY:0.3007},0).wait(1).to({scaleX:0.4923,scaleY:0.3027,y:330.15},0).wait(1).to({scaleX:0.494,scaleY:0.3047},0).wait(1).to({scaleX:0.4957,scaleY:0.3067},0).wait(1).to({scaleX:0.4974,scaleY:0.3086},0).wait(1).to({scaleX:0.4992,scaleY:0.3106},0).wait(1).to({scaleX:0.5009,scaleY:0.3126},0).wait(1).to({scaleX:0.5026,scaleY:0.3145},0).wait(1).to({scaleX:0.5043,scaleY:0.3165,y:330.1},0).wait(1).to({scaleX:0.506,scaleY:0.3185},0).wait(1).to({scaleX:0.5078,scaleY:0.3204},0).wait(1).to({scaleX:0.5095,scaleY:0.3224},0).wait(1).to({scaleX:0.5112,scaleY:0.3244},0).wait(1).to({scaleX:0.5129,scaleY:0.3263},0).wait(1).to({scaleX:0.5146,scaleY:0.3283,y:330.05},0).wait(1).to({scaleX:0.5164,scaleY:0.3303},0).wait(1).to({scaleX:0.5181,scaleY:0.3322},0).wait(1).to({scaleX:0.5198,scaleY:0.3342,y:330},0).wait(1).to({scaleX:0.5215,scaleY:0.3362},0).wait(1).to({scaleX:0.5232,scaleY:0.3381},0).wait(1).to({scaleX:0.525,scaleY:0.3401},0).wait(1).to({scaleX:0.5267,scaleY:0.3421},0).wait(1).to({scaleX:0.5284,scaleY:0.3441,x:482.25},0).wait(1).to({scaleX:0.5301,scaleY:0.346,x:482.2},0).wait(1).to({scaleX:0.5318,scaleY:0.348},0).wait(1).to({scaleX:0.5336,scaleY:0.35,y:329.95},0).wait(1).to({scaleX:0.5353,scaleY:0.3519},0).wait(1).to({scaleX:0.537,scaleY:0.3539},0).wait(1).to({scaleX:0.5387,scaleY:0.3559,y:329.9},0).wait(1).to({scaleX:0.5405,scaleY:0.3578,x:482.25},0).wait(1).to({scaleX:0.5422,scaleY:0.3598,x:482.2},0).wait(1).to({scaleX:0.5439,scaleY:0.3618},0).wait(1).to({scaleX:0.5456,scaleY:0.3637},0).wait(1).to({scaleX:0.5473,scaleY:0.3657},0).wait(1).to({scaleX:0.5491,scaleY:0.3677,y:329.85},0).wait(1).to({scaleX:0.5508,scaleY:0.3696},0).wait(1).to({scaleX:0.5525,scaleY:0.3716,x:482.25},0).wait(1).to({scaleX:0.5542,scaleY:0.3736,x:482.2},0).wait(1).to({scaleX:0.5559,scaleY:0.3755,x:482.25},0).wait(1).to({scaleX:0.5577,scaleY:0.3775,x:482.2},0).wait(1).to({scaleX:0.5594,scaleY:0.3795},0).wait(1).to({scaleX:0.5611,scaleY:0.3815,x:482.25},0).wait(1).to({scaleX:0.5628,scaleY:0.3834,x:482.2,y:329.8},0).wait(1).to({scaleX:0.5645,scaleY:0.3854,x:482.25,y:329.75},0).wait(1).to({scaleX:0.5663,scaleY:0.3874,x:482.2},0).wait(1).to({scaleX:0.568,scaleY:0.3893,x:482.25},0).wait(1).to({scaleX:0.5697,scaleY:0.3913,x:482.2},0).wait(1).to({scaleX:0.5714,scaleY:0.3933},0).wait(1).to({scaleX:0.5731,scaleY:0.3952,x:482.25},0).wait(1).to({scaleX:0.5749,scaleY:0.3972,x:482.2},0).wait(1).to({scaleX:0.5766,scaleY:0.3992,x:482.25},0).wait(1).to({scaleX:0.5783,scaleY:0.4011,x:482.2},0).wait(1).to({scaleX:0.58,scaleY:0.4031,x:482.25,y:329.7},0).wait(1).to({scaleX:0.5817,scaleY:0.4051,x:482.2},0).wait(1).to({scaleX:0.5835,scaleY:0.407},0).wait(1).to({scaleX:0.5852,scaleY:0.409,x:482.25},0).wait(1).to({scaleX:0.5869,scaleY:0.411,x:482.2,y:329.65},0).wait(1).to({scaleX:0.5886,scaleY:0.4129,x:482.25},0).wait(1).to({scaleX:0.5904,scaleY:0.4149,x:482.2},0).wait(1).to({scaleX:0.5921,scaleY:0.4169,x:482.25},0).wait(1).to({scaleX:0.7955,scaleY:0.6364,x:503,y:307.35},0).wait(1).to({scaleX:0.9989,scaleY:0.8559,x:523.85,y:285.1},0).wait(1).to({scaleX:1.2024,scaleY:1.0754,x:544.65,y:262.85},0).wait(1).to({scaleX:1.4058,scaleY:1.2949,x:565.45,y:240.6},0).wait(1).to({scaleX:1.6092,scaleY:1.5145,x:586.25,y:218.35},0).wait(1).to({scaleX:1.8127,scaleY:1.734,x:607.05,y:196},0).wait(1).to({scaleX:2.0161,scaleY:1.9535,x:627.85,y:173.75},0).wait(1).to({scaleX:2.2196,scaleY:2.173,x:648.7,y:151.5},0).wait(1).to({scaleX:2.423,scaleY:2.3925,x:669.45,y:129.25},0).wait(1).to({scaleX:2.6264,scaleY:2.612,x:690.25,y:106.95},0).wait(1).to({scaleX:2.8299,scaleY:2.8315,x:711.1,y:84.7},0).wait(1).to({scaleX:2.8298,x:704.6,y:83.35},0).wait(1).to({x:698.1,y:82},0).wait(1).to({x:691.55,y:80.7},0).wait(1).to({scaleX:2.8297,scaleY:2.8314,x:685.05,y:79.35},0).wait(1).to({x:678.55,y:78},0).wait(1).to({x:672.05,y:76.65},0).wait(1).to({x:665.55,y:75.35},0).wait(1).to({scaleX:2.8296,scaleY:2.8313,x:659.05,y:74},0).wait(1).to({x:652.55,y:72.65},0).wait(1).to({x:646.05,y:71.3},0).wait(1).to({scaleX:2.8295,x:639.5,y:70},0).wait(1).to({scaleX:2.8296,x:641,y:105.95},0).wait(1).to({x:642.5,y:141.9},0).wait(1).to({x:644.05,y:177.8},0).wait(1).to({x:645.55,y:213.75},0).wait(1).to({scaleX:2.8297,scaleY:2.8314,x:647.05,y:249.7},0).wait(1).to({x:648.55,y:285.65},0).wait(1).to({x:650.05,y:321.6},0).wait(1).to({x:651.55,y:357.55},0).wait(1).to({x:653.05,y:393.5},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.シーン_1_木 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 木
	this.instance = new lib.木("synched",0);
	this.instance.setTransform(484.2,304.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:8,regY:19.9,scaleX:0.9959,scaleY:0.9959,x:492.15,y:324.7},0).wait(1).to({scaleX:0.9918,scaleY:0.9918,y:325.45},0).wait(1).to({scaleX:0.9877,scaleY:0.9877,x:492.1,y:326.15},0).wait(1).to({scaleX:0.9836,scaleY:0.9836,x:492.05,y:326.9},0).wait(1).to({scaleX:0.9795,scaleY:0.9795,y:327.65},0).wait(1).to({scaleX:0.9754,scaleY:0.9754,x:492,y:328.35},0).wait(1).to({scaleX:0.9713,scaleY:0.9713,x:491.95,y:329.15},0).wait(1).to({scaleX:0.9672,scaleY:0.9672,x:492,y:329.85},0).wait(1).to({scaleX:0.9631,scaleY:0.9631,x:491.95,y:330.55},0).wait(1).to({scaleX:0.959,scaleY:0.959,x:491.9,y:331.35},0).wait(1).to({scaleX:0.9549,scaleY:0.9549,y:332.05},0).wait(1).to({scaleX:0.9508,scaleY:0.9508,x:491.85,y:332.75},0).wait(1).to({scaleX:0.9467,scaleY:0.9467,x:491.8,y:333.55},0).wait(1).to({scaleX:0.9427,scaleY:0.9427,y:334.25},0).wait(1).to({scaleX:0.9386,scaleY:0.9386,y:335},0).wait(1).to({scaleX:0.9345,scaleY:0.9345,y:335.75},0).wait(1).to({scaleX:0.9304,scaleY:0.9304,x:491.75,y:335.8},0).wait(1).to({scaleX:0.9263,scaleY:0.9263,x:491.7,y:335.95},0).wait(1).to({scaleX:0.9222,scaleY:0.9222,y:336.05},0).wait(1).to({scaleX:0.9181,scaleY:0.9181,x:491.65,y:336.1},0).wait(1).to({scaleX:0.914,scaleY:0.914,x:491.6,y:336.25},0).wait(1).to({scaleX:0.9099,scaleY:0.9099,x:491.65,y:336.35},0).wait(1).to({scaleX:0.9058,scaleY:0.9058,x:491.6,y:336.45},0).wait(1).to({scaleX:0.9017,scaleY:0.9017,x:491.55,y:336.55},0).wait(1).to({scaleX:0.8976,scaleY:0.8976,y:336.65},0).wait(1).to({scaleX:0.8935,scaleY:0.8935,x:491.5,y:336.75},0).wait(1).to({scaleX:0.8894,scaleY:0.8894,x:491.45,y:336.85},0).wait(1).to({scaleX:0.8853,scaleY:0.8853,y:336.95},0).wait(1).to({scaleX:0.8812,scaleY:0.8812,y:337.05},0).wait(1).to({scaleX:0.8771,scaleY:0.8771,x:491.4,y:337.15},0).wait(1).to({scaleX:0.873,scaleY:0.873,y:337.25},0).wait(1).to({scaleX:0.8689,scaleY:0.8689,x:491.35,y:337.35},0).wait(1).to({scaleX:0.8648,scaleY:0.8648,x:491.3,y:337.45},0).wait(1).to({scaleX:0.8608,scaleY:0.8608,y:337.6},0).wait(1).to({scaleX:0.8567,scaleY:0.8567,x:491.25,y:337.65},0).wait(1).to({scaleX:0.8526,scaleY:0.8526,y:337.75},0).wait(1).to({scaleX:0.8485,scaleY:0.8485,y:337.9},0).wait(1).to({scaleX:0.8444,scaleY:0.8444,x:491.2,y:337.95},0).wait(1).to({scaleX:0.8403,scaleY:0.8403,x:491.15,y:338.05},0).wait(1).to({scaleX:0.8362,scaleY:0.8362,y:338.2},0).wait(1).to({scaleX:0.8321,scaleY:0.8321,x:491.1,y:338.25},0).wait(1).to({scaleX:0.828,scaleY:0.828,x:491.05,y:338.4},0).wait(1).to({scaleX:0.8239,scaleY:0.8239,x:491.1,y:338.5},0).wait(1).to({scaleX:0.8198,scaleY:0.8198,x:491.05,y:338.55},0).wait(1).to({scaleX:0.8157,scaleY:0.8157,y:338.7},0).wait(1).to({scaleX:0.8116,scaleY:0.8116,x:491,y:338.8},0).wait(1).to({scaleX:0.8075,scaleY:0.8075,x:490.95,y:338.85},0).wait(1).to({scaleX:0.8034,scaleY:0.8034,y:339},0).wait(1).to({scaleX:0.7993,scaleY:0.7993,x:490.9,y:339.1},0).wait(1).to({scaleX:0.7952,scaleY:0.7952,y:339.2},0).wait(1).to({scaleX:0.7911,scaleY:0.7911,y:339.3},0).wait(1).to({scaleX:0.787,scaleY:0.787,x:490.85,y:339.4},0).wait(1).to({scaleX:0.7829,scaleY:0.7829,x:490.8,y:339.5},0).wait(1).to({scaleX:0.7789,scaleY:0.7789,y:339.6},0).wait(1).to({scaleX:0.7748,scaleY:0.7748,x:490.75,y:339.7},0).wait(1).to({scaleX:0.7707,scaleY:0.7707,x:490.7,y:339.8},0).wait(1).to({scaleX:0.7666,scaleY:0.7666,x:490.75,y:339.9},0).wait(1).to({scaleX:0.7625,scaleY:0.7625,x:490.7,y:340},0).wait(1).to({scaleX:0.7584,scaleY:0.7584,x:490.65,y:340.15},0).wait(1).to({scaleX:0.7543,scaleY:0.7543,y:340.2},0).wait(1).to({scaleX:0.7502,scaleY:0.7502,x:490.6,y:340.35},0).wait(1).to({scaleX:0.7461,scaleY:0.7461,x:490.55,y:340.45},0).wait(1).to({scaleX:0.742,scaleY:0.742,y:340.5},0).wait(1).to({scaleX:0.7379,scaleY:0.7379,y:340.65},0).wait(1).to({scaleX:0.7338,scaleY:0.7338,x:490.5,y:340.75},0).wait(1).to({scaleX:0.7297,scaleY:0.7297,y:340.8},0).wait(1).to({scaleX:0.7256,scaleY:0.7256,x:490.45,y:340.95},0).wait(1).to({scaleX:0.7215,scaleY:0.7215,x:490.4,y:341.05},0).wait(1).to({scaleX:0.7174,scaleY:0.7174,y:341.15},0).wait(1).to({scaleX:0.7133,scaleY:0.7133,x:490.35,y:341.25},0).wait(1).to({scaleX:0.7092,scaleY:0.7092,y:341.35},0).wait(1).to({scaleX:0.7051,scaleY:0.7051,y:341.45},0).wait(1).to({scaleX:0.701,scaleY:0.701,x:490.3,y:341.55},0).wait(1).to({scaleX:0.697,scaleY:0.697,y:341.65},0).wait(1).to({scaleX:0.6929,scaleY:0.6929,x:490.25,y:341.75},0).wait(1).to({scaleX:0.6888,scaleY:0.6888,x:490.2,y:341.85},0).wait(1).to({scaleX:0.6847,scaleY:0.6847,y:341.95},0).wait(1).to({scaleX:0.6806,scaleY:0.6806,y:342.05},0).wait(1).to({scaleX:0.6765,scaleY:0.6765,x:490.15,y:342.15},0).wait(1).to({scaleX:0.6724,scaleY:0.6724,y:342.3},0).wait(1).to({scaleX:0.6683,scaleY:0.6683,x:490.1,y:342.35},0).wait(1).to({scaleX:0.6642,scaleY:0.6642,x:490.05,y:342.45},0).wait(1).to({scaleX:0.6601,scaleY:0.6601,y:342.6},0).wait(1).to({scaleX:0.656,scaleY:0.656,x:490,y:342.65},0).wait(1).to({scaleX:0.6519,scaleY:0.6519,y:342.75},0).wait(1).to({scaleX:0.6478,scaleY:0.6478,y:342.9},0).wait(1).to({scaleX:0.6437,scaleY:0.6437,x:489.95,y:342.95},0).wait(1).to({scaleX:0.6396,scaleY:0.6396,x:489.9,y:343.1},0).wait(1).to({scaleX:0.6355,scaleY:0.6355,y:343.2},0).wait(1).to({scaleX:0.6314,scaleY:0.6314,x:489.85,y:343.25},0).wait(1).to({scaleX:0.6273,scaleY:0.6273,x:489.8,y:343.4},0).wait(1).to({scaleX:0.6232,scaleY:0.6232,x:489.85,y:343.5},0).wait(1).to({scaleX:0.6191,scaleY:0.6191,x:489.8,y:343.55},0).wait(1).to({scaleX:0.615,scaleY:0.615,x:489.75,y:343.7},0).wait(1).to({scaleX:0.611,scaleY:0.611,y:343.8},0).wait(1).to({scaleX:0.6069,scaleY:0.6069,x:489.7,y:343.9},0).wait(1).to({scaleX:0.6028,scaleY:0.6028,x:489.65,y:344},0).wait(1).to({scaleX:0.5987,scaleY:0.5987,y:344.1},0).wait(1).to({scaleX:0.5946,scaleY:0.5946,y:344.25},0).wait(1).to({scaleX:0.8208,scaleY:0.8208,x:469.9,y:334.1},0).wait(1).to({scaleX:1.047,scaleY:1.047,x:450.25,y:323.95},0).wait(1).to({scaleX:1.2733,scaleY:1.2733,x:430.55,y:313.8},0).wait(1).to({scaleX:1.4995,scaleY:1.4995,x:410.85,y:303.65},0).wait(1).to({scaleX:1.7258,scaleY:1.7258,x:391.1,y:293.5},0).wait(1).to({scaleX:1.952,scaleY:1.952,x:371.4,y:283.35},0).wait(1).to({scaleX:2.1782,scaleY:2.1782,x:351.75,y:273.2},0).wait(1).to({scaleX:2.4045,scaleY:2.4045,x:332.05,y:263.05},0).wait(1).to({scaleX:2.6307,scaleY:2.6307,x:312.35,y:252.9},0).wait(1).to({scaleX:2.8569,scaleY:2.8569,x:292.6,y:242.75},0).wait(1).to({scaleX:3.0832,scaleY:3.0832,x:272.9,y:232.6},0).wait(1).to({scaleX:3.3094,scaleY:3.3094,x:253.25,y:222.45},0).wait(1).to({scaleX:3.5356,scaleY:3.5357,x:233.55,y:212.3},0).wait(1).to({scaleX:3.7619,scaleY:3.7619,x:213.85,y:202.2},0).wait(1).to({x:222.55,y:189.1},0).wait(1).to({scaleX:3.7618,x:231.25,y:176.05},0).wait(1).to({scaleY:3.7618,x:240,y:163},0).wait(1).to({x:248.7,y:149.9},0).wait(1).to({x:257.4,y:136.85},0).wait(1).to({x:266.15,y:123.8},0).wait(1).to({x:274.85,y:110.7},0).wait(1).to({scaleX:3.7617,x:283.55,y:97.65},0).wait(1).to({x:292.3,y:84.6},0).wait(1).to({scaleX:3.906,scaleY:3.906,x:296.75,y:112.85},0).wait(1).to({scaleX:4.0502,scaleY:4.0502,x:301.2,y:141.1},0).wait(1).to({scaleX:4.1944,scaleY:4.1945,x:305.65,y:169.35},0).wait(1).to({scaleX:4.3387,scaleY:4.3387,x:310.1,y:197.6},0).wait(1).to({scaleX:4.4829,scaleY:4.483,x:314.55,y:225.85},0).wait(1).to({scaleX:4.6272,scaleY:4.6272,x:319,y:254.15},0).wait(1).to({scaleX:4.7714,scaleY:4.7715,x:323.45,y:282.35},0).wait(1).to({scaleX:4.9156,scaleY:4.9157,x:327.95,y:310.6},0).wait(1).to({scaleX:5.0599,scaleY:5.0599,x:332.4,y:338.9},0).wait(1).to({scaleX:5.0598,scaleY:5.0598,x:329,y:341.65},0).wait(1).to({scaleX:5.0597,scaleY:5.0597,x:325.6,y:344.45},0).wait(1).to({scaleX:5.0596,scaleY:5.0596,x:322.25,y:347.25},0).wait(1).to({scaleX:5.0595,scaleY:5.0595,x:318.85,y:350},0).wait(1).to({scaleX:5.0594,scaleY:5.0594,x:315.45,y:352.8},0).wait(1).to({scaleX:5.0592,scaleY:5.0593,x:312.05,y:355.6},0).wait(1).to({scaleX:5.0591,scaleY:5.0592,x:308.7,y:358.4},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.シーン_1_ロゴ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ロゴ
	this.instance = new lib.logo01svg("synched",0);
	this.instance.setTransform(483.7,107.75,1,1,0,0,0,54.1,1.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:76.8,regY:24.8,scaleX:0.9957,scaleY:0.9957,x:506.25,y:130.35},0).wait(1).to({scaleX:0.9915,scaleY:0.9915,x:506.2,y:130.05},0).wait(1).to({scaleX:0.9873,scaleY:0.9873,x:506.05,y:129.75},0).wait(1).to({scaleX:0.983,scaleY:0.983,x:506,y:129.5},0).wait(1).to({scaleX:0.9788,scaleY:0.9788,x:505.9,y:129.15},0).wait(1).to({scaleX:0.9746,scaleY:0.9746,x:505.8,y:128.85},0).wait(1).to({scaleX:0.9703,scaleY:0.9703,x:505.7,y:128.55},0).wait(1).to({scaleX:0.9661,scaleY:0.9661,x:505.6,y:128.3},0).wait(1).to({scaleX:0.9619,scaleY:0.9619,x:505.5,y:128},0).wait(1).to({scaleX:0.9576,scaleY:0.9576,x:505.45,y:127.7},0).wait(1).to({scaleX:0.9534,scaleY:0.9534,x:505.3,y:127.4},0).wait(1).to({scaleX:0.9492,scaleY:0.9492,x:505.25,y:127.15},0).wait(1).to({scaleX:0.9449,scaleY:0.9449,x:505.1,y:126.85},0).wait(1).to({scaleX:0.9407,scaleY:0.9407,x:505.05,y:126.55},0).wait(1).to({scaleX:0.9365,scaleY:0.9364,x:504.95,y:126.2},0).wait(1).to({scaleX:0.9322,scaleY:0.9322,x:504.85,y:125.95},0).wait(1).to({scaleX:0.928,scaleY:0.928,x:504.75,y:125.65},0).wait(1).to({scaleX:0.9238,scaleY:0.9237,x:504.7,y:125.35},0).wait(1).to({scaleX:0.9195,scaleY:0.9195,x:504.55,y:125.05},0).wait(1).to({scaleX:0.9153,scaleY:0.9153,x:504.5,y:124.8},0).wait(1).to({scaleX:0.911,scaleY:0.911,x:504.35,y:124.5},0).wait(1).to({scaleX:0.9068,scaleY:0.9068,x:504.3,y:124.2},0).wait(1).to({scaleX:0.9026,scaleY:0.9026,x:504.2,y:123.9},0).wait(1).to({scaleX:0.8983,scaleY:0.8983,x:504.1,y:123.65},0).wait(1).to({scaleX:0.8941,scaleY:0.8941,x:504,y:123.3},0).wait(1).to({scaleX:0.8899,scaleY:0.8899,x:503.9,y:123},0).wait(1).to({scaleX:0.8856,scaleY:0.8856,x:503.8,y:122.7},0).wait(1).to({scaleX:0.8814,scaleY:0.8814,x:503.75,y:122.45},0).wait(1).to({scaleX:0.8772,scaleY:0.8771,x:503.6,y:122.15},0).wait(1).to({scaleX:0.8729,scaleY:0.8729,x:503.55,y:121.85},0).wait(1).to({scaleX:0.8687,scaleY:0.8687,x:503.4,y:121.55},0).wait(1).to({scaleX:0.8645,scaleY:0.8644,x:503.35,y:121.3},0).wait(1).to({scaleX:0.8602,scaleY:0.8602,x:503.25,y:121},0).wait(1).to({scaleX:0.856,scaleY:0.856,x:503.15,y:120.7},0).wait(1).to({scaleX:0.8518,scaleY:0.8517,x:503.05,y:120.35},0).wait(1).to({scaleX:0.8475,scaleY:0.8475,x:503,y:120.1},0).wait(1).to({scaleX:0.8433,scaleY:0.8433,x:502.85,y:119.8},0).wait(1).to({scaleX:0.839,scaleY:0.839,x:502.8,y:119.5},0).wait(1).to({scaleX:0.8348,scaleY:0.8348,x:502.65,y:119.2},0).wait(1).to({scaleX:0.8306,scaleY:0.8306,x:502.6,y:118.95},0).wait(1).to({scaleX:0.8263,scaleY:0.8263,x:502.5,y:118.65},0).wait(1).to({scaleX:0.8221,scaleY:0.8221,x:502.4,y:118.35},0).wait(1).to({scaleX:0.8179,scaleY:0.8178,x:502.3,y:118.05},0).wait(1).to({scaleX:0.8136,scaleY:0.8136,x:502.2,y:117.8},0).wait(1).to({scaleX:0.8094,scaleY:0.8094,x:502.1,y:117.45},0).wait(1).to({scaleX:0.8052,scaleY:0.8051,x:502.05,y:117.15},0).wait(1).to({scaleX:0.8009,scaleY:0.8009,x:501.9,y:116.85},0).wait(1).to({scaleX:0.7967,scaleY:0.7967,x:501.85,y:116.6},0).wait(1).to({scaleX:0.7925,scaleY:0.7924,x:501.75,y:116.3},0).wait(1).to({scaleX:0.7882,scaleY:0.7882,x:501.65,y:116},0).wait(1).to({scaleX:0.784,scaleY:0.784,x:501.55,y:115.75},0).wait(1).to({scaleX:0.7798,scaleY:0.7797,x:501.45,y:115.45},0).wait(1).to({scaleX:0.7755,scaleY:0.7755,x:501.35,y:115.15},0).wait(1).to({scaleX:0.7713,scaleY:0.7713,x:501.3,y:114.85},0).wait(1).to({scaleX:0.7671,scaleY:0.767,x:501.15,y:114.55},0).wait(1).to({scaleX:0.7628,scaleY:0.7628,x:501.1,y:114.25},0).wait(1).to({scaleX:0.7586,scaleY:0.7585,x:500.95,y:113.95},0).wait(1).to({scaleX:0.7543,scaleY:0.7543,x:500.9,y:113.65},0).wait(1).to({scaleX:0.7501,scaleY:0.7501,x:500.8,y:113.4},0).wait(1).to({scaleX:0.7459,scaleY:0.7458,x:500.7,y:113.1},0).wait(1).to({scaleX:0.7416,scaleY:0.7416,x:500.6,y:112.8},0).wait(1).to({scaleX:0.7374,scaleY:0.7374,x:500.5,y:112.5},0).wait(1).to({scaleX:0.7332,scaleY:0.7331,x:500.4,y:112.25},0).wait(1).to({scaleX:0.7289,scaleY:0.7289,x:500.35,y:111.95},0).wait(1).to({scaleX:0.7247,scaleY:0.7247,x:500.2,y:111.6},0).wait(1).to({scaleX:0.7205,scaleY:0.7204,x:500.15,y:111.3},0).wait(1).to({scaleX:0.7162,scaleY:0.7162,x:500.05,y:111.05},0).wait(1).to({scaleX:0.712,scaleY:0.712,x:499.95,y:110.75},0).wait(1).to({scaleX:0.7078,scaleY:0.7077,x:499.85,y:110.45},0).wait(1).to({scaleX:0.7035,scaleY:0.7035,x:499.75,y:110.15},0).wait(1).to({scaleX:0.6993,scaleY:0.6992,x:499.65,y:109.9},0).wait(1).to({scaleX:0.6951,scaleY:0.695,x:499.6,y:109.6},0).wait(1).to({scaleX:0.6908,scaleY:0.6908,x:499.45,y:109.3},0).wait(1).to({scaleX:0.6866,scaleY:0.6865,x:499.4,y:109},0).wait(1).to({scaleX:0.6823,scaleY:0.6823,x:499.25,y:108.7},0).wait(1).to({scaleX:0.6781,scaleY:0.6781,x:499.2,y:108.4},0).wait(1).to({scaleX:0.6739,scaleY:0.6738,x:499.1,y:108.1},0).wait(1).to({scaleX:0.6696,scaleY:0.6696,x:499,y:107.8},0).wait(1).to({scaleX:0.6654,scaleY:0.6654,x:498.9,y:107.55},0).wait(1).to({scaleX:0.6612,scaleY:0.6611,x:498.8,y:107.25},0).wait(1).to({scaleX:0.6569,scaleY:0.6569,x:498.7,y:106.95},0).wait(1).to({scaleX:0.6527,scaleY:0.6527,x:498.65,y:106.65},0).wait(1).to({scaleX:0.6485,scaleY:0.6484,x:498.5,y:106.4},0).wait(1).to({scaleX:0.6442,scaleY:0.6442,x:498.45,y:106.1},0).wait(1).to({scaleX:0.64,scaleY:0.6399,x:498.35,y:105.75},0).wait(1).to({scaleX:0.6358,scaleY:0.6357,x:498.25,y:105.45},0).wait(1).to({scaleX:0.6315,scaleY:0.6315,x:498.15,y:105.2},0).wait(1).to({scaleX:0.6273,scaleY:0.6272,x:498.05,y:104.9},0).wait(1).to({scaleX:0.6231,scaleY:0.623,x:497.95,y:104.6},0).wait(1).to({scaleX:0.6188,scaleY:0.6188,x:497.9,y:104.3},0).wait(1).to({scaleX:0.6146,scaleY:0.6145,x:497.75,y:104.05},0).wait(1).to({scaleX:0.6104,scaleY:0.6103,x:497.65,y:103.75},0).wait(1).to({scaleX:0.6061,scaleY:0.6061,x:497.55,y:103.45},0).wait(1).to({scaleX:0.6019,scaleY:0.6018,x:497.45,y:103.15},0).wait(1).to({scaleX:0.5976,scaleY:0.5976,x:497.4,y:102.85},0).wait(1).to({scaleX:0.5934,scaleY:0.5934,x:497.25,y:102.55},0).wait(1).to({scaleX:0.5892,scaleY:0.5891,x:497.2,y:102.25},0).wait(1).to({scaleX:0.5849,scaleY:0.5849,x:497.1,y:102},0).wait(1).to({scaleX:0.5807,scaleY:0.5806,x:497,y:101.7},0).wait(1).to({scaleX:0.5765,scaleY:0.5764,x:496.9,y:101.4},0).wait(1).to({scaleX:0.5722,scaleY:0.5722,x:496.8,y:101.1},0).wait(1).to({scaleX:0.5824,scaleY:0.5823,x:497.05,y:101.15},0).wait(1).to({scaleX:0.5925,scaleY:0.5925,x:497.25,y:101.2},0).wait(1).to({scaleX:0.6027,scaleY:0.6026,x:497.5},0).wait(1).to({scaleX:0.6129,scaleY:0.6128,x:497.75,y:101.25},0).wait(1).to({scaleX:0.623,scaleY:0.623,x:498,y:101.3},0).wait(1).to({scaleX:0.6332,scaleY:0.6331,x:498.25},0).wait(1).to({scaleX:0.6433,scaleY:0.6433,x:498.45,y:101.35},0).wait(1).to({scaleX:0.6535,scaleY:0.6534,x:498.7,y:101.4},0).wait(1).to({scaleX:0.6636,scaleY:0.6636,x:498.9,y:101.45},0).wait(1).to({scaleX:0.6738,scaleY:0.6737,x:499.15},0).wait(1).to({scaleX:0.6839,scaleY:0.6839,x:499.4,y:101.5},0).wait(1).to({scaleX:0.6941,scaleY:0.6941,x:499.6,y:101.55},0).wait(1).to({scaleX:0.7042,scaleY:0.7042,x:499.85},0).wait(1).to({scaleX:0.7144,scaleY:0.7144,x:500.05,y:101.6},0).wait(1).to({scaleX:0.7246,scaleY:0.7245,x:500.3,y:105.95},0).wait(1).to({scaleX:0.7347,scaleY:0.7347,x:500.55,y:110.3},0).wait(1).to({scaleX:0.7449,scaleY:0.7448,x:500.75,y:114.65},0).wait(1).to({scaleX:0.755,scaleY:0.755,x:501,y:119.05},0).wait(1).to({scaleX:0.7652,scaleY:0.7651,x:501.2,y:123.45},0).wait(1).to({scaleX:0.7753,scaleY:0.7753,x:501.45,y:127.8},0).wait(1).to({scaleX:0.7855,scaleY:0.7855,x:501.65,y:132.15},0).wait(1).to({scaleX:0.7956,scaleY:0.7956,x:501.9,y:136.5},0).wait(1).to({scaleX:0.8058,scaleY:0.8058,x:502.15,y:140.85},0).wait(1).to({scaleX:0.816,scaleY:0.8159,x:502.35,y:145.25},0).wait(1).to({scaleX:0.8261,scaleY:0.8261,x:502.6,y:149.6},0).wait(1).to({scaleX:0.8363,scaleY:0.8362,x:502.8,y:153.95},0).wait(1).to({scaleX:0.8464,scaleY:0.8464,x:503.05,y:158.3},0).wait(1).to({scaleX:0.8566,scaleY:0.8566,x:503.3,y:162.65},0).wait(1).to({scaleX:0.8667,scaleY:0.8667,x:503.5,y:167},0).wait(1).to({scaleX:0.8769,scaleY:0.8769,x:503.8,y:171.35},0).wait(1).to({scaleX:0.887,scaleY:0.887,x:504,y:175.75},0).wait(1).to({scaleX:0.8972,scaleY:0.8972,x:504.25,y:180.1},0).wait(1).to({scaleX:0.9073,scaleY:0.9073,x:504.5,y:184.45},0).wait(1).to({scaleX:0.9175,scaleY:0.9175,x:504.7,y:188.8},0).wait(1).to({scaleX:0.9277,scaleY:0.9277,x:504.95,y:193.15},0).wait(1).to({scaleX:0.9378,scaleY:0.9378,x:505.15,y:197.5},0).wait(1).to({scaleX:0.948,scaleY:0.948,x:505.4,y:201.9},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.シーン_1_プレゼント箱 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// プレゼント箱
	this.instance = new lib.シンボル1();
	this.instance.setTransform(484,320,0.1597,0.1597,0,0,0,181,258.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:180.7,regY:258.3,x:483.8,y:319.85},0).wait(1).to({x:483.7,y:319.75},0).wait(1).to({x:483.6,y:319.65},0).wait(1).to({x:483.5,y:319.6},0).wait(1).to({x:483.4,y:319.5},0).wait(1).to({x:483.3,y:319.4},0).wait(1).to({x:483.2,y:319.35},0).wait(1).to({x:483.1,y:319.25},0).wait(1).to({x:483,y:319.15},0).wait(1).to({x:482.9,y:319.1},0).wait(1).to({x:482.8,y:319},0).wait(1).to({x:482.7,y:318.9},0).wait(1).to({x:482.6,y:318.85},0).wait(1).to({x:482.5,y:318.75},0).wait(1).to({x:482.4,y:318.65},0).wait(1).to({x:482.3,y:318.6},0).wait(1).to({x:482.2,y:318.5},0).wait(1).to({x:482.1,y:318.4},0).wait(1).to({x:482,y:318.35},0).wait(1).to({x:481.9,y:318.25},0).wait(1).to({x:481.8,y:318.15},0).wait(1).to({x:481.7,y:318.1},0).wait(1).to({x:481.6,y:318},0).wait(1).to({x:481.45,y:317.9},0).wait(91).to({y:319.65},0).wait(1).to({y:325.1},0).wait(1).to({y:335.15},0).wait(1).to({y:350.75},0).wait(1).to({y:373.5},0).wait(1).to({y:406.25},0).wait(1).to({y:454.7},0).wait(1).to({y:542.9},0).wait(55));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.シーン_1_girl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// girl
	this.instance = new lib.girl01svg("synched",0);
	this.instance.setTransform(487.2,333.15,0.3615,0.3615,0,0,0,31.7,57.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:31.2,regY:57,scaleX:0.3611,scaleY:0.3611,x:486.95,y:332.9},0).wait(1).to({scaleX:0.3607,scaleY:0.3607,y:332.85},0).wait(1).to({scaleX:0.3603,scaleY:0.3603,y:332.9},0).wait(1).to({scaleX:0.3599,scaleY:0.3599,y:332.85},0).wait(1).to({scaleX:0.3596,scaleY:0.3595,x:486.9,y:332.9},0).wait(1).to({scaleX:0.3592,scaleY:0.3591,x:486.85,y:332.85},0).wait(1).to({scaleX:0.3588,scaleY:0.3587,y:332.9},0).wait(1).to({scaleX:0.3584,scaleY:0.3584},0).wait(1).to({scaleX:0.358,scaleY:0.358,x:486.8},0).wait(1).to({scaleX:0.3576,scaleY:0.3576},0).wait(1).to({scaleX:0.3572,scaleY:0.3572,x:486.75,y:332.85},0).wait(1).to({scaleX:0.3568,scaleY:0.3568,y:332.9},0).wait(1).to({scaleX:0.3564,scaleY:0.3564,x:486.7,y:332.85},0).wait(1).to({scaleX:0.3561,scaleY:0.356,y:332.9},0).wait(1).to({scaleX:0.3557,scaleY:0.3556,y:332.85},0).wait(1).to({scaleX:0.3553,scaleY:0.3553,x:486.65,y:332.9},0).wait(1).to({scaleX:0.3549,scaleY:0.3549,x:486.6},0).wait(1).to({scaleX:0.3545,scaleY:0.3545},0).wait(1).to({scaleX:0.3541,scaleY:0.3541},0).wait(1).to({scaleX:0.3537,scaleY:0.3537,y:332.85},0).wait(1).to({scaleX:0.3533,scaleY:0.3533,x:486.5,y:332.9},0).wait(1).to({scaleX:0.353,scaleY:0.3529,y:332.85},0).wait(1).to({scaleX:0.3526,scaleY:0.3525,y:332.9},0).wait(1).to({scaleX:0.3522,scaleY:0.3521,y:332.85},0).wait(1).to({scaleX:0.3518,scaleY:0.3518,y:332.9},0).wait(1).to({scaleX:0.3514,scaleY:0.3514,x:486.4},0).wait(1).to({scaleX:0.351,scaleY:0.351},0).wait(1).to({scaleX:0.3506,scaleY:0.3506},0).wait(1).to({scaleX:0.3502,scaleY:0.3502,y:332.85},0).wait(1).to({scaleX:0.3498,scaleY:0.3498,x:486.35,y:332.9},0).wait(1).to({scaleX:0.3495,scaleY:0.3494,x:486.3,y:332.85},0).wait(1).to({scaleX:0.3491,scaleY:0.349,y:332.9},0).wait(1).to({scaleX:0.3487,scaleY:0.3486,y:332.85},0).wait(1).to({scaleX:0.3483,scaleY:0.3483,x:486.25,y:332.9},0).wait(1).to({scaleX:0.3479,scaleY:0.3479},0).wait(1).to({scaleX:0.3475,scaleY:0.3475,x:486.2},0).wait(1).to({scaleX:0.3471,scaleY:0.3471},0).wait(1).to({scaleX:0.3467,scaleY:0.3467,x:486.15},0).wait(1).to({scaleX:0.3463,scaleY:0.3463},0).wait(1).to({scaleX:0.346,scaleY:0.3459,y:332.85},0).wait(1).to({scaleX:0.3456,scaleY:0.3455,x:486.1,y:332.9},0).wait(1).to({scaleX:0.3452,scaleY:0.3452,x:486.05,y:332.85},0).wait(1).to({scaleX:0.3448,scaleY:0.3448,y:332.9},0).wait(1).to({scaleX:0.3444,scaleY:0.3444},0).wait(1).to({scaleX:0.344,scaleY:0.344},0).wait(1).to({scaleX:0.3436,scaleY:0.3436,x:485.95},0).wait(1).to({scaleX:0.3432,scaleY:0.3432},0).wait(1).to({scaleX:0.3429,scaleY:0.3428},0).wait(1).to({scaleX:0.3425,scaleY:0.3424,y:332.85},0).wait(1).to({scaleX:0.3421,scaleY:0.342,x:485.9,y:332.9},0).wait(1).to({scaleX:0.3417,scaleY:0.3417,x:485.85,y:332.85},0).wait(1).to({scaleX:0.3413,scaleY:0.3413,y:332.9},0).wait(1).to({scaleX:0.3409,scaleY:0.3409},0).wait(1).to({scaleX:0.3405,scaleY:0.3405,x:485.8},0).wait(1).to({scaleX:0.3401,scaleY:0.3401},0).wait(1).to({scaleX:0.3397,scaleY:0.3397,x:485.75},0).wait(1).to({scaleX:0.3394,scaleY:0.3393},0).wait(1).to({scaleX:0.339,scaleY:0.3389,y:332.85},0).wait(1).to({scaleX:0.3386,scaleY:0.3385,x:485.7,y:332.9},0).wait(1).to({scaleX:0.3382,scaleY:0.3382,y:332.85},0).wait(1).to({scaleX:0.3378,scaleY:0.3378,x:485.65,y:332.9},0).wait(1).to({scaleX:0.3374,scaleY:0.3374},0).wait(1).to({scaleX:0.337,scaleY:0.337,x:485.6},0).wait(1).to({scaleX:0.3366,scaleY:0.3366},0).wait(1).to({scaleX:0.3362,scaleY:0.3362},0).wait(1).to({scaleX:0.3359,scaleY:0.3358,x:485.55},0).wait(1).to({scaleX:0.3355,scaleY:0.3354,x:485.5},0).wait(1).to({scaleX:0.3351,scaleY:0.3351},0).wait(1).to({scaleX:0.3347,scaleY:0.3347},0).wait(1).to({scaleX:0.3343,scaleY:0.3343},0).wait(1).to({scaleX:0.3339,scaleY:0.3339,x:485.4},0).wait(1).to({scaleX:0.3335,scaleY:0.3335},0).wait(1).to({scaleX:0.3331,scaleY:0.3331},0).wait(1).to({scaleX:0.3328,scaleY:0.3327},0).wait(1).to({scaleX:0.3324,scaleY:0.3323,x:485.35},0).wait(1).to({scaleX:0.332,scaleY:0.3319,x:485.3},0).wait(1).to({scaleX:0.3316,scaleY:0.3316},0).wait(1).to({scaleX:0.3312,scaleY:0.3312},0).wait(1).to({scaleX:0.3308,scaleY:0.3308,x:485.25},0).wait(1).to({scaleX:0.3304,scaleY:0.3304},0).wait(1).to({scaleX:0.33,scaleY:0.33,x:485.2},0).wait(1).to({scaleX:0.3296,scaleY:0.3296},0).wait(1).to({scaleX:0.3293,scaleY:0.3292,x:485.15},0).wait(1).to({scaleX:0.3289,scaleY:0.3288},0).wait(1).to({scaleX:0.3285,scaleY:0.3284},0).wait(1).to({scaleX:0.3281,scaleY:0.3281,x:485.1},0).wait(1).to({scaleX:0.3277,scaleY:0.3277,x:485.05},0).wait(1).to({scaleX:0.3273,scaleY:0.3273},0).wait(1).to({scaleX:0.3269,scaleY:0.3269},0).wait(1).to({scaleX:0.3265,scaleY:0.3265},0).wait(1).to({scaleX:0.3262,scaleY:0.3261,x:485},0).wait(1).to({scaleX:0.3258,scaleY:0.3257,x:484.95},0).wait(1).to({scaleX:0.3254,scaleY:0.3253},0).wait(1).to({scaleX:0.325,scaleY:0.325},0).wait(1).to({scaleX:0.3246,scaleY:0.3246},0).wait(1).to({scaleX:0.3242,scaleY:0.3242,x:484.85,y:332.95},0).wait(1).to({scaleX:0.3238,scaleY:0.3238,y:332.9},0).wait(1).to({scaleX:0.3234,scaleY:0.3234},0).wait(1).to({scaleX:0.323,scaleY:0.323},0).wait(1).to({scaleX:0.3227,scaleY:0.3226,x:484.8},0).wait(1).to({scaleX:0.3223,scaleY:0.3222,x:484.75},0).wait(1).to({scaleX:0.3692,scaleY:0.3692,x:505.55,y:327.1},0).wait(1).to({scaleX:0.4162,scaleY:0.4161,x:526.35,y:321.25},0).wait(1).to({scaleX:0.4631,scaleY:0.463,x:547.15,y:315.45},0).wait(1).to({scaleX:0.51,scaleY:0.51,x:567.9,y:309.6},0).wait(1).to({scaleX:0.557,scaleY:0.5569,x:588.75,y:303.8},0).wait(1).to({scaleX:0.6039,scaleY:0.6039,x:609.5,y:297.95},0).wait(1).to({scaleX:0.6509,scaleY:0.6508,x:630.3,y:292.2},0).wait(1).to({scaleX:0.6978,scaleY:0.6977,x:651.05,y:286.35},0).wait(1).to({scaleX:0.7448,scaleY:0.7447,x:671.9,y:280.55},0).wait(1).to({scaleX:0.7917,scaleY:0.7916,x:692.65,y:274.7},0).wait(1).to({scaleX:0.8386,scaleY:0.8385,x:713.45,y:268.9},0).wait(1).to({scaleX:0.8856,scaleY:0.8855,x:734.25,y:263.05},0).wait(1).to({scaleX:0.9325,scaleY:0.9324,x:755.05,y:257.25},0).wait(1).to({scaleX:0.9795,scaleY:0.9794,x:775.8,y:251.4},0).wait(1).to({scaleX:1.0097,scaleY:1.0096,x:778.55,y:236.15},0).wait(1).to({scaleX:1.04,scaleY:1.0399,x:781.3,y:220.85},0).wait(1).to({scaleX:1.0703,scaleY:1.0702,x:784.05,y:205.6},0).wait(1).to({scaleX:1.1006,scaleY:1.1004,x:786.8,y:190.3},0).wait(1).to({scaleX:1.1308,scaleY:1.1307,x:789.55,y:175},0).wait(1).to({scaleX:1.1611,scaleY:1.1609,x:792.3,y:159.7},0).wait(1).to({scaleX:1.1914,scaleY:1.1912,x:795,y:144.45},0).wait(1).to({x:768.85,y:173.85},0).wait(1).to({x:742.65,y:203.25},0).wait(1).to({x:716.5,y:232.65},0).wait(1).to({x:690.3,y:262.05},0).wait(1).to({x:664.1,y:291.4},0).wait(1).to({x:637.95,y:320.8},0).wait(1).to({x:611.75,y:350.2},0).wait(1).to({x:585.6,y:379.6},0).wait(1).to({x:559.4,y:409},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.シーン_1_boy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// boy
	this.instance = new lib.boy1("synched",0);
	this.instance.setTransform(484.6,327.85,0.3827,0.3827,0,0,0,46,54.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regY:54.5,scaleX:0.3818,scaleY:0.3818,x:484.55,y:327.8},0).wait(1).to({scaleX:0.3809,scaleY:0.3809,x:484.5,y:327.85},0).wait(1).to({scaleX:0.38,scaleY:0.38,x:484.55,y:327.9},0).wait(1).to({scaleX:0.3791,scaleY:0.3791,x:484.5},0).wait(1).to({scaleX:0.3782,scaleY:0.3782,y:327.95},0).wait(1).to({scaleX:0.3773,scaleY:0.3773,x:484.45,y:328},0).wait(1).to({scaleX:0.3763,scaleY:0.3763},0).wait(1).to({scaleX:0.3754,scaleY:0.3754,x:484.4,y:328.05},0).wait(1).to({scaleX:0.3745,scaleY:0.3745,x:484.45,y:328.1},0).wait(1).to({scaleX:0.3736,scaleY:0.3736,x:484.4},0).wait(1).to({scaleX:0.3727,scaleY:0.3727,x:484.35,y:328.15},0).wait(1).to({scaleX:0.3718,scaleY:0.3718,y:328.2},0).wait(1).to({scaleX:0.3709,scaleY:0.3709,x:484.3},0).wait(1).to({scaleX:0.37,scaleY:0.37,y:328.25},0).wait(1).to({scaleX:0.369,scaleY:0.369,y:328.3},0).wait(1).to({scaleX:0.3681,scaleY:0.3681},0).wait(1).to({scaleX:0.3672,scaleY:0.3672,x:484.25,y:328.35},0).wait(1).to({scaleX:0.3663,scaleY:0.3663,y:328.4},0).wait(1).to({scaleX:0.3654,scaleY:0.3654,x:484.2},0).wait(1).to({scaleX:0.3645,scaleY:0.3645,y:328.45},0).wait(1).to({scaleX:0.3636,scaleY:0.3636,x:484.15,y:328.5},0).wait(1).to({scaleX:0.3627,scaleY:0.3627},0).wait(1).to({scaleX:0.3618,scaleY:0.3618,y:328.55},0).wait(1).to({scaleX:0.3608,scaleY:0.3608,x:484.1,y:328.6},0).wait(1).to({scaleX:0.3599,scaleY:0.3599},0).wait(1).to({scaleX:0.359,scaleY:0.359,x:484.05,y:328.65},0).wait(1).to({scaleX:0.3581,scaleY:0.3581,y:328.7},0).wait(1).to({scaleX:0.3572,scaleY:0.3572},0).wait(1).to({scaleX:0.3563,scaleY:0.3563,y:328.75},0).wait(1).to({scaleX:0.3554,scaleY:0.3554,x:484,y:328.8},0).wait(1).to({scaleX:0.3545,scaleY:0.3545},0).wait(1).to({scaleX:0.3535,scaleY:0.3536,x:483.95,y:328.85},0).wait(1).to({scaleX:0.3526,scaleY:0.3526,x:483.9,y:328.9},0).wait(1).to({scaleX:0.3517,scaleY:0.3517,x:483.95},0).wait(1).to({scaleX:0.3508,scaleY:0.3508,x:483.9,y:328.95},0).wait(1).to({scaleX:0.3499,scaleY:0.3499,y:329},0).wait(1).to({scaleX:0.349,scaleY:0.349,x:483.85},0).wait(1).to({scaleX:0.3481,scaleY:0.3481,y:329.05},0).wait(1).to({scaleX:0.3472,scaleY:0.3472,x:483.8,y:329.1},0).wait(1).to({scaleX:0.3463,scaleY:0.3463,x:483.85},0).wait(1).to({scaleX:0.3453,scaleY:0.3454,x:483.8,y:329.15},0).wait(1).to({scaleX:0.3444,scaleY:0.3444,y:329.2},0).wait(1).to({scaleX:0.3435,scaleY:0.3435,x:483.75},0).wait(1).to({scaleX:0.3426,scaleY:0.3426,x:483.7,y:329.25},0).wait(1).to({scaleX:0.3417,scaleY:0.3417,y:329.3},0).wait(1).to({scaleX:0.3408,scaleY:0.3408},0).wait(1).to({scaleX:0.3399,scaleY:0.3399,y:329.35},0).wait(1).to({scaleX:0.339,scaleY:0.339,x:483.65,y:329.4},0).wait(1).to({scaleX:0.338,scaleY:0.3381},0).wait(1).to({scaleX:0.3371,scaleY:0.3371,x:483.6,y:329.45},0).wait(1).to({scaleX:0.3362,scaleY:0.3362,y:329.5},0).wait(1).to({scaleX:0.3353,scaleY:0.3353,x:483.55},0).wait(1).to({scaleX:0.3344,scaleY:0.3344,y:329.6},0).wait(1).to({scaleX:0.3335,scaleY:0.3335,y:329.65},0).wait(1).to({scaleX:0.3326,scaleY:0.3326,x:483.5},0).wait(1).to({scaleX:0.3317,scaleY:0.3317,y:329.7},0).wait(1).to({scaleX:0.3308,scaleY:0.3308,x:483.45,y:329.75},0).wait(1).to({scaleX:0.3298,scaleY:0.3299},0).wait(1).to({scaleX:0.3289,scaleY:0.3289,y:329.8},0).wait(1).to({scaleX:0.328,scaleY:0.328,y:329.85},0).wait(1).to({scaleX:0.3271,scaleY:0.3271,x:483.4},0).wait(1).to({scaleX:0.3262,scaleY:0.3262,y:329.9},0).wait(1).to({scaleX:0.3253,scaleY:0.3253,x:483.35,y:329.95},0).wait(1).to({scaleX:0.3244,scaleY:0.3244,x:483.3},0).wait(1).to({scaleX:0.3235,scaleY:0.3235,x:483.35,y:330},0).wait(1).to({scaleX:0.3225,scaleY:0.3226,x:483.3,y:330.05},0).wait(1).to({scaleX:0.3216,scaleY:0.3217},0).wait(1).to({scaleX:0.3207,scaleY:0.3207,x:483.25,y:330.1},0).wait(1).to({scaleX:0.3198,scaleY:0.3198,y:330.15},0).wait(1).to({scaleX:0.3189,scaleY:0.3189,x:483.2},0).wait(1).to({scaleX:0.318,scaleY:0.318,x:483.25,y:330.2},0).wait(1).to({scaleX:0.3171,scaleY:0.3171,x:483.2,y:330.25},0).wait(1).to({scaleX:0.3162,scaleY:0.3162},0).wait(1).to({scaleX:0.3153,scaleY:0.3153,x:483.15,y:330.3},0).wait(1).to({scaleX:0.3143,scaleY:0.3144,x:483.1,y:330.35},0).wait(1).to({scaleX:0.3134,scaleY:0.3135},0).wait(1).to({scaleX:0.3125,scaleY:0.3125,y:330.4},0).wait(1).to({scaleX:0.3116,scaleY:0.3116,y:330.45},0).wait(1).to({scaleX:0.3107,scaleY:0.3107,x:483.05},0).wait(1).to({scaleX:0.3098,scaleY:0.3098,y:330.5},0).wait(1).to({scaleX:0.3089,scaleY:0.3089,x:483,y:330.55},0).wait(1).to({scaleX:0.308,scaleY:0.308},0).wait(1).to({scaleX:0.307,scaleY:0.3071,x:482.95,y:330.6},0).wait(1).to({scaleX:0.3061,scaleY:0.3062,x:483,y:330.65},0).wait(1).to({scaleX:0.3052,scaleY:0.3052,x:482.95},0).wait(1).to({scaleX:0.3043,scaleY:0.3043,x:482.9,y:330.7},0).wait(1).to({scaleX:0.3034,scaleY:0.3034,y:330.75},0).wait(1).to({scaleX:0.3025,scaleY:0.3025,x:482.85},0).wait(1).to({scaleX:0.3016,scaleY:0.3016,y:330.8},0).wait(1).to({scaleX:0.3007,scaleY:0.3007,y:330.85},0).wait(1).to({scaleX:0.2998,scaleY:0.2998},0).wait(1).to({scaleX:0.2988,scaleY:0.2989,x:482.8,y:330.9},0).wait(1).to({scaleX:0.2979,scaleY:0.298,y:330.95},0).wait(1).to({scaleX:0.297,scaleY:0.297,x:482.75},0).wait(1).to({scaleX:0.2961,scaleY:0.2961,y:331},0).wait(1).to({scaleX:0.2952,scaleY:0.2952,y:331.05},0).wait(1).to({scaleX:0.2943,scaleY:0.2943,x:482.7},0).wait(1).to({scaleX:0.2934,scaleY:0.2934,y:331.1},0).wait(1).to({scaleX:0.2925,scaleY:0.2925,x:482.65,y:331.15},0).wait(1).to({scaleX:0.2915,scaleY:0.2916},0).wait(1).to({scaleX:0.2906,scaleY:0.2907,x:482.6,y:331.2},0).wait(1).to({scaleX:0.3283,scaleY:0.3283,x:461.35,y:326.5},0).wait(1).to({scaleX:0.366,scaleY:0.366,x:440.1,y:321.8},0).wait(1).to({scaleX:0.4036,scaleY:0.4037,x:418.75,y:317.1},0).wait(1).to({scaleX:0.4413,scaleY:0.4413,x:397.5,y:312.4},0).wait(1).to({scaleX:0.479,scaleY:0.479,x:376.25,y:307.65},0).wait(1).to({scaleX:0.5166,scaleY:0.5166,x:354.9,y:302.95},0).wait(1).to({scaleX:0.5543,scaleY:0.5543,x:333.65,y:298.25},0).wait(1).to({scaleX:0.592,scaleY:0.592,x:312.4,y:293.55},0).wait(1).to({scaleX:0.6296,scaleY:0.6296,x:291.1,y:288.85},0).wait(1).to({scaleX:0.6673,scaleY:0.6673,x:269.8,y:284.15},0).wait(1).to({scaleX:0.705,scaleY:0.705,x:248.55,y:279.45},0).wait(1).to({scaleX:0.7426,scaleY:0.7426,x:227.25,y:274.7},0).wait(1).to({scaleX:0.7803,scaleY:0.7803,x:205.95,y:270.05},0).wait(1).to({scaleX:0.8179,scaleY:0.818,x:184.65,y:265.35},0).wait(1).to({scaleX:0.8539,scaleY:0.854,x:182.5,y:239.9},0).wait(1).to({scaleX:0.8899,scaleY:0.89,x:180.35,y:214.45},0).wait(1).to({scaleX:0.9259,scaleY:0.926,x:178.15,y:188.95},0).wait(1).to({scaleX:0.9619,scaleY:0.962,x:175.95,y:163.55},0).wait(1).to({scaleX:0.9979,scaleY:0.998,x:173.8,y:138.1},0).wait(1).to({scaleX:1.0339,scaleY:1.034,x:171.6,y:112.6},0).wait(1).to({scaleX:1.0699,scaleY:1.07,x:169.4,y:87.15},0).wait(1).to({scaleX:1.1059,scaleY:1.106,x:188.75,y:120.9},0).wait(1).to({scaleX:1.1419,scaleY:1.142,x:208.1,y:154.55},0).wait(1).to({scaleX:1.1779,scaleY:1.178,x:227.45,y:188.25},0).wait(1).to({scaleX:1.2139,scaleY:1.214,x:246.75,y:221.95},0).wait(1).to({scaleX:1.2499,scaleY:1.25,x:266.1,y:255.6},0).wait(1).to({scaleX:1.2859,scaleY:1.286,x:285.45,y:289.35},0).wait(1).to({scaleX:1.3219,scaleY:1.322,x:304.75,y:323.05},0).wait(1).to({scaleX:1.3579,scaleY:1.358,x:324.1,y:356.7},0).wait(1).to({scaleX:1.394,scaleY:1.394,x:343.4,y:390.4},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.リカバリ_課題 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [176];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_176 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(176).call(this.frame_176).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(480.1,320.1,0.544,0.544,0,0,0,0.2,0.2);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(1).to({regX:0,regY:0,scaleX:0.527,scaleY:0.527,x:480.0034,y:320.0034},0).wait(1).to({scaleX:0.51,scaleY:0.51,x:480.0068,y:320.0068},0).wait(1).to({scaleX:0.493,scaleY:0.493,x:480.0102,y:320.0102},0).wait(1).to({scaleX:0.476,scaleY:0.476,x:480.0136,y:320.0136},0).wait(1).to({scaleX:0.459,scaleY:0.459,x:480.017,y:320.017},0).wait(1).to({scaleX:0.442,scaleY:0.442,x:480.0204,y:320.0204},0).wait(1).to({scaleX:0.425,scaleY:0.425,x:480.0238,y:320.0238},0).wait(1).to({scaleX:0.408,scaleY:0.408,x:480.0272,y:320.0272},0).wait(1).to({scaleX:0.391,scaleY:0.391,x:480.0306,y:320.0306},0).wait(1).to({scaleX:0.374,scaleY:0.374,x:480.034,y:320.034},0).wait(1).to({scaleX:0.357,scaleY:0.357,x:480.0374,y:320.0374},0).wait(1).to({scaleX:0.34,scaleY:0.34,x:480.0408,y:320.0408},0).wait(1).to({scaleX:0.323,scaleY:0.323,x:480.0442,y:320.0442},0).wait(1).to({scaleX:0.306,scaleY:0.306,x:480.0476,y:320.0476},0).wait(1).to({scaleX:0.289,scaleY:0.289,x:480.051,y:320.051},0).wait(1).to({scaleX:0.272,scaleY:0.272,x:480.0544,y:320.0544},0).wait(1).to({scaleX:0.255,scaleY:0.255,x:480.0578,y:320.0578},0).wait(1).to({scaleX:0.238,scaleY:0.238,x:480.0612,y:320.0612},0).wait(1).to({scaleX:0.221,scaleY:0.221,x:480.0646,y:320.0646},0).wait(1).to({scaleX:0.204,scaleY:0.204,x:480.068,y:320.068},0).wait(1).to({scaleX:0.187,scaleY:0.187,x:480.0714,y:320.0714},0).wait(1).to({scaleX:0.17,scaleY:0.17,x:480.0748,y:320.0748},0).wait(1).to({scaleX:0.153,scaleY:0.153,x:480.0782,y:320.0782},0).wait(1).to({scaleX:0.136,scaleY:0.136,x:480.0816,y:320.0816},0).wait(1).to({scaleX:0.1359},0).wait(1).to({scaleX:0.1358},0).wait(1).to({scaleX:0.1357,x:480.0817},0).wait(2).to({scaleX:0.1356},0).wait(1).to({scaleX:0.1355},0).wait(1).to({scaleX:0.1354},0).wait(1).to({scaleX:0.1353},0).wait(1).to({x:480.0818},0).wait(1).to({scaleX:0.1352},0).wait(1).to({scaleX:0.1351},0).wait(1).to({scaleX:0.135},0).wait(1).to({scaleX:0.1349},0).wait(2).to({scaleX:0.1348},0).wait(1).to({scaleX:0.1347,x:480.0819},0).wait(1).to({scaleX:0.1346},0).wait(2).to({scaleX:0.1345},0).wait(1).to({scaleX:0.1344},0).wait(1).to({scaleX:0.1343},0).wait(1).to({scaleX:0.1342,x:480.082},0).wait(2).to({scaleX:0.1341},0).wait(1).to({scaleX:0.134},0).wait(1).to({scaleX:0.1339},0).wait(1).to({scaleX:0.1338},0).wait(1).to({x:480.0821},0).wait(1).to({scaleX:0.1337},0).wait(1).to({scaleX:0.1336},0).wait(1).to({scaleX:0.1335},0).wait(2).to({scaleX:0.1334},0).wait(1).to({scaleX:0.1333},0).wait(1).to({scaleX:0.1332,x:480.0822},0).wait(1).to({scaleX:0.1331},0).wait(2).to({scaleX:0.133},0).wait(1).to({scaleX:0.1329},0).wait(1).to({scaleX:0.1328},0).wait(1).to({scaleX:0.1327,x:480.0823},0).wait(2).to({scaleX:0.1323,scaleY:0.1358},0).wait(1).to({scaleX:0.1319,scaleY:0.1356,x:480.0824,y:320.0817},0).wait(1).to({scaleX:0.1315,scaleY:0.1354,x:480.0825},0).wait(1).to({scaleX:0.1311,scaleY:0.1352,x:480.0826,y:320.0818},0).wait(1).to({scaleX:0.1307,scaleY:0.135,x:480.0827},0).wait(1).to({scaleX:0.1303,scaleY:0.1349},0).wait(1).to({scaleX:0.1299,scaleY:0.1347,x:480.0828,y:320.0819},0).wait(1).to({scaleX:0.1296,scaleY:0.1345,x:480.0829},0).wait(1).to({scaleX:0.1292,scaleY:0.1343,x:480.083},0).wait(1).to({scaleX:0.1288,scaleY:0.1341,y:320.082},0).wait(1).to({scaleX:0.1284,scaleY:0.1339,x:480.0831},0).wait(1).to({scaleX:0.128,scaleY:0.1337,x:480.0832,y:320.0821},0).wait(1).to({scaleX:0.1276,scaleY:0.1336,x:480.0833},0).wait(1).to({scaleX:0.1272,scaleY:0.1334,x:480.0834},0).wait(1).to({scaleX:0.1268,scaleY:0.1332,y:320.0822},0).wait(1).to({scaleX:0.1264,scaleY:0.133,x:480.0835},0).wait(1).to({scaleX:0.1261,scaleY:0.1328,x:480.0836},0).wait(1).to({scaleX:0.1257,scaleY:0.1326,x:480.0837,y:320.0823},0).wait(1).to({scaleX:0.1253,scaleY:0.1324},0).wait(1).to({scaleX:0.1249,scaleY:0.1323,x:480.0838,y:320.0824},0).wait(1).to({scaleX:0.1245,scaleY:0.1321,x:480.0839},0).wait(1).to({scaleX:0.1241,scaleY:0.1319,x:480.084},0).wait(1).to({scaleX:0.1237,scaleY:0.1317,x:480.0841,y:320.0825},0).wait(1).to({scaleX:0.1233,scaleY:0.1315},0).wait(1).to({scaleX:0.1229,scaleY:0.1313,x:480.0842},0).wait(1).to({scaleX:0.1225,scaleY:0.1311,x:480.0843,y:320.0826},0).wait(1).to({scaleX:0.1222,scaleY:0.131,x:480.0844},0).wait(1).to({scaleX:0.1218,scaleY:0.1308,x:480.0845,y:320.0827},0).wait(1).to({scaleX:0.1214,scaleY:0.1306},0).wait(1).to({scaleX:0.121,scaleY:0.1304,x:480.0846},0).wait(1).to({scaleX:0.1206,scaleY:0.1302,x:480.0847,y:320.0828},0).wait(1).to({scaleX:0.1202,scaleY:0.13,x:480.0848},0).wait(1).to({scaleX:0.1198,scaleY:0.1298},0).wait(1).to({scaleX:0.1497,scaleY:0.1592,x:480.0789,y:320.077},0).wait(1).to({scaleX:0.1796,scaleY:0.1885,x:480.0729,y:320.0711},0).wait(1).to({scaleX:0.2095,scaleY:0.2178,x:480.0669,y:320.0652},0).wait(1).to({scaleX:0.2394,scaleY:0.2471,x:480.0609,y:320.0594},0).wait(1).to({scaleX:0.2692,scaleY:0.2765,x:480.055,y:320.0535},0).wait(1).to({scaleX:0.2991,scaleY:0.3058,x:480.049,y:320.0476},0).wait(1).to({scaleX:0.329,scaleY:0.3351,x:480.043,y:320.0418},0).wait(1).to({scaleX:0.3589,scaleY:0.3644,x:480.037,y:320.0359},0).wait(1).to({scaleX:0.3888,scaleY:0.3938,x:480.031,y:320.0301},0).wait(1).to({scaleX:0.4187,scaleY:0.4231,x:480.0251,y:320.0242},0).wait(1).to({scaleX:0.4486,scaleY:0.4524,x:480.0191,y:320.0183},0).wait(1).to({scaleX:0.4784,scaleY:0.4817,x:480.0131,y:320.0125},0).wait(1).to({scaleX:0.5083,scaleY:0.5111,x:480.0071,y:320.0066},0).wait(1).to({scaleX:0.5382,scaleY:0.5404,x:480.0012,y:320.0007},0).wait(64));

	// プレゼント箱_obj_
	this.プレゼント箱 = new lib.シーン_1_プレゼント箱();
	this.プレゼント箱.name = "プレゼント箱";
	this.プレゼント箱.setTransform(483.9,319.85,1.8382,1.8382,0,0,0,482.1,319.9);
	this.プレゼント箱.depth = 0;
	this.プレゼント箱.isAttachedToCamera = 0
	this.プレゼント箱.isAttachedToMask = 0
	this.プレゼント箱.layerDepth = 0
	this.プレゼント箱.layerIndex = 0
	this.プレゼント箱.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.プレゼント箱).wait(1).to({regX:482.7,regY:430.5,scaleX:1,scaleY:1,x:484.5,y:430.5},0).wait(176));

	// 素材_イッヌ_obj_
	this.素材_イッヌ = new lib.シーン_1_素材_イッヌ();
	this.素材_イッヌ.name = "素材_イッヌ";
	this.素材_イッヌ.setTransform(482.25,330.7,1.8382,1.8382,0,0,0,481.2,325.8);
	this.素材_イッヌ.depth = 0;
	this.素材_イッヌ.isAttachedToCamera = 0
	this.素材_イッヌ.isAttachedToMask = 0
	this.素材_イッヌ.layerDepth = 0
	this.素材_イッヌ.layerIndex = 1
	this.素材_イッヌ.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.素材_イッヌ).wait(1).to({regX:615.3,regY:231.8,scaleX:1,scaleY:1,x:616.3,y:236.65},0).wait(176));

	// 素材_雪だるま_obj_
	this.素材_雪だるま = new lib.シーン_1_素材_雪だるま();
	this.素材_雪だるま.name = "素材_雪だるま";
	this.素材_雪だるま.setTransform(495.5,330.55,1.8382,1.8382,0,0,0,488.4,325.7);
	this.素材_雪だるま.depth = 0;
	this.素材_雪だるま.isAttachedToCamera = 0
	this.素材_雪だるま.isAttachedToMask = 0
	this.素材_雪だるま.layerDepth = 0
	this.素材_雪だるま.layerIndex = 2
	this.素材_雪だるま.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.素材_雪だるま).wait(1).to({regX:490.2,regY:235.9,scaleX:1,scaleY:1,x:497.25,y:240.65},0).wait(176));

	// boy_obj_
	this.boy = new lib.シーン_1_boy();
	this.boy.name = "boy";
	this.boy.setTransform(484.45,327.75,1.8382,1.8382,0,0,0,482.4,324.2);
	this.boy.depth = 0;
	this.boy.isAttachedToCamera = 0
	this.boy.isAttachedToMask = 0
	this.boy.layerDepth = 0
	this.boy.layerIndex = 3
	this.boy.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.boy).wait(1).to({regX:311.2,regY:247.7,scaleX:1,scaleY:1,x:313.3,y:251.25},0).wait(176));

	// 飾り_obj_
	this.飾り = new lib.シーン_1_飾り();
	this.飾り.name = "飾り";
	this.飾り.setTransform(485,336.95,1.8382,1.8382,0,0,0,482.7,329.2);
	this.飾り.depth = 0;
	this.飾り.isAttachedToCamera = 0
	this.飾り.isAttachedToMask = 0
	this.飾り.layerDepth = 0
	this.飾り.layerIndex = 4
	this.飾り.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.飾り).wait(1).to({regX:529.9,regY:202,scaleX:1,scaleY:1,x:532.2,y:209.75},0).wait(176));

	// girl_obj_
	this.girl = new lib.シーン_1_girl();
	this.girl.name = "girl";
	this.girl.setTransform(487.05,332.9,1.8382,1.8382,0,0,0,483.8,327);
	this.girl.depth = 0;
	this.girl.isAttachedToCamera = 0
	this.girl.isAttachedToMask = 0
	this.girl.layerDepth = 0
	this.girl.layerIndex = 5
	this.girl.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.girl).wait(1).to({regX:653.5,regY:276.7,scaleX:1,scaleY:1,x:656.7,y:282.6},0).wait(176));

	// happywinter_obj_
	this.happywinter = new lib.シーン_1_happywinter();
	this.happywinter.name = "happywinter";
	this.happywinter.setTransform(515.9,88.8,1.8382,1.8382,0,0,0,499.5,194.2);
	this.happywinter.depth = 0;
	this.happywinter.isAttachedToCamera = 0
	this.happywinter.isAttachedToMask = 0
	this.happywinter.layerDepth = 0
	this.happywinter.layerIndex = 6
	this.happywinter.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.happywinter).wait(1).to({regX:503.3,regY:173.4,scaleX:1,scaleY:1,x:519.7,y:68.1},0).wait(176));

	// ロゴ_obj_
	this.ロゴ = new lib.シーン_1_ロゴ();
	this.ロゴ.name = "ロゴ";
	this.ロゴ.setTransform(506.35,130.75,1.8382,1.8382,0,0,0,494.3,217);
	this.ロゴ.depth = 0;
	this.ロゴ.isAttachedToCamera = 0
	this.ロゴ.isAttachedToMask = 0
	this.ロゴ.layerDepth = 0
	this.ロゴ.layerIndex = 7
	this.ロゴ.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ロゴ).wait(1).to({regX:506.3,regY:154.6,scaleX:1,scaleY:1,x:518.3,y:68.3},0).wait(176));

	// 木_obj_
	this.木 = new lib.シーン_1_木();
	this.木.name = "木";
	this.木.setTransform(492.2,323.9,1.8382,1.8382,0,0,0,486.6,322.1);
	this.木.depth = 0;
	this.木.isAttachedToCamera = 0
	this.木.isAttachedToMask = 0
	this.木.layerDepth = 0
	this.木.layerIndex = 8
	this.木.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.木).wait(1).to({regX:342,regY:234.3,scaleX:1,scaleY:1,x:347.55,y:236.1},0).wait(176));

	// 背景_obj_
	this.背景 = new lib.シーン_1_背景();
	this.背景.name = "背景";
	this.背景.setTransform(467.35,319.3,1.8382,1.8382,0,0,0,473.1,319.6);
	this.背景.depth = 0;
	this.背景.isAttachedToCamera = 0
	this.背景.isAttachedToMask = 0
	this.背景.layerDepth = 0
	this.背景.layerIndex = 9
	this.背景.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.背景).wait(177));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(600.3,326.3,232,257.8);
// library properties:
lib.properties = {
	id: 'B6E7815C8A9742C28A38A4F404196B64',
	width: 960,
	height: 640,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Image.png", id:"Image"},
		{src:"images/課題_atlas_1.png", id:"課題_atlas_1"}
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
an.compositions['B6E7815C8A9742C28A38A4F404196B64'] = {
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

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
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

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
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