import $ from 'jquery';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { SocketIO } from 'mock-socket';

configure({ adapter: new Adapter() });

window.$ = $;
$.prototype.sideNav = () => { };
$.prototype.material_select = () => { };
$.prototype.modal = () => { };
$.prototype.collapsible = () => { };
// $.prototype.on = (event, callback) => callback();
$.prototype.width = () => 500;
$.deparam = () => ({ t: '' });

// global.setTimeout = (callback, mS) => callback();

global.io = SocketIO;
