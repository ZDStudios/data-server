const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Use the port from environment or default to 3000
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/save-data', (req, res) => {
  const data = req.body.data;
  if (!data) {
    return res.status(400).send('No data provided');
  }

  fs.appendFile('data.txt', data + '\n', (err) => {
    if (err) {
      console.error('Error saving data:', err);
      return res.status(500).send('Failed to save data');
    }
    res.send('Data saved successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
