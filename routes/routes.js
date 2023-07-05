const express = require('express')
const router = express.Router()
const Route = require('../models/routes')
const routes = require('../models/routes')
const Vertex = require('../models/dijkstra/vertices')
const Edge = require('../models/dijkstra/edges')
const { isLoggedIn } = require('../authMiddleware')
const Graph = require('../public/dijkstra')
const vertices = require('../models/dijkstra/vertices')
const graph = new Graph()
const { calculateRoute } = require('../helper')

async function addVertex(vertex) {
    try {
        const vertices = await Vertex.find()
        vertices.forEach(corner => {
            if (corner.location === vertex) {
                return console.log(`${vertex} vertex exists`)
            }
        });
        const insertedVertex = new Vertex({ location: vertex })
        await insertedVertex.save()
    } catch (err) {
        return console.log(err)
    }

}

async function addEdge(startingPoint, destination, weight) {
    const insertedEdge = new Edge({ startingPoint, destination, weight })
    await insertedEdge.save()
}

router.get('/', (req, res) => {
    Route.find({})
        .then((routes) => {
            res.render('routees/show', { routes })
        })
        .catch(err => {
            res.send(err)
        })
})



router.post('/', isLoggedIn, async (req, res) => {
    const { startingPoint, distance, destination, fare } = req.body
    const estimated_travelTime = Math.ceil(distance / 70)
    const route = new Route({ startingPoint, distance, destination, fare, estimated_travelTime })
    await route.save()
    await addVertex(startingPoint)
    await addVertex(destination)

    await addEdge(startingPoint, destination, distance);

    res.redirect('/routes')
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('routees/new')
})


router.get('/calculateroute', async (req, res) => {
    res.render('routees/calculateRoute')
})

router.post('/calculateroute', async (req, res) => {
    const { start, end } = req.body

    const path = await calculateRoute(start, end)
    res.render('routees/showCalculatedRoute', { start, end, path })
})

router.get('/:id/edit', async (req, res) => {
    const { id } = req.params

    const route = await Route.findById(id)

    res.render('routees/edit', { route })


})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    const route = await Route.findByIdAndUpdate(id, req.body)

    res.redirect('/routes')


})


router.delete('/:id', async (req, res) => {
    const { id } = req.params

    await Route.findByIdAndDelete(id)

    res.redirect('/routes')

})




module.exports = router;