const dataset = [];
const width = 640;
const height = 480;
d3.json("./data.json")
  .then((dataset) => {
    const svg = d3.create("svg").attr("viewBox", `0 0 ${width} ${height}`);

    const g = svg
      .selectAll(".item")
      .data(dataset)
      .enter()
      .append("g")
      .classed("item", true)
      .attr("transform", (data, index) => `translate(0,${index * 80})`);

    g.append("rect")
      .attr("x", 120)
      .attr("y", 25)
      .attr("width", 0)
      .attr("height", 18)
      .attr("fill", (data) => data.color)
      .transition()
      .duration(1000)
      .attr("width", (data) => data.val * 0.001);

    g.append("text")
      .classed("label", true)
      .attr("font-size", "14")
      .attr("x", 120)
      .attr("y", 15)
      .text((data) => data.label);

    g.append("text")
      .classed("val", true)
      .attr("font-size", "14")
      .attr("x", 120)
      .attr("y", 60)
      .transition()
      .duration(1000)
      .tween("text", function (data) {
        const i = d3.interpolate(0, data.val);
        return function (t) {
          d3.select(this).text(Math.round(i(t)));
        };
      });

    g.append("image")
      .attr("href", (data) => data.url)
      .attr("width", 60)
      .attr("height", 60);

    container.append(svg.node());
  })
  .catch((error) => {});
