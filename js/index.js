//var data = [4, 8, 15, 16, 23, 42];
//
//var width = 420,
//    barHeight = 20;
//
//var x = d3.scale.linear()
//  .domain([0, d3.max(data)])
//  .range([0, width]);
//
//var chart = d3.select(".chart")
//  .attr("width", width)
//  .attr("height", barHeight * data.length);
//
//var bar = chart.selectAll("g")
//  .data(data)
//  .enter().append("g")
//  .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
//
//bar.append("rect")
//  .attr("width", x)
//  .attr("height", barHeight - 1);
//
//bar.append("text")
//  .attr("x", function(d) { return x(d) - 3; })
//  .attr("y", barHeight / 2)
//  .attr("dy", ".35em")
//  .text(function(d) { return d; });



var w = 500,                        //width
h = 500,                            //height
r = 250,                            //radius
color = d3.scale.category20c();     //builtin range of colors

data = [{"label":"chipotle", "value":15}, 
        {"label":"chickfila", "value":40}, 
        {"label":"naanstop", "value":5},
        {"label":"wellsfargo", "value":20},
        {"label":"shakeshack", "value":10},
        {"label":"noodleplace", "value":10}
       ];

var vis = d3.select('#spinner')
    .append("svg:svg")              //create the SVG element inside the <body>
    .data([data])                   //associate our data with the document
        .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", h)
    .append("svg:g")                //make a group to hold our pie chart
        .attr("transform", "translate(" + r + "," + r + ")");    //move the center of the pie chart from 0, 0 to radius, radius

var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
    .outerRadius(r);

var pie = d3.layout.pie()           //this will create arc data for us given a list of values
    .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
    .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
    .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
            .attr("class", "slice");    //allow us to style things in the slices (like text)

    arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
            .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    arcs.append("svg:text")                                     //add a label to each slice
            .attr("transform", function(d) {                    //set the label's origin to the center of the arc
            //we have to make sure to set these before calling arc.centroid
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle")                          //center the text on it's origin
        .text(function(d, i) { return data[i].label; });        //get the label from our original data array


var element = document.getElementById("spinner");
var button = document.getElementById("spin");
var finalDeg = Math.floor(Math.random() * 1800) + 1080;
element.style.webkitTransform = "rotate("+finalDeg+"deg)";

button.onclick = function(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  location.href = '/whatsforlunchtoday';
};


