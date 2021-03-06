const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const fileUpload = require('express-fileupload');


const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())
app.use(fileUpload())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0i8x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const blogsCollection = client.db("end-game").collection("blogs");



        // app.post('/rider', async (req, res) => {
        //     // console.log(req.body)
        //     console.log(req.files)
        //     const name = req.body.name;
        //     const email = req.body.email;
        //     const age = req.body.age;
        //     const address = req.body.address;
        //     const phone = req.body.phone;
        //     const area = req.body.area;
        //     const carName = req.body.carName;
        //     const model = req.body.model;
        //     const plate = req.body.plate;
        //     const pass1 = req.body.pass1;
        //     const pass2 = req.body.pass2;
        //     const type = req.body.type;
        //     const role = req.body.role;

        //     const licence = req.files.licence;
        //     const nid = req.files.nid;
        //     const profile = req.files.profile;

        //     const licenceData = licence.data;
        //     const nidData = nid.data;
        //     const profileData = profile.data;

        //     const encodeLicence = licenceData.toString('base64');
        //     const encodeNid = nidData.toString('base64');
        //     const encodeProfile = profileData.toString('base64');

        //     const licenceBuffer = Buffer.from(encodeLicence, 'base64');
        //     const nidBuffer = Buffer.from(encodeNid, 'base64');
        //     const profileBuffer = Buffer.from(encodeProfile, 'base64');
        //     const rider = {
        //         name,
        //         email,
        //         age,
        //         address,
        //         phone, area,
        //         carName,
        //         model,
        //         plate,
        //         pass1,
        //         pass2,
        //         type,
        //         role,
        //         licence: licenceBuffer,
        //         nid: nidBuffer,
        //         profile: profileBuffer
        //     }
        //     const result = await ridersCollection.insertOne(rider);
        //     res.json(result)
        // })


        // learner 
        app.post('/addBlog', async (req, res) => {
            // console.log(req.body)
            console.log(req.files)
            const title = req.body.title;
            const address = req.body.address;
            const cost = req.body.cost;
            const category = req.body.category;
            const traveler = req.body.traveler;
            const description = req.body.description;

            const img = req.files.img;
            const imgData = img.data;
            const encodeImg = imgData.toString('base64');
            const imgBuffer = Buffer.from(encodeImg, 'base64');
            const blog = {
                title,
                address,
                cost,
                category,
                traveler,
                description,

                img: imgBuffer
            }
            const result = await blogsCollection.insertOne(blog);
            res.json(result)
            console.log(blog)
        })
        // app.get('/users', async (req, res) => {
        //     const cursor = ridersCollection.find({});
        //     const result = await cursor.toArray();
        //     res.json(result)
        // })
        // app.get('/profile/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const query = { email: email }
        //     const result = await ridersCollection.findOne(query);
        //     console.log('user', result)
        //     res.json(result)
        // })
        // app.get('/admin/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const query = { email: email }
        //     const cursor = await ridersCollection.findOne(query);
        //     let isAdmin = false;
        //     if (cursor.role === 'admin') {
        //         isAdmin = true
        //     }
        //     console.log(cursor)
        //     res.json({ admin: isAdmin })
        // })
    }
    finally {
        // await client.close();
    }
}








run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('end game!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})