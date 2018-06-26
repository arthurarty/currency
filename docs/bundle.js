!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";!function(){function t(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function n(e,n,r){var o,i=new Promise(function(i,u){t(o=e[n].apply(e,r)).then(i,u)});return i.request=o,i}function r(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function o(e,t,r,o){o.forEach(function(o){o in r.prototype&&(e.prototype[o]=function(){return n(this[t],o,arguments)})})}function i(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})})}function u(e,t,r,o){o.forEach(function(o){o in r.prototype&&(e.prototype[o]=function(){return function(e,t,r){var o=n(e,t,r);return o.then(function(e){if(e)return new s(e,o.request)})}(this[t],o,arguments)})})}function c(e){this._index=e}function s(e,t){this._cursor=e,this._request=t}function a(e){this._store=e}function f(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function p(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new f(n)}function l(e){this._db=e}r(c,"_index",["name","keyPath","multiEntry","unique"]),o(c,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),u(c,"_index",IDBIndex,["openCursor","openKeyCursor"]),r(s,"_cursor",["direction","key","primaryKey","value"]),o(s,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(e){e in IDBCursor.prototype&&(s.prototype[e]=function(){var n=this,r=arguments;return Promise.resolve().then(function(){return n._cursor[e].apply(n._cursor,r),t(n._request).then(function(e){if(e)return new s(e,n._request)})})})}),a.prototype.createIndex=function(){return new c(this._store.createIndex.apply(this._store,arguments))},a.prototype.index=function(){return new c(this._store.index.apply(this._store,arguments))},r(a,"_store",["name","keyPath","indexNames","autoIncrement"]),o(a,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),u(a,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),i(a,"_store",IDBObjectStore,["deleteIndex"]),f.prototype.objectStore=function(){return new a(this._tx.objectStore.apply(this._tx,arguments))},r(f,"_tx",["objectStoreNames","mode"]),i(f,"_tx",IDBTransaction,["abort"]),p.prototype.createObjectStore=function(){return new a(this._db.createObjectStore.apply(this._db,arguments))},r(p,"_db",["name","version","objectStoreNames"]),i(p,"_db",IDBDatabase,["deleteObjectStore","close"]),l.prototype.transaction=function(){return new f(this._db.transaction.apply(this._db,arguments))},r(l,"_db",["name","version","objectStoreNames"]),i(l,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[a,c].forEach(function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t=function(e){return Array.prototype.slice.call(e)}(arguments),n=t[t.length-1],r=this._store||this._index,o=r[e].apply(r,t.slice(0,-1));o.onsuccess=function(){n(o.result)}})})}),[c,a].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise(function(o){n.iterateCursor(e,function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():o(r)):o(r)})})})});var d={open:function(e,t,r){var o=n(indexedDB,"open",[e,t]),i=o.request;return i&&(i.onupgradeneeded=function(e){r&&r(new p(i.result,e.oldVersion,i.transaction))}),o.then(function(e){return new l(e)})},delete:function(e){return n(indexedDB,"deleteDatabase",[e])}};e.exports=d,e.exports.default=e.exports}()},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").then(function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)},function(e){console.log("ServiceWorker registration failed: ",e)})});var o=r.default.open("currencyConvert",1,function(e){e.createObjectStore("currencies",{keyPath:"id"})});fetch("https://free.currencyconverterapi.com/api/v5/currencies?").then(function(e){200===e.status?e.json().then(function(e){o.then(function(t){var n=t.transaction("currencies","readwrite").objectStore("currencies");for(var r in e.results)n.put(e.results[r])})}):console.log("Looks like there was a problem. Status Code: "+e.status)}).catch(function(e){console.log("Fetch Error :-S",e)}),o.then(function(e){var t=e.transaction("currencies").objectStore("currencies");t.getAllKeys();return t.getAllKeys()}).then(function(e){console.log(e);var t="output";for(var n in e)t+="<option>"+e[n]+"</option>";document.getElementById("fromCurrency").innerHTML=t,document.getElementById("toCurrency").innerHTML=t})}]);