# microservices-communication-docker-kubernetes
## Running and Testing Microservices Communication with Docker

Steps to run and test the OrderService and InventoryService communication with Docker:

**1. Requirements:**

* Docker installed and running on your system.
* A local Kafka instance running (https://kafka.apache.org/quickstart).

**2. Building the Docker Images:**

1. Navigate to the directory containing the source code and Dockerfiles for both services (order-service and inventory-service).
2. Build the Docker images using the following commands:

```bash
docker build -t order-service Order
docker build -t inventory-service Inventory


```


## Might Need to do this to start the instance of kafka
 Using docker image
 Get the docker image
```bash
 $ docker pull apache/kafka:3.7.0
 ```
 Start the kafka docker container
```bash
$ docker run -p 9092:9092 apache/kafka:3.7.0
```

Once the Kafka server has successfully launched, you will have a basic Kafka environment running and ready to use.

**3. Running the Services with Docker Compose:**

1. Create a file named `docker-compose.yml`

2. Open a terminal in the same directory as your `docker-compose.yml` file.
3. Run the following command to start all services (OrderService, InventoryService, and Kafka):

```bash
docker-compose up -d
```

**4. Testing the Communication:**

**Option 1: Manual Testing**

1. Use a tool like `curl` or Postman to send a POST request to the OrderService endpoint:

```bash
curl -X POST http://localhost:8080/orders -H "Content-Type: application/json" -d '{"itemId": "ITEM123", "quantity": 2}'
```

2. If successful, the OrderService should place the order, send a message to the Kafka topic "orders", and the InventoryService should receive the message and reduce the inventory for the item. You should see logs indicating successful order placement and inventory reduction in the respective service containers.

**Option 2: Unit Testing (OrderService)**

1. Assuming you have unit tests written for the `placeOrder` function in `order-service.test.js`, run the tests using a test runner like Jest:

   ```bash
   npm test  
   ```

   The tests should verify the functionality of `placeOrder` including checking inventory and handling errors.

**5. Stopping the Services:**

```bash
docker-compose down
```

This will stop all services .
