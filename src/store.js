
/* store.js - Copyright (c) 2010-2017 Marcus Westin - v2.0.12 */
let engine = require('store/src/store-engine');
let storages = [
    require('store/storages/localStorage'),
    require('store/storages/sessionStorage'),
];

let plugins = [
    require('store/plugins/observe'),
];

let store = engine.createStore(storages, plugins);

if ( typeof window.store === 'undefined' ) {
    window.store = store;
}
