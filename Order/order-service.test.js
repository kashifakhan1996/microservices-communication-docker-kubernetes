import { expect } from 'chai';
import { stub, restore } from 'sinon'; 

import { placeOrder } from './order-service';

describe('OrderService', () => {
  let mockInventoryService;

  beforeEach(() => {
    mockInventoryService = stub(axios, 'get');
  });

  afterEach(() => {
    restore();
  });

  it('places an order successfully', async () => {
    mockInventoryService.resolves({ data: true }); // Simulate successful inventory check
    await placeOrder({ itemId: 'ITEM123', quantity: 2 });
    expect(console.log.args[0][0]).to.include('Order placed successfully');
  });

  it('throws error for insufficient inventory', async () => {
    mockInventoryService.resolves({ data: false }); // Simulate insufficient inventory
    try {
      await placeOrder({ itemId: 'ITEM123', quantity: 2 });
      fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal('Insufficient inventory for item: ITEM123');
    }
  });
});
