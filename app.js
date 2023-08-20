const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`https://ruby-careful-skunk.cyclic.app/recents`);
    const topesResponse = await axios.get(`https://ruby-careful-skunk.cyclic.app/top/1`);
    
    if (!response.ok && !topesResponse.ok) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const dai = await response.data;
    const info = dai.mangas;
    
    const topesData = await topesResponse.data;
    
    res.render('index', { data: topesData, info });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred while fetching manga data.');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
});


app.get('/manga/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const foto = req.query.foto;
   // console.log(id);

    const response = await fetch(encodeURI(`https://ruby-careful-skunk.cyclic.app/chapters/${id}`));

    if (!response.ok) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const data = await response.json();
    const info = data;
   // console.log(data);

    const fotos = info.images;
    res.render('manga', { info, foto });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred while fetching manga data.');
await new Promise(resolve => setTimeout(resolve, 1000));
  }
});


app.get('/ler/:id', async (req, res) => {

 try {
    const id = req.params.id;
   // console.log(id);

    const response = await fetch(encodeURI(`https://ruby-careful-skunk.cyclic.app/pages/${id}`));

    if (!response.ok) {
            await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const data = await response.json();
    const info = data;
   // console.log(data);

    const fotos = info.images;
    res.render('ler', { info, fotos });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred while fetching manga data.');
await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});