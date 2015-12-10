/// <reference path='../../typings/tsd.d.ts'/>

import mainViewSteam from './components/main';
import render from './renderer';

render(mainViewSteam(), document.getElementById('app'));
