//Function to draw SVGs using D3
var returnWidth = function(){
	if ($(window).width()< 900) {
		return 900;
	} else {
		return $(window).width();
	}
};
var theWidth = returnWidth();
var startWidth = theWidth;
var theHeight = theWidth*0.8;

console.log(theWidth);
console.log(theHeight);

d3.select(window)
	.on('resize', sizeChange);

function sizeChange(){
	console.log("Resizing!!!!");
	theWidth = returnWidth();
	d3.selectAll("g").attr("transform", "scale(" + theWidth/startWidth + ")");
	$("svg").width($("#mySVG").width());
	$("svg").height($("#mySVG").width()*0.8);

	console.log($("#mySVG").width());
}


function SuccessCircles(theData){
	d3.select("#scalename").remove();
	d3.select("#end").remove();
	d3.select("#start").remove();
	d3.selectAll("svg").remove();
	var width=theWidth;
		height=theHeight;

	var svg = d3.select("#mySVG")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append('g');
	
	
	//Assigning color based on their sequence
	var color = d3.scale.quantize()
		.range(["#0fd6d1", "#a2d3f9","#c59fee", "#f6cef5","#eea1b8"]);

	color.domain(d3.extent(theData, function(d,i) {
		var currentVal = Number(d.average_across_money_making_companies);
		return currentVal;
	}));

	var circleLayout = d3.layout.pack()
			.sort(null)
			.size([width,height])
			.value(function(myObj,i){
				var floatnum = Number(myObj.average_across_money_making_companies);
				return floatnum;
			})
			.padding(1);

	d3.select('#keyscale')
		.selectAll('ul')
		.remove();

	// build the map keyscale
	var myScale = d3.select('#keyscale')
			.append('ul')
			.attr('class', 'list-inline');

	var keys = myScale.selectAll('li.key')
			.data(color.range());

	var scale_items = ["Low tax rate", "", "", "", "High tax rate"];

	keys.enter().append('li')
		.attr('class', 'key')
		.style('border-top-color', String)
		.text(function (d, i) {
			return scale_items[i];
		});


	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
		return "<p>Industry: <strong>" + d.industry_name + "</strong></p><p>Tax Rate: <strong>"+ d.average_across_money_making_companies +"%</strong></p>";
		});

	svg.call(tip);

	svg.selectAll("circle")
		.data(circleLayout.nodes({children: theData}))
		.enter()
		.append("circle")
		//position and add attributes, styles
		.attr('class', 'mainCircle')
		.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
		.attr('r', function(myObj){
			if (myObj.average_across_money_making_companies){
				var floatnum = Number(myObj.average_across_money_making_companies);
				return floatnum;
			}
			else{
				return 0;
			}
		})
		.style('fill',function(myObj, i) {
			var currentVal = Number(myObj.average_across_money_making_companies);
			return color(currentVal);
		})
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide);

}


function AverageCircles(theData){
	d3.select("#scalename").remove();
	d3.select("#end").remove();
	d3.select("#start").remove();
	d3.selectAll("svg").remove();
	var width=theWidth;
		height=theHeight;

	var svg = d3.select("#mySVG")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append('g');
	

	console.log($("#mySVG").width());

	//Assigning color based on their sequence
	var color = d3.scale.quantize()
		.range(["#0fd6d1", "#a2d3f9","#c59fee", "#f6cef5","#eea1b8"]);

	color.domain(d3.extent(theData, function(d,i) {
		var currentVal = Number(d.average_all_companies);
		return currentVal;
	}));

	var circleLayout = d3.layout.pack()
			.sort(null)
			.size([width,height])
			.value(function(myObj){
				var floatnum = Number(myObj.average_all_companies);
				return floatnum;
			})
			.padding(1);

	d3.select('#keyscale')
		.selectAll('ul')
		.remove();

	// build the map keyscale
	var myScale = d3.select('#keyscale')
			.append('ul')
			.attr('class', 'list-inline');

	var keys = myScale.selectAll('li.key')
			.data(color.range());

	var scale_items = ["Low tax rate", "", "", "", "High tax rate"];

	keys.enter().append('li')
		.attr('class', 'key')
		.style('border-top-color', String)
		.text(function (d, i) {
			return scale_items[i];
		});

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
		return "<p>Industry: <strong>" + d.industry_name + "</strong></p><p>Tax Rate: <strong>"+ d.average_all_companies +"%</strong></p>";
		});

	svg.call(tip);


	svg.selectAll("circle")
		.data(circleLayout.nodes({children: theData}))
		.enter()
		.append("circle")
		//position and add attributes, styles
		.attr('class', 'mainCircle')
		.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
		.attr('r', function(myObj){
			if (myObj.average_all_companies){
				var floatnum = Number(myObj.average_all_companies);
				return floatnum;
			}
			else{
				return 0;
			}
		})
		.style('fill',function(myObj) {
			var currentVal = Number(myObj.average_all_companies);
			return color(currentVal);
		})
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide);

}


