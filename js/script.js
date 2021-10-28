const movieSalesAPI = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';


let movieSalesData = undefined;
let legendArr = [];

const canvas = d3.select('#treemap')


const drawTreeMap = () => {

    const hierarchy = d3.hierarchy(movieSalesData, node => {
        return node.children

    }).sum(node => {
        return node.value

    }).sort((node1, node2) => {
        return node2.value - node1.value
    })

    let createTreeMap = d3.treemap().size([1000, 600])

    createTreeMap(hierarchy)

    let movieTiles = hierarchy.leaves();

    // creatinglegend array 
    movieTiles.forEach(el => {
        if (legendArr.indexOf(el.data.category) == -1) {
            legendArr.push(el.data.category)
        }
    });

    let block = canvas.selectAll('g')
        .data(movieTiles)
        .enter()
        .append('g')
        .attr('transform', d => {
            return 'translate(' + d.x0 + ',' + d.y0 + ')'
        })

    const tooltip = d3.select('#tooltip')

    block.append('rect')
        .attr('class', 'tile')
        .attr('fill', d => {

            if (d.data.category == 'Action') {
                return 'green'
            }
            else if (d.data.category == 'Adventure') {
                return 'yellow'
            }
            else if (d.data.category == 'Comedy') {
                return 'blue'
            }
            else if (d.data.category == 'Drama') {
                return 'orange'
            }
            else if (d.data.category == 'Animation') {
                return 'gray'
            }
            else if (d.data.category == 'Family') {
                return 'red'
            }
            else if (d.data.category == 'Biography') {
                return 'pink'
            }
        })
        .attr('data-name', d => d.data.name)
        .attr('data-category', d => d.data.category)
        .attr('data-value', d => d.data.value)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .on('mouseover', d => {
            tooltip.style('visibility', 'visible')
            tooltip.attr('data-value', d.target.__data__.value)
            tooltip.style('top', `${d.clientY}px`)
            tooltip.style('left', `${d.clientX}px`)
            tooltip.html(
                `$ ${d.target.__data__.value}<hr/>${d.target.__data__.data.name}`
            )
            // console.log(d.target.__data__)
        })
        .on('mouseleave', d => {
            tooltip.style('visibility', 'hidden')
        })

    block.append('text')
        .text(d => {
            return d.data.name
        })
        .attr('x', 5)
        .attr('y', 20)
}



// legend 
// legend 
// legend 
// legend 
// legend 
const creatingLegend = () => {
    const legendWidth = 100;
    const legendHeight = 50;
    const legend = d3.select('#legend')

    legend.selectAll('rect')
        .data(legendArr)
        .enter()
        .append('rect')
        .attr('class', 'legend-item')
        .attr('fill', d => {
            if (d == 'Action') {
                return 'green'
            }
            else if (d == 'Adventure') {
                return 'yellow'
            }
            else if (d == 'Comedy') {
                return 'blue'
            }
            else if (d == 'Drama') {
                return 'orange'
            }
            else if (d == 'Animation') {
                return 'gray'
            }
            else if (d == 'Family') {
                return 'red'
            }
            else {
                return 'pink'
            }
        })
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .attr('x', (d, i) => i * legendWidth)



    legend.selectAll('text')
        .data(legendArr)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', (d, i) => (i * legendWidth) + 10)
        .attr('y', legendHeight + 20)


}








// fecting data from api 
fetch(movieSalesAPI)
    .then(res => res.json())
    .then(data => {
        movieSalesData = data
        // console.log(data)
        drawTreeMap();
        creatingLegend()
    })