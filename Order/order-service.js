import { KafkaProducer } from 'node-rdkafka'
import axios from 'axios'
// For communication with InventoryService 

const producer = new KafkaProducer({
  'bootstrap.servers': 'localhost:9092' 
});

const inventoryServiceUrl = 'http://inventory-service:8081/inventory'; 
const placeOrder = async(order)=> {
  try {
    const hasInventory = await checkInventory(order.itemId, order.quantity);
    if (!hasInventory) {
      throw new Error('Insufficient inventory for item: ' + order.itemId);
    }

    await reduceInventory(order.itemId, order.quantity); 
    await producer.connect();
    const payload = JSON.stringify(order);
    producer.produce('orders', null, payload, (err) => {
      if (err) {
        console.error('Error sending message:', err);
      } else {
        console.log('Order placed successfully:', order);
      }
    });
    await producer.disconnect();
  } catch (error) {
    console.error('Error placing order:', error.message);
  }
}

const checkInventory = async(itemId, quantity)=> {
  try {
    const response = await axios.get(`${inventoryServiceUrl}/${itemId}/${quantity}`);
    return response.data;
  } catch (error) {
    console.error('Error checking inventory:', error.message);
    return false; 
  }
}

const reduceInventory = async(itemId, quantity)=> {
  try {
    await axios.put(`${inventoryServiceUrl}/${itemId}/${quantity}`);
  } catch (error) {
    console.error('Error reducing inventory:', error.message);
  }
}

placeOrder({ itemId: 'ITEM123', quantity: 2 });

