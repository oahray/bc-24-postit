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
$.prototype.click = callback => callback();
$.prototype.width = () => 500;

$.prototype.prop = (string) => {
  switch (string) {
    case 'clientHeight':
      return 400;
    case 'scrollTop':
      return 200;
    case 'scrollHeight':
      return 400;
    default:
      return null;
  }
};

$.deparam = () => ({
  u: 'er',
  p: 1,
  t: ''
});

window.resizeTo = (width) => {
  global.window.innerWidth = width || global.window.innerWidth;
  global.window.dispatchEvent(new Event('resize'));
};


window.setInterval = fn => fn();
window.setTimeout = fn => fn();
global.io = () => new Client(mockServer);
