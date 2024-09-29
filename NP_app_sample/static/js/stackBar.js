function loadDataAndVisualize() {
  let url = '/api/v1.0/get_index';

  d3.json(url).then(function(data) {
    console.log(data); 
    make_bar(data.stackBar_data);
  });
}

function make_bar(data) {
  // Define dimensions
  const margin = { top: 20, right: 30, bottom: 40, left: 70 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // Create SVG container
  const svg = d3.select("#stack_bar_chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Define scales
  const x = d3.scaleBand()
    .domain(data.map(d => d.State))
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Total_Endangered_Species)])
    .nice()
    .range([height, 0]);

  // Define color scale
  const color = d3.scaleOrdinal()
  .domain(data.map(d => d.State))
  .range([
      "#f8b400", "#f28e1c", "#e63946", "#f1faee", "#a8dadc",
      "#457b9d", "#1d3557", "#2a9d8f", "#e9c46a", "#f1faee"
  ]);

  // Add X axis
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .append("text")
    .attr("class", "axis-label")
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("fill", "#fff")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .style("text-anchor", "middle")
    .text("State");

  // Add Y axis
  svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20) // to move the label
    .attr("x", -height / 3 - 90)
    .attr("fill", "#fff")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .style("text-anchor", "middle")
    .text("Endangered Species Count in Parks");

  // Create tooltip div
  const tooltip = d3.select("#tooltip")
  .style("width", "300px")
  .style("height", "50px")
  .style("position", "absolute");

  // Add bars with custom colors
  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.State))
    .attr("y", d => y(d.Total_Endangered_Species))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.Total_Endangered_Species))
    .attr("fill", d => color(d.State))
    .on("mouseover", function(event, d) {
      tooltip.transition().duration(200).style("opacity", .9);
      tooltip.html(`State: ${d.State}<br>Total Endangered Species: ${d.Total_Endangered_Species}`)
        .style("left", `${event.pageX + 1}px`)
        .style("top", `${event.pageY - 10}px`)
        
    })
    
    // Update mouseover event
    .on("mouseover", function(event, d) {
      tooltip.transition().duration(200).style("opacity", .9);
      tooltip.html(`State: ${d.State}<br>Total Endangered Species: ${d.Total_Endangered_Species}`)
        .style("left", `${event.pageX}px`)
        .style("top", `${event.pageY}px`);
});
}

// Call the function to load data and create the bar chart
loadDataAndVisualize();

