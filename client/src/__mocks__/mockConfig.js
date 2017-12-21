import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { Server } from 'mock-socket.io';

export const middlewares = [thunk];
export const mockStore = configureMockStore(middlewares);

// This sets the mock adapter on the default instance
export const mock = new MockAdapter(axios);

// Define a mock socket server
export const mockServer = new Server();

