const Vertex = require('./models/dijkstra/vertices')
const Edge = require('./models/dijkstra/edges')
const Graph = require('./public/dijkstra')
const vertices = require('./models/dijkstra/vertices')
const graph = new Graph()



module.exports.calculateRoute = async function (start, end) {
    const corners = await Vertex.find({})
    const edges = await Edge.find({})
    for (let corner of corners) {
        graph.addVertex(corner.location)
    }


    for (let edge of edges) {
        graph.addEdge(edge.startingPoint, edge.destination, edge.weight)
    }
    return graph.getPath(start, end)
}

