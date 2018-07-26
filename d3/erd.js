let width = 1000,
  barHeight = 20,
  barWidth = 300;

let svg = d3.select('body').append('svg')
  .attr("width", width) 
  .append('g')
  .attr("class", "erd")
  .attr("height", 600)

let objects = [{
  name: 'User',
  fields: [{
    label: 'name'
  }, {
    label: 'age'
  }, {
    label: 'address'
  }, {
    label: 'phone'
  }, {
    label: 'email'
  }]
}, {
  name: 'Course',
  fields: [{
    label: 'name'
  }, {
    label: 'grade'
  }]
}]

let translateY = 0
let translateX = 0
objects.forEach(obj => {
  console.log('obj::', obj.name)
  let objectItem = d3.select(".erd").append("g")
    .attr("class", "object-item")
    .attr("transform", `translate(${translateX},0)`)
  
  translateX += 400
  translateY = 0
  genreateObjTitle(objectItem, obj)

  let fieldNode = objectItem.selectAll('.object-field')
  .data(obj.fields)

  generateFieldRect(fieldNode)
})

function genreateObjTitle(objectItem, obj) {
  let nodeEnter3 = objectItem.append("g")
    .attr("class", "object-title")      
    .attr("transform", `translate(0,0)`)

  nodeEnter3.append("rect")
    .attr("height", barHeight)
    .attr("width", barWidth)
    .attr('fill', '#fff')
    .attr('stroke', '#333')

  nodeEnter3.append("text")
    .attr("dy", 16)
    .attr("dx", 5.5)
    .text(obj.name)
    .attr('font-weight', '700')
}

function generateFieldRect(fieldNode, field) {
  let nodeEnter = fieldNode.enter().append('g')
  .attr("class", "object-field")      
  .attr("transform", function(d) { 
    translateY += 20
    return `translate(0,${translateY})`; 
  })

  nodeEnter.append("rect")
    .attr("height", barHeight)
    .attr("width", barWidth)
    .attr('fill', '#fff')
    .attr('stroke', '#333')

  nodeEnter.append("text")
    .attr("dy", 16)
    .attr("dx", 5.5)
    .text(function(d) { return d.label; })
}