function comparison(theData){

	d3.selectAll("svg").remove();
	var width=theWidth;
		height=theHeight;

	var svg = d3.select("#mySVG")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append('g');
	
	
	//Assigning color based on their sequence
	var color = d3.scale.linear()
			.range(["red", 'yellow']);
		//.range(["#c59fee", "#f6cef5", "#0fd6d1", "#a2d3f9", "#eea1b8"]);

	color.domain(d3.extent(theData, function(d,i) {
		//var currentVal = Number(d.average_across_money_making_companies);
		return i+1;
	}));

	var w=120, h=400;
	var key = d3.select("body")
				.append("svg")
				.attr("id", "gradientScale")
				.attr("width", w)
				.attr("height", h);
	var legend = key.append("defs")
					.append("svg:linearGradient")
					.attr("id", "gradient")
					.attr("x1", "100%")
					.attr("y1", "0%")
					.attr("x2", "100%")
					.attr("y2", "100%")
					.attr("spreadMethod", "pad");
	legend.append("stop")
		.attr("offset", "0%")
		.attr("stop-color", "red")
		.attr("stop-opacity", 1);
	legend.append("stop")
		.attr("offset", "100%")
		.attr("stop-color", "yellow")
		.attr("stop-opacity", 1);
	key.append("rect")
		.attr("width", w - 100)
		.attr("height", h - 100)
		.style("fill", "url(#gradient)")
		.attr("transform", "translate(0,10)");

	var y = d3.scale.linear()
				.range([300, 0])
				.domain([1, 100]);

	d3.select("body").append("p").attr("id", "start").text("A");
	d3.select("body").append("p").attr("id", "end").text("T");
	d3.select("body").append("text").attr("id", "scalename").text("Industry Initials");
	d3.select("#scalename")
		.style("text-anchor","middle")
		.attr("transform", "translate(30, 300) rotate(90)");

	var circleLayout = d3.layout.pack()
			.sort(null)
			.size([width,height])
			.value(function(myObj,i){
				var floatnum = Number(myObj.average_across_money_making_companies);
				return floatnum;
			})
			.padding(1);

	d3.select('#keyscale')
		.selectAll('ul')
		.remove();

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
		return "<p><strong>SUCCESSFUL</strong></p><p>Industry: <strong>" + d.industry_name + "</strong></p><p>Tax Rate: <strong>"+ d.average_across_money_making_companies +"%</strong></p>";
		});

	svg.call(tip);

	svg.selectAll("circle")
		.data(circleLayout.nodes({children: theData}))
		.enter()
		.append("circle")
		//position and add attributes, styles
		.attr('class', 'mainCircle')
		.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
		.attr('r', function(myObj){
			if (myObj.average_across_money_making_companies){
				var floatnum = Number(myObj.average_across_money_making_companies);
				return floatnum;
			}
			else{
				return 0;
			}
		})
		.style('fill',function(myObj, i) {
			return color(i+1);
		})
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide);

var svg2 = d3.select("svg")
		.attr("width", width)
		.attr("height", height)
		.append('g');
	

	var circleLayout2 = d3.layout.pack()
			.sort(null)
			.size([width,height])
			.value(function(myObj){
				var floatnum = Number(myObj.average_all_companies);
				return floatnum;
			})
			.padding(1);


	var tip2 = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
		return "<p><strong>AVERAGE</strong></p><p>Industry: <strong>" + d.industry_name + "</strong></p><p>Tax Rate: <strong>"+ d.average_all_companies +"%</strong></p>";
		});

	svg2.call(tip2);


	svg2.selectAll("circle")
		.data(circleLayout.nodes({children: theData}))
		.enter()
		.append("circle")
		//position and add attributes, styles
		.attr('class', 'mainCircle')
		.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
		.attr('r', function(myObj){
			if (myObj.average_all_companies){
				var floatnum = Number(myObj.average_all_companies);
				return floatnum;
			}
			else{
				return 0;
			}
		})
		.style('opacity', '0.7')
		.style('fill',"white")
		.on('mouseover', tip2.show)
		.on('mouseout', tip2.hide);

}

var dataset;
function loadData(){
	d3.csv("taxrate_edited.csv", function(error, data) {
		if (error) {
			console.log('error');
		} else {
			dataset = data;
			$ ("#successButton").click(function(){

				console.log("you clicked successButton");
				SuccessCircles(dataset);
			});

			$ ("#averageButton").click(function(){

				console.log("you clicked averageButton");
				AverageCircles(dataset);
			});

			$ ("#compareButton").click(function(){

				console.log("you clicked compareButton");
				comparison(dataset);
			});
		}
	});
}


$('document').ready(function(){
	loadData();
});