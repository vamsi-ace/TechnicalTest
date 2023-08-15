const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config({path:'./config.env'});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors( {origin: '*'}));
app.use(express.json()); // Use built-in express.json() middleware

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then( () =>{
  console.log('Connected to MongoDB');
});

const resultSchema = new mongoose.Schema({
  input: String,
  output: String,
});
const Result = mongoose.model('Result', resultSchema);

app.get('/', ( req, res ) =>{
    console.log('hello');
    res.status(201).json({
        status:'success',
        message:'ues',
        data:{
            obj:{ a:1 }
        }
    })
});

app.post('/saveResult', async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json({ 
        status: 'success',
        message: 'Result saved successfully',
        data:{
            result
        }
    });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ error: 'An error occurred while saving the result' });
  }
});


app.get('/getAllResults', async (req, res) => {
    try {
      const allResults = await Result.find();
      res.json(allResults);
    } catch (error) {
      console.error('Error fetching results:', error);
      res.status(500).json({ error: 'An error occurred while fetching results' });
    }
  });  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

