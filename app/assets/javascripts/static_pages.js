$(document).ready(function() {
  // Bar chart part 1
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


  // Bar chart part 2a
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


  // Bar chart part 2b
  var width = 420,
      barHeight = 20;

  var x = d3.scale.linear()
      .range([0, width]);

  var chart = d3.select(".chart_three")
      .attr("width", width);

  d3.tsv("data.tsv", type, function(error, data) {
    x.domain([0, d3.max(data, function(d) { return d.value; })]);

    chart.attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0, " + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", function(d) { return x(d.value); })
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return x(d.value) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.value; });
  });

  function type(d) {
    d.value = +d.value; // coerce to number
    return d;
  }


  // Bar chart part 3
  function chart_four() {
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    var chart = d3.select(".chart_four")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("letter_data.tsv", type, function(error, data) {
      x.domain(data.map(function(d) { return d.letter; }));
      y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

      chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      chart.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency");

      chart.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.letter); })
          .attr("y", function(d) { return y(d.frequency); })
          .attr("height", function(d) { return height - y(d.frequency); })
          .attr("width", x.rangeBand());
    });

    function type(d) {
      d.frequency = +d.frequency; // coerce to number
      return d;
    }
  }

  chart_four();


  // Map tutorial
  var width = 600,
      height = 400;

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
