function drawBarChart() {
    var margin = { top: 20, right: 30, bottom: 30, left: 40 };
    var size = { w: 900, h: 500 };
    var chart = d3.select('svg')
        .attr('width', size.w + margin.left + margin.right)
        .attr('height', size.h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var x = d3.scaleBand();
    var y = d3.scaleLinear();

    var xAxis = d3.axisBottom();
    var yAxis = d3.axisLeft();

    d3.tsv('data.tsv').then(d => {
        var frequencies = d.map(d => d.frequency);
        var letters = d.map(d => d.letter);

        x.domain(letters).range([0, size.w]);

        y.domain([0, d3.max(frequencies)]).range([size.h, 0]);

        yAxis.scale(y);
        xAxis.scale(x);

        chart.append('g')
            .attr("transform", `translate(0, ${size.h})`)
            .call(xAxis);

        chart.append('g')
            .attr("transform", `translate(0,0)`)
            .call(yAxis);

        var bar = chart.selectAll('g.bar')
            .data(d)
            .enter()
            .append('g')
            .attr('class', 'bar');

        bar.append('rect')
            .attr('x', d => x(d.letter))
            .attr('y', d => y(d.frequency))
            .attr('width', x.bandwidth())
            .attr('height', d => size.h - y(d.frequency))
    });
}



function log(val) {
    console.log(val);
}