import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';

const app = express()
const port = 2020


app.use(express.json())

app.use(cors())

const menuSchema = new mongoose.Schema({
    name: String,
    title: String,
    price: Number
});

const Menu = mongoose.model('Menu', menuSchema);

app.get('/', async (req, res) => {
    try {
        const menus = await Menu.find({})
        res.send(menus)
    } catch (error) {
        res.send(error.message)
    }
})


app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const menu = await Menu.findById(id)
        res.send(menu)
    } catch (error) {
        res.send(error.message)
    }
})

app.post('/', async (req, res) => {
    try {
        const { name, title, price } = req.body
        const newMenu = new Menu({ name, title, price })
        await newMenu.save()
        res.send(newMenu)
    } catch (error) {
        res.send(error.message)
    }
})

app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const menu = await Menu.findByIdAndDelete(id)
        res.send(menu)
    } catch (error) {
        res.send(error.message)
    }
})

mongoose.connect('mongodb+srv://arzu:arzu@cluster0.9p2kmwb.mongodb.net/')
    .then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})