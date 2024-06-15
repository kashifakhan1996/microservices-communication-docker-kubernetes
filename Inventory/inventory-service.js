import express from 'express';
const app = express();
const port = 8081;

const inventory = {"ITEM123": 10,"ITEM456": 8,"ITEM789": 6} 

app.get('/inventory/:itemId/:quantity', (req, res) => {
  const itemId = req.params.itemId;
  const quantity = parseInt(req.params.quantity);

  if (!inventory[itemId] || inventory[itemId] < quantity) {
    return res.status(400).send('Insufficient inventory');
  }

  return res.json(true);
});

app.put('/inventory/:itemId/:quantity', (req, res) => {
  const itemId = req.params.itemId;
  const quantity = parseInt(req.params.quantity);

  if (!inventory[itemId] || inventory[itemId] < quantity) {
    return res.status(400).send('Insufficient inventory');
  }

  inventory[itemId] -= quantity;
  console.log(`Inventory reduced for item: ${itemId}, remaining: ${inventory[itemId]}`);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Inventory Service listening on port ${port}`));


