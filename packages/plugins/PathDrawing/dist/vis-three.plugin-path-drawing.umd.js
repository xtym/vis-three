(function(e,t){typeof exports=="object"&&typeof module!="undefined"?t(exports,require("@vis-three/utils"),require("@vis-three/plugin-pointer-manager"),require("@vis-three/core"),require("three")):typeof define=="function"&&define.amd?define(["exports","@vis-three/utils","@vis-three/plugin-pointer-manager","@vis-three/core","three"],t):(e=typeof globalThis!="undefined"?globalThis:e||self,t((e["vis-three"]=e["vis-three"]||{},e["vis-three"]["plugin-path-drawing"]={}),e.utils,e.pluginPointerManager,e.core,e.three))})(this,function(e,t,i,o,a){"use strict";var P=Object.defineProperty;var g=(e,t,i)=>t in e?P(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var h=(e,t,i)=>(g(e,typeof t!="symbol"?t+"":t,i),i);const d="@vis-three/plugin-path-drawing";class p extends o.EventDispatcher{constructor(){super();h(this,"camera",new a.OrthographicCamera(-window.innerWidth,window.innerWidth,window.innerHeight,-window.innerHeight,0,1e4));h(this,"plane",new a.Plane(new a.Vector3(0,1,0),0))}setDrawPlane(s,w=0){return this.plane.set(s,w),this}}const u=t.transPkgName(d),c=function(){return{name:u,deps:[i.POINTER_MANAGER_PLUGIN],install(n){const r=new p;n.pathDrawing=r,n.drawPath=function(){return this.setCamera(r.camera),this},n.getPathPoint=function(s){return this.pointerManager.intersectPlane(r.camera,r.plane,s||new a.Vector3)}},dispose(n){delete n.pathDrawing,delete n.drawPath,delete n.getPathPoint}}};e.PATH_DRAWING_PLUGIN=u,e.PathDrawingPlugin=c,Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
