const dataset = [];
const width = 640;
const height = 480;

d3.json("./data.json")
  .then((dataset) => {
    const padding = 20;
    const max = d3.max(dataset, (data) => data.val);

    const scale = d3.scaleLinear().domain([0, max]).range([0, 300]);

    const svg = d3.select("body").append("svg").attr("viewBox", "0 0 500 300");

    const g = svg
      .selectAll(".item")
      .data(dataset)
      .enter()
      .append("g")
      .classed("item", true)
      .attr(
        "transform",
        (data, index) => `translate(${padding},${index * 90 + padding})`
      );

    g.append("rect")
      .attr("width", 0)
      .attr("height", 20)
      .attr("x", 110)
      .attr("y", 35)
      .attr("fill", (data, index) => d3.schemeCategory10[index % 10]) // 色を変更
      .attr("opacity", 0) // 初期の不透明度を0に設定
      .transition()
      .duration(1000)
      .delay((data, index) => index * 500)
      .ease(d3.easeBounce) // バウンス効果を追加
      .attr("width", (data) => scale(data.val))
      .attr("x", (data) => 110 - scale(data.val)) // スライドイン効果
      .transition() // 不透明度のアニメーションを追加
      .duration(500)
      .attr("opacity", 1) // 最終的に不透明度を1に設定
      .attr("x", 110); // 最終的な位置に戻す

    g.append("text")
      .classed("label", true)
      .text((data) => data.label)
      .attr("font-size", "14px")
      .attr("x", 110)
      .attr("y", 20)
      .attr("opacity", 0) // 初期の不透明度を0に設定
      .transition()
      .duration(500)
      .delay((data, index) => index * 500 + 1000) // 矩形の後に遅延
      .attr("opacity", 1); // フェードイン

    g.append("text")
      .classed("val", true)
      .text((data) => data.val)
      .attr("font-size", "14px")
      .attr("x", 110)
      .attr("y", 50)
      .attr("opacity", 0) // 初期の不透明度を0に設定
      .transition()
      .duration(500)
      .delay((data, index) => index * 500 + 1000) // 矩形の後に遅延
      .attr("opacity", 1) // フェードイン
      .transition()
      .duration(1000)
      .attr("x", (data) => 110 + scale(data.val)); // 値の位置を更新

    g.append("image")
      .attr("href", (data) => data.url)
      .attr("width", 100)
      .attr("height", 100)
      .attr("opacity", 0) // 初期の不透明度を0に設定
      .attr("transform", "scale(0)") // 初期サイズを0に設定
      .transition()
      .duration(500)
      .delay((data, index) => index * 500 + 1500) // テキストの後に遅延
      .attr("opacity", 1) // フェードイン
      .attr("transform", "scale(1)"); // サイズを元に戻す
  })
  .catch((error) => {});
