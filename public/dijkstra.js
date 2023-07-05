//Class representing a graph

class Graph {
    constructor() {
        this.vertices = {}
    }

    addVertex(vertex) {
        this.vertices[vertex] = {};
    }

    addEdge(source, destination, weight) {
        this.vertices[source][destination] = weight;
        this.vertices[destination][source] = weight;
    }

    dijkstra(startVertex) {
        const distances = {};
        const visited = {};
        const previous = {};
        const queue = new PriorityQueue();

        // Initialize distances and previous vertices
        for (let vertex in this.vertices) {
            if (vertex === startVertex) {
                distances[vertex] = 0;
                queue.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
            }
            previous[vertex] = null;
        }

        //Main algorithm
        while (!queue.isEmpty()) {
            const currentVertex = queue.dequeue().element;
            visited[currentVertex] = true;

            for (let neighbor in this.vertices[currentVertex]) {
                const weight = this.vertices[currentVertex][neighbor];
                const totalDistance = distances[currentVertex] + weight;

                if (totalDistance < distances[neighbor]) {
                    distances[neighbor] = totalDistance;
                    previous[neighbor] = currentVertex;
                }


                if (!visited[neighbor]) {
                    queue.enqueue(neighbor, distances[neighbor]);
                }
            }
        }
        return { distances, previous };
    }

    getPath(startVertex, endVertex) {
        const { distances, previous } = this.dijkstra(startVertex);

        const path = []
        let currentVertex = endVertex;

        while (currentVertex != null) {
            path.unshift(currentVertex);
            currentVertex = previous[currentVertex];
        }

        return path;
    }
}


// Priority queue implementaion
class PriorityQueue {
    constructor() {
        this.items = []
    }
    enqueue(element, priority) {
        const queueElement = { element, priority };
        let added = false;

        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }

        if (!added) {
            this.items.push(queueElement);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}


module.exports = Graph

// Example usage

/*
const graph = new Graph();

graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')
graph.addVertex('E')
graph.addVertex('F')


graph.addEdge('A', 'B', 4)
graph.addEdge('A', 'C', 2)
graph.addEdge('B', 'E', 3)
graph.addEdge('C', 'D', 2)
graph.addEdge('C', 'F', 4)
graph.addEdge('D', 'E', 3)
graph.addEdge('D', 'F', 1)
graph.addEdge('E', 'F', 1)

const startVertex = 'A'
const endVertex = 'E'

const path = graph.getPath(startVertex, endVertex);
console.log(`Shortest path from ${startVertex} to ${endVertex}: ${path}`)
*/