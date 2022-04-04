testArray = [
    {time: 1, price: 52},
    {time: 2, price: 46},
    {time: 3, price: 63},
    {time: 4, price: 56},
    {time: 5, price: 75}
];

async function createLineGraph(data) {
    console.log(data);

    const dimensions = {
        width: window.innerWidth * 0.66,
        height: window.innerHeight * 0.33,
        margins: {
            top: 15,
            right: 15,
            bottom: 40,
            left: 60
        }
    }

    dimensions.boundedWidth = dimensions.width
        - dimensions.margins.left
        - dimensions.margins.right;
    dimensions.boundedHeight = dimensions.height
        - dimensions.margins.top
        - dimensions.margins.bottom;

    function yAccessor(dPoint) {
        return dPoint["price"];
    }

    function xAccessor(dPoint) {
        return dPoint["time"];
    }

    // Create scales

    const wrapper = d3.select(".graph")
        .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height);

    // g is the equivalent of a div element but for svg elements
    const bounds = wrapper.append("g")
            .style("transform", `translate(${
                dimensions.margins.left
            }px, ${
                dimensions.margins.top
            }px)`);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yAccessor))
        .range([dimensions.boundedHeight, 0]);
    
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, xAccessor))
        .range([0, dimensions.boundedWidth]);
    
    // Draw data

    const lineGenerator = d3.line()
            .x(d => xScale(xAccessor(d)))
            .y(d => yScale(yAccessor(d)));
    const line = bounds.append("path")
            // d defines the shape to be drawn
            .attr("d", lineGenerator(data))
            .attr("fill", "none")
            .attr("stroke", "cornflowerblue")
            .attr("stroke-width", 3);

    // Draw peripherals

    const yAxisGenerator = d3.axisLeft()
        .scale(yScale);

    const xAxisGenerator = d3.axisBottom()
        .scale(xScale);
    
    // Creates 2 groups and draws the x and y axes in them
    const yAxis = bounds.append("g")
        .call(yAxisGenerator);

    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`);
}

createLineGraph(testArray);