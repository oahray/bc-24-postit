import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import * as mockSocket from 'mock-socket';

export const middlewares = [thunk];
export const mockStore = configureMockStore(middlewares);

// This sets the mock adapter on the default instance
export const mock = new MockAdapter(axios);

// Define a mock socket server
export const mockServer = new mockSocket.Server('ws://localhost:8000');
mockServer.on('connection', () => {
  mockServer.emit('Added to group', { user: {} });
  mockServer.emit('Removed from group', { user: {} });
});
