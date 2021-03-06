var QUnit = require('steal-qunit');
var SimpleMap = require('./can-simple-map');
var compute = require('can-compute');
var clone = require('steal-clone');

QUnit.module('can-simple-map');

QUnit.test("adds defaultMap type", function() {
	stop();
	var c = clone();

	// ensure types.DefaultMap is not impacted by
	// other map types that may have been loaded
	c.import('can-util/js/types/types').then(function(types) {
		c.import('./can-simple-map').then(function(SimpleMap) {
			var map = new types.DefaultMap();
			QUnit.ok(map instanceof SimpleMap);
			start();
		});
	});
});

QUnit.test("instantiates and gets events", 2, function() {
	var map = new SimpleMap({ age: 29 });

	map.on('age', function(ev, newVal, oldVal) {
		QUnit.equal(oldVal, 29);
		QUnit.equal(newVal, 30);
	});

	map.attr('age', 30);
});

QUnit.test("trying to read constructor from refs scope is ok", function(){
	var map = new SimpleMap();
	var construct = compute(function(){
		return map.attr("constructor");
	});
	construct.bind("change", function(){});
	equal(construct(), SimpleMap);
});
