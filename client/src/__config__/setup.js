import $ from 'jquery';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Client } from 'mock-socket.io';
import { mockServer } from '../__mocks__/mockConfig';

configure({ adapter: new Adapter() });

window.$ = $;
$.prototype.sideNav = () => { };
$.prototype.material_select = () => { };
$.prototype.modal = () => { };
$.prototype.tooltip = () => { };
$.prototype.collapsible = () => { };
$.prototype.materialbox = () => { };
$.prototype.carousel = () => { };
// $.prototype.on = (event, callback) => callback();
$.prototype.width = () => 500;
$.deparam = () => ({
  u: 'er',
  p: 1,
  t: ''
});

window.setInterval = fn => fn();
window.setTimeout = fn => fn();
global.io = () => new Client(mockServer);
