let exchangeRateData = [];

let currentPeriod = 'weekly';

let allExchangeRateData = {};

function fetchRealtimeExchangeRate() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rate = parseFloat(data['Realtime Currency Exchange Rate']['5. Exchange Rate']);

            const newDataPoint = {
                date: new Date(),
                rate: rate
            };

            exchangeRateData.push(newDataPoint);
            if (exchangeRateData.length > 7) {
                exchangeRateData.shift();
            }

            updateChart();
        })
        .catch(error => {
            console.error('為替レート取得エラー:', error);
        });
}

function updateChart() {
    d3.select('#conteiner svg').remove();
    drawChart(exchangeRateData);
}

function drawChart(data) {
    const container = d3.select('#conteiner');
    container.selectAll('*').remove();

    const margin = { top: 50, right: 100, bottom: 100, left: 100 };
    const width = 1600 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = container
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([d3.min(data, d => d.rate) * 0.99, d3.max(data, d => d.rate) * 1.01])
        .range([height, 0]);

    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.rate));

    const path = svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2);

    const totalLength = path.node().getTotalLength();

    path
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);

    const points = svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.rate))
        .attr('r', 4)
        .style('fill', 'steelblue')
        .style('opacity', 0);

    points.transition()
        .delay((d, i) => i * 100)
        .duration(500)
        .style('opacity', 1);

    const xAxis = d3.axisBottom(x)
        .ticks(data.length)
        .tickFormat(d3.timeFormat('%Y年%m月%d日'));

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-45)');

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y).tickFormat(d => `${d}円`).ticks(10));

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 0 - margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .text(currentPeriod === 'monthly' ? '月' : '日付');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left + 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .text('為替レート (円)');
}

d3.json('./data.json').then(function (data) {
    allExchangeRateData = data;

    exchangeRateData = data.weekly.map(item => ({
        date: new Date(item.date.replace('年', '/').replace('月', '/').replace('日', '')),
        rate: item.rate
    }));

    drawChart(exchangeRateData);

    const buttons = document.querySelectorAll('.button-container button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            currentPeriod = button.dataset.period;

            exchangeRateData = allExchangeRateData[currentPeriod]
                .map(item => {
                    const formattedDate = item.date.replace('年', '/').replace('月', '/').replace('日', '');
                    const parsedDate = new Date(formattedDate);

                    if (isNaN(parsedDate) || isNaN(item.rate)) {
                        console.warn('無効なデータをスキップ:', item);
                        return null;
                    }

                    return {
                        date: parsedDate,
                        rate: item.rate
                    };
                })
                .filter(item => item !== null);

            drawChart(exchangeRateData);
        });
    });

    setInterval(fetchRealtimeExchangeRate, 60000);
}).catch(function (error) {
    console.error('初期データ読み込みエラー:', error);
});
