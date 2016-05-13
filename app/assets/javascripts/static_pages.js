$(document).ready(function() {
  var data = [4, 8, 15, 16, 23, 42];

  var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 420]);

  d3.select(".chart")
    .selectAll("div")
      .data(data)
    .enter().append("div")
      .style("width", function(d) { return x(d) + "px"; })
      .text(function(d) { return d; });


  var width = 420,
      barHeight = 20;

  var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, width]);

  var chart = d3.select(".chart_two")
      .attr("width", width)
      .attr("height", barHeight * data.length);

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0, " + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", x)
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", function(d) { return x(d) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d; });


  var width = 600,
      height = 600;

  var svg = d3.select(".map")
      .attr("width", width)
      .attr("height", height);

  var projection = d3.geo.albersUsa()
      .scale(700)
      .translate([width/2, height/2]);

  var path = d3.geo.path()
      .projection(projection);

  d3.json("us.json", function(json) {
    svg.selectAll("path")
        .data(json.features)
      .enter().append("path")
        .attr("d", path);
  });
});
