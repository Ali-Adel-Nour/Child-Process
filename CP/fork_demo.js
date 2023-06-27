const express = require('express');
const {fork} = require('child_process')
const app = express();
const PORT = process.env.PORT || 3000; // Corrected the assignment

app.get('/one', (req, res) => {
  const sum = calculateLongComputation();
  res.send({ sum: sum });
});

app.get('/two', async (req, res) => {
  const sum = await calculateLongComputationPromise();
  res.send({ sum: sum });
});

app.get('/three', (req, res) => {
  // Handle route /three
  const child = fork('./longtask.js')
  child.send('start')
  child.on('message',(sum)=>{
    res.send({ sum: sum });
  })
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

function calculateLongComputation() {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }
  return sum;
}

function calculateLongComputationPromise() {
  return new Promise((resolve, reject) => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
      sum += i;
    }
    resolve(sum);
  });
}
