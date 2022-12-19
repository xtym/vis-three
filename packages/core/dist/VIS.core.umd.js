(function(u,t){typeof exports=="object"&&typeof module!="undefined"?t(exports,require("three"),require("three/examples/jsm/lights/RectAreaLightUniformsLib.js"),require("three/src/lights/LightShadow"),require("three/examples/jsm/renderers/CSS2DRenderer"),require("three/examples/jsm/renderers/CSS3DRenderer"),require("three/examples/jsm/postprocessing/Pass"),require("three/examples/jsm/shaders/LuminosityHighPassShader")):typeof define=="function"&&define.amd?define(["exports","three","three/examples/jsm/lights/RectAreaLightUniformsLib.js","three/src/lights/LightShadow","three/examples/jsm/renderers/CSS2DRenderer","three/examples/jsm/renderers/CSS3DRenderer","three/examples/jsm/postprocessing/Pass","three/examples/jsm/shaders/LuminosityHighPassShader"],t):(u=typeof globalThis!="undefined"?globalThis:u||self,t((u.VIS=u.VIS||{},u.VIS.core={}),u.three,u.RectAreaLightUniformsLib_js,u.LightShadow,u.CSS2DRenderer,u.CSS3DRenderer,u.Pass,u.LuminosityHighPassShader))})(this,function(u,t,D,ge,ye,X,Z,$){"use strict";var st=Object.defineProperty;var ot=(u,t,D)=>t in u?st(u,t,{enumerable:!0,configurable:!0,writable:!0,value:D}):u[t]=D;var o=(u,t,D)=>(ot(u,typeof t!="symbol"?t+"":t,D),D);const be="0.4.0";window.__THREE__||console.error("vis-three dependent on three.js module, pleace run 'npm i three' first."),window.__VIS__?console.warn("Duplicate vis-three frames are introduced"):window.__VIS__=be;const _=new ge.LightShadow(new t.OrthographicCamera(-256,256,256,-256));_.autoUpdate=!1,_.needsUpdate=!1,t.AmbientLight.prototype.shadow=_,t.RectAreaLight.prototype.shadow=_,t.HemisphereLight.prototype.shadow=_,D.RectAreaLightUniformsLib.init();class F{constructor(){o(this,"listeners",new Map)}addEventListener(n,e){const r=this.listeners;r.has(n)||r.set(n,new Set),r.get(n).add(e)}hasEventListener(n,e){const r=this.listeners;return r.has(n)?r.get(n).has(e):!1}removeEventListener(n,e){const r=this.listeners;!r.has(n)||!r.get(n).has(e)||r.get(n).delete(e)}dispatchEvent(n){var s;const e=n.type,r=this.listeners;if(r.has(e))try{(s=r.get(e))==null||s.forEach(a=>{a.call(this,n)})}catch(a){console.error(a)}}clear(){this.listeners.clear()}useful(){return Boolean([...this.listeners.keys()].length)}once(n,e){const r=function(s){e.call(this,s),this.removeEventListener(n,r)};this.addEventListener(n,r)}emit(n,e={}){var s;const r=this.listeners;if(r.has(n))try{(s=r.get(n))==null||s.forEach(a=>{a.call(this,e)})}catch(a){console.error(a)}}on(n,e){this.addEventListener(n,e)}has(n,e){return this.hasEventListener(n,e)}off(n,e){if(e)this.removeEventListener(n,e);else{const r=this.listeners;if(!r.has(n))return;r.delete(n)}}}var K=(p=>(p.SETDOM="setDom",p.SETSIZE="setSize",p.SETCAMERA="setCamera",p.SETSCENE="setScene",p.DISPOSE="dispose",p))(K||{});class ve extends F{constructor(){super();o(this,"pluginTables",new Map);o(this,"strategyTables",new Map);o(this,"dom",document.createElement("div"));o(this,"camera",new t.PerspectiveCamera);o(this,"scene",new t.Scene);o(this,"render");this.render=function(){console.warn("can not install some plugin")}}install(e){if(this.pluginTables.has(e.name))return console.warn("This plugin already exists",e.name),this;const r=s=>this.pluginTables.has(s)?!0:(console.error(`${e.name} must install this plugin before: ${s}`),!1);if(e.deps)if(Array.isArray(e.deps))for(const s of e.deps)r(s);else r(e.deps);return e.install(this),this.pluginTables.set(e.name,e),this}unistall(e){return this.pluginTables.has(e)?(this.pluginTables.get(e).dispose(this),this.pluginTables.delete(e),this):this}exec(e){const r=this.strategyTables;if(r.has(e.name))return console.warn("This strategy already exists",e.name),this;const s=this.pluginTables;for(const a of e.condition)if(!s.has(a))return console.warn(`${e.name} does not meet the conditions for execution: ${a}`),this;return e.exec(this),r.set(e.name,e),this}rollback(e){const r=this.strategyTables;return r.has(e)?(r.get(e).rollback(this),r.delete(e),this):this}setDom(e){return this.dom=e,this.dispatchEvent({type:"setDom",dom:e}),this}setSize(e,r){var s,a;return e&&e<=0||r&&r<=0?(console.warn(`you must be input width and height bigger then zero, width: ${e}, height: ${r}`),this):(!e&&(e=((s=this.dom)==null?void 0:s.offsetWidth)||window.innerWidth),!r&&(r=((a=this.dom)==null?void 0:a.offsetHeight)||window.innerHeight),this.dispatchEvent({type:"setSize",width:e,height:r}),this)}setCamera(e,r){return this.dispatchEvent({type:"setCamera",camera:e,oldCamera:this.camera,options:Object.assign({orbitControls:!0,transformControls:!0},r||{})}),this.camera=e,this}setScene(e){return this.dispatchEvent({type:"setScene",scene:e,oldScene:this.scene}),this.scene=e,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}}const xe=function(p){return()=>p};class Se extends t.Texture{constructor(e,r,s,a,h,l,d,y,g){super(e,r,s,a,h,l,d,y,g);o(this,"isVideoTexture",!0);this.format=d!==void 0?d:t.RGBFormat,this.minFilter=l!==void 0?l:t.LinearFilter,this.magFilter=h!==void 0?h:t.LinearFilter,this.generateMipmaps=!1}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image,r="requestVideoFrameCallback"in e;r?this.needsUpdate=!0:r===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class q extends ye.CSS2DObject{constructor(e=document.createElement("div")){const r=document.createElement("div"),s=50,a=50;r.style.width=`${s}px`,r.style.height=`${a}px`,r.appendChild(e);super(r);o(this,"geometry");o(this,"_width");o(this,"_height");this.geometry=new t.PlaneBufferGeometry(s,a),this.geometry.computeBoundingBox(),this._width=s,this._height=a}get width(){return this._width}set width(e){this.geometry.dispose(),this.geometry=new t.PlaneBufferGeometry(e,this._height),this.geometry.computeBoundingBox(),this.element.style.width=`${e}px`,this._width=e}get height(){return this._height}set height(e){this.geometry.dispose(),this.geometry=new t.PlaneBufferGeometry(this._width,e),this.geometry.computeBoundingBox(),this.element.style.height=`${e}px`,this._height=e}}class J extends X.CSS3DObject{constructor(e=document.createElement("div")){const r=document.createElement("div"),s=50,a=50;r.style.width=`${s}px`,r.style.height=`${a}px`,r.appendChild(e);super(r);o(this,"geometry");o(this,"_width");o(this,"_height");this.geometry=new t.PlaneBufferGeometry(s,a),this.geometry.computeBoundingBox(),this._width=s,this._height=a}get width(){return this._width}set width(e){this.geometry.dispose(),this.geometry=new t.PlaneBufferGeometry(e,this._height),this.geometry.computeBoundingBox(),this.element.style.width=`${e}px`,this._width=e}get height(){return this._height}set height(e){this.geometry.dispose(),this.geometry=new t.PlaneBufferGeometry(this._width,e),this.geometry.computeBoundingBox(),this.element.style.height=`${e}px`,this._height=e}}class ee extends X.CSS3DSprite{constructor(e=document.createElement("div")){const r=document.createElement("div"),s=50,a=50;r.style.width=`${s}px`,r.style.height=`${a}px`,r.appendChild(e),e.classList.add("vis-css3d","vis-css3d-sprite");super(r);o(this,"geometry");o(this,"_width");o(this,"_height");o(this,"cacheBox",new t.Box3);o(this,"cachePosition",new t.Vector3);o(this,"cacheQuaternion",new t.Quaternion);o(this,"cacheScale",new t.Vector3);o(this,"cacheMatrix4",new t.Matrix4);o(this,"rotateMatrix4",new t.Matrix4);this.geometry=new t.PlaneBufferGeometry(s,a),this.geometry.computeBoundingBox(),this._width=s,this._height=a,this.type="CSS3DSprite"}get width(){return this._width}set width(e){this.geometry.dispose(),this.geometry=new t.PlaneBufferGeometry(e,this._height),this.geometry.computeBoundingBox(),this.element.style.width=`${e}px`,this._width=e}get height(){return this._height}set height(e){this.geometry.dispose(),this.geometry=new t.PlaneBufferGeometry(this._width,e),this.geometry.computeBoundingBox(),this.element.style.height=`${e}px`,this._height=e}raycast(e,r){const s=this.cacheBox.copy(this.geometry.boundingBox);this.matrixWorld.decompose(this.cachePosition,this.cacheQuaternion,this.cacheScale);const a=this.rotateMatrix4.lookAt(this.position,e.camera.position,this.up);this.cacheQuaternion.setFromRotationMatrix(a),this.cacheMatrix4.compose(this.cachePosition,this.cacheQuaternion,this.cacheScale),s.applyMatrix4(this.cacheMatrix4),e.ray.intersectsBox(s)&&r.push({distance:e.ray.origin.distanceTo(this.position),object:this,point:this.position})}}class Te extends F{constructor(e,r){super();o(this,"object");o(this,"domElement");o(this,"enabled",!0);o(this,"target",new t.Vector3);o(this,"minDistance",0);o(this,"maxDistance",1/0);o(this,"minZoom",0);o(this,"maxZoom",1/0);o(this,"minPolarAngle",0);o(this,"maxPolarAngle",Math.PI);o(this,"minAzimuthAngle",-1/0);o(this,"maxAzimuthAngle",1/0);o(this,"enableDamping",!1);o(this,"dampingFactor",.05);o(this,"enableZoom",!0);o(this,"zoomSpeed",1);o(this,"enableRotate",!0);o(this,"rotateSpeed",1);o(this,"enablePan",!0);o(this,"panSpeed",1);o(this,"screenSpacePanning",!0);o(this,"keyPanSpeed",7);o(this,"autoRotate",!1);o(this,"autoRotateSpeed",2);o(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"});o(this,"mouseButtons",{LEFT:null,MIDDLE:t.MOUSE.DOLLY,RIGHT:t.MOUSE.ROTATE});o(this,"touches",{ONE:t.TOUCH.ROTATE,TWO:t.TOUCH.DOLLY_PAN});o(this,"target0");o(this,"position0");o(this,"zoom0");o(this,"_domElementKeyEvents",null);o(this,"spherical");o(this,"reset");o(this,"update");o(this,"onContextMenu");o(this,"onPointerDown");o(this,"onPointerCancel");o(this,"onMouseWheel");o(this,"onPointerMove");o(this,"onPointerUp");o(this,"onKeyDown");this.object=e||new t.PerspectiveCamera,this.domElement=r||document.createElement("div"),this.domElement.style.touchAction="none",this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.update=(()=>{const i=new t.Vector3,c=new t.Quaternion().setFromUnitVectors(this.object.up,new t.Vector3(0,1,0)),b=c.clone().invert(),x=new t.Vector3,E=new t.Quaternion,L=2*Math.PI;return()=>{const fe=this.object.position;i.copy(fe).sub(this.target),i.applyQuaternion(c),l.setFromVector3(i),this.autoRotate&&a===s.NONE&&N(ze()),this.enableDamping?(l.theta+=d.theta*this.dampingFactor,l.phi+=d.phi*this.dampingFactor):(l.theta+=d.theta,l.phi+=d.phi);let P=this.minAzimuthAngle,C=this.maxAzimuthAngle;return isFinite(P)&&isFinite(C)&&(P<-Math.PI?P+=L:P>Math.PI&&(P-=L),C<-Math.PI?C+=L:C>Math.PI&&(C-=L),P<=C?l.theta=Math.max(P,Math.min(C,l.theta)):l.theta=l.theta>(P+C)/2?Math.max(P,l.theta):Math.min(C,l.theta)),l.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,l.phi)),l.makeSafe(),l.radius*=y,l.radius=Math.max(this.minDistance,Math.min(this.maxDistance,l.radius)),this.enableDamping===!0?this.target.addScaledVector(g,this.dampingFactor):this.target.add(g),i.setFromSpherical(l),i.applyQuaternion(b),fe.copy(this.target).add(i),this.object.lookAt(this.target),this.enableDamping===!0?(d.theta*=1-this.dampingFactor,d.phi*=1-this.dampingFactor,g.multiplyScalar(1-this.dampingFactor)):(d.set(0,0,0),g.set(0,0,0)),y=1,m||x.distanceToSquared(this.object.position)>h||8*(1-E.dot(this.object.quaternion))>h?(this.dispatchEvent({type:"change"}),x.copy(this.object.position),E.copy(this.object.quaternion),m=!1,!0):!1}})();const s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=s.NONE;const h=1e-6,l=new t.Spherical,d=new t.Spherical;let y=1;const g=new t.Vector3;let m=!1;const w=new t.Vector2,M=new t.Vector2,v=new t.Vector2,S=new t.Vector2,T=new t.Vector2,R=new t.Vector2,V=new t.Vector2,A=new t.Vector2,z=new t.Vector2,f=[],H={},ze=()=>2*Math.PI/60/60*this.autoRotateSpeed,I=()=>Math.pow(.95,this.zoomSpeed),N=i=>{d.theta-=i},te=i=>{d.phi-=i},ie=function(){const i=new t.Vector3;return function(b,x){i.setFromMatrixColumn(x,0),i.multiplyScalar(-b),g.add(i)}}(),se=(()=>{const i=new t.Vector3;return(c,b)=>{this.screenSpacePanning===!0?i.setFromMatrixColumn(b,1):(i.setFromMatrixColumn(b,0),i.crossVectors(this.object.up,i)),i.multiplyScalar(c),g.add(i)}})(),U=(()=>{const i=new t.Vector3;return(c,b)=>{const x=this.domElement;if(this.object instanceof t.PerspectiveCamera){const E=this.object.position;i.copy(E).sub(this.target);let L=i.length();L*=Math.tan(this.object.fov/2*Math.PI/180),ie(2*c*L/x.clientHeight,this.object.matrix),se(2*b*L/x.clientHeight,this.object.matrix)}else this.object instanceof t.OrthographicCamera?(ie(c*(this.object.right-this.object.left)/this.object.zoom/x.clientWidth,this.object.matrix),se(b*(this.object.top-this.object.bottom)/this.object.zoom/x.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}})(),Y=i=>{this.object instanceof t.PerspectiveCamera?y/=i:this.object instanceof t.OrthographicCamera?(this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom*i)),this.object.updateProjectionMatrix(),m=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)},oe=i=>{this.object instanceof t.PerspectiveCamera?y*=i:this.object instanceof t.OrthographicCamera?(this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/i)),this.object.updateProjectionMatrix(),m=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)};function ne(i){w.set(i.clientX,i.clientY)}function Ge(i){V.set(i.clientX,i.clientY)}function re(i){S.set(i.clientX,i.clientY)}const He=i=>{M.set(i.clientX,i.clientY),v.subVectors(M,w).multiplyScalar(this.rotateSpeed);const c=this.domElement;N(2*Math.PI*v.x/c.clientHeight),te(2*Math.PI*v.y/c.clientHeight),w.copy(M),this.update()},Ie=i=>{A.set(i.clientX,i.clientY),z.subVectors(A,V),z.y>0?Y(I()):z.y<0&&oe(I()),V.copy(A),this.update()},Fe=i=>{T.set(i.clientX,i.clientY),R.subVectors(T,S).multiplyScalar(this.panSpeed),U(R.x,R.y),S.copy(T),this.update()},Ne=i=>{i.deltaY<0?oe(I()):i.deltaY>0&&Y(I()),this.update()},Ye=i=>{let c=!1;switch(i.code){case this.keys.UP:U(0,this.keyPanSpeed),c=!0;break;case this.keys.BOTTOM:U(0,-this.keyPanSpeed),c=!0;break;case this.keys.LEFT:U(this.keyPanSpeed,0),c=!0;break;case this.keys.RIGHT:U(-this.keyPanSpeed,0),c=!0;break}c&&(i.preventDefault(),this.update())};function ae(){if(f.length===1)w.set(f[0].pageX,f[0].pageY);else{const i=.5*(f[0].pageX+f[1].pageX),c=.5*(f[0].pageY+f[1].pageY);w.set(i,c)}}function le(){if(f.length===1)S.set(f[0].pageX,f[0].pageY);else{const i=.5*(f[0].pageX+f[1].pageX),c=.5*(f[0].pageY+f[1].pageY);S.set(i,c)}}function he(){const i=f[0].pageX-f[1].pageX,c=f[0].pageY-f[1].pageY,b=Math.sqrt(i*i+c*c);V.set(0,b)}const Qe=()=>{this.enableZoom&&he(),this.enablePan&&le()},We=()=>{this.enableZoom&&he(),this.enableRotate&&ae()},ce=i=>{if(f.length==1)M.set(i.pageX,i.pageY);else{const b=W(i),x=.5*(i.pageX+b.x),E=.5*(i.pageY+b.y);M.set(x,E)}v.subVectors(M,w).multiplyScalar(this.rotateSpeed);const c=this.domElement;N(2*Math.PI*v.x/c.clientHeight),te(2*Math.PI*v.y/c.clientHeight),w.copy(M)},ue=i=>{if(f.length===1)T.set(i.pageX,i.pageY);else{const c=W(i),b=.5*(i.pageX+c.x),x=.5*(i.pageY+c.y);T.set(b,x)}R.subVectors(T,S).multiplyScalar(this.panSpeed),U(R.x,R.y),S.copy(T)},me=i=>{const c=W(i),b=i.pageX-c.x,x=i.pageY-c.y,E=Math.sqrt(b*b+x*x);A.set(0,E),z.set(0,Math.pow(A.y/V.y,this.zoomSpeed)),Y(z.y),V.copy(A)},Xe=i=>{this.enableZoom&&me(i),this.enablePan&&ue(i)},Ze=i=>{this.enableZoom&&me(i),this.enableRotate&&ce(i)};this.onPointerDown=i=>{this.enabled!==!1&&(f.length===0&&(this.domElement.addEventListener("pointermove",this.onPointerMove),this.domElement.addEventListener("pointerup",this.onPointerUp)),it(i),i.pointerType==="touch"?Je(i):$e(i))};let Q=!1;this.onPointerMove=i=>{this.enabled!==!1&&(Q||(this.domElement.setPointerCapture(i.pointerId),Q=!0),i.pointerType==="touch"?et(i):Ke(i))},this.onPointerUp=i=>{this.enabled!==!1&&(Q=!1,i.pointerType==="touch"?tt():qe(),de(i),f.length===0&&(this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this.onPointerMove),this.domElement.removeEventListener("pointerup",this.onPointerUp)))},this.onPointerCancel=i=>{de(i)};const $e=i=>{let c;switch(i.button){case 0:c=this.mouseButtons.LEFT;break;case 1:c=this.mouseButtons.MIDDLE;break;case 2:c=this.mouseButtons.RIGHT;break;default:c=-1}switch(c){case t.MOUSE.DOLLY:if(this.enableZoom===!1)return;Ge(i),a=s.DOLLY;break;case t.MOUSE.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;re(i),a=s.PAN}else{if(this.enableRotate===!1)return;ne(i),a=s.ROTATE}break;case t.MOUSE.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;ne(i),a=s.ROTATE}else{if(this.enablePan===!1)return;re(i),a=s.PAN}break;default:a=s.NONE}a!==s.NONE&&this.dispatchEvent({type:"start"})},Ke=i=>{if(this.enabled!==!1)switch(a){case s.ROTATE:if(this.enableRotate===!1)return;He(i);break;case s.DOLLY:if(this.enableZoom===!1)return;Ie(i);break;case s.PAN:if(this.enablePan===!1)return;Fe(i);break}},qe=i=>{this.dispatchEvent({type:"end"}),a=s.NONE};this.onMouseWheel=i=>{this.enabled===!1||this.enableZoom===!1||a!==s.NONE||(i.preventDefault(),this.dispatchEvent({type:"start"}),Ne(i),this.dispatchEvent({type:"end"}))},this.onKeyDown=i=>{this.enabled===!1||this.enablePan===!1||Ye(i)};const Je=i=>{switch(pe(i),f.length){case 1:switch(this.touches.ONE){case t.TOUCH.ROTATE:if(this.enableRotate===!1)return;ae(),a=s.TOUCH_ROTATE;break;case t.TOUCH.PAN:if(this.enablePan===!1)return;le(),a=s.TOUCH_PAN;break;default:a=s.NONE}break;case 2:switch(this.touches.TWO){case t.TOUCH.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;Qe(),a=s.TOUCH_DOLLY_PAN;break;case t.TOUCH.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;We(),a=s.TOUCH_DOLLY_ROTATE;break;default:a=s.NONE}break;default:a=s.NONE}a!==s.NONE&&this.dispatchEvent({type:"start"})},et=i=>{switch(pe(i),a){case s.TOUCH_ROTATE:if(this.enableRotate===!1)return;ce(i),this.update();break;case s.TOUCH_PAN:if(this.enablePan===!1)return;ue(i),this.update();break;case s.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;Xe(i),this.update();break;case s.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;Ze(i),this.update();break;default:a=s.NONE}},tt=i=>{this.dispatchEvent({type:"end"}),a=s.NONE};this.onContextMenu=i=>{this.enabled!==!1&&i.preventDefault()};function it(i){f.push(i)}const de=i=>{delete H[i.pointerId];for(let c=0;c<f.length;c++)if(f[c].pointerId==i.pointerId){f.splice(c,1);return}};function pe(i){let c=H[i.pointerId];c===void 0&&(c=new t.Vector2,H[i.pointerId]=c),c.set(i.pageX,i.pageY)}function W(i){const c=i.pointerId===f[0].pointerId?f[1]:f[0];return H[c.pointerId]}this.spherical=l,this.domElement.addEventListener("contextmenu",this.onContextMenu),this.domElement.addEventListener("pointerdown",this.onPointerDown),this.domElement.addEventListener("pointercancel",this.onPointerCancel),this.domElement.addEventListener("wheel",this.onMouseWheel,{passive:!1}),this.reset=()=>{this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent({type:"change"}),this.update(),a=s.NONE},this.update()}getPolarAngle(){return this.spherical.phi}getAzimuthalAngle(){return this.spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this.onKeyDown),this._domElementKeyEvents=e}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}setCamera(e){this.object=e}setDom(e){this.dispose(),this.domElement=e,this.domElement.addEventListener("contextmenu",this.onContextMenu),this.domElement.addEventListener("pointerdown",this.onPointerDown),this.domElement.addEventListener("pointercancel",this.onPointerCancel),this.domElement.addEventListener("wheel",this.onMouseWheel,{passive:!1})}dispose(){this.domElement.removeEventListener("contextmenu",this.onContextMenu),this.domElement.removeEventListener("pointerdown",this.onPointerDown),this.domElement.removeEventListener("pointercancel",this.onPointerCancel),this.domElement.removeEventListener("wheel",this.onMouseWheel),this.domElement.removeEventListener("pointermove",this.onPointerMove),this.domElement.removeEventListener("pointerup",this.onPointerUp),this._domElementKeyEvents!==null&&this._domElementKeyEvents.removeEventListener("keydown",this.onKeyDown)}}class we{}class Me{constructor(n="rgb(230, 20, 240)",e="rgba(230, 20, 240, 0.15)"){o(this,"element");o(this,"startPoint");o(this,"pointTopLeft");o(this,"pointBottomRight");o(this,"isDown");const r=document.createElement("div");r.style.pointerEvents="none",r.style.border=`1px solid ${n}`,r.style.position="fixed",r.style.zIndex="100",r.style.backgroundColor=e,this.element=r,this.startPoint=new t.Vector2,this.pointTopLeft=new t.Vector2,this.pointBottomRight=new t.Vector2,this.isDown=!1}onSelectStart(n){this.isDown=!0,document.body.appendChild(this.element),this.element.style.left=n.clientX+"px",this.element.style.top=n.clientY+"px",this.element.style.width="0px",this.element.style.height="0px",this.startPoint.x=n.clientX,this.startPoint.y=n.clientY}onSelectMove(n){!this.isDown||(this.pointBottomRight.x=Math.max(this.startPoint.x,n.clientX),this.pointBottomRight.y=Math.max(this.startPoint.y,n.clientY),this.pointTopLeft.x=Math.min(this.startPoint.x,n.clientX),this.pointTopLeft.y=Math.min(this.startPoint.y,n.clientY),this.element.style.left=this.pointTopLeft.x+"px",this.element.style.top=this.pointTopLeft.y+"px",this.element.style.width=this.pointBottomRight.x-this.pointTopLeft.x+"px",this.element.style.height=this.pointBottomRight.y-this.pointTopLeft.y+"px")}onSelectOver(n){!this.isDown||(this.isDown=!1,document.body.removeChild(this.element))}}class Pe extends t.Texture{constructor(n,e,r,s,a,h,l,d,y,g){super(n,e,r,s,a,h,l,d,y,g)}}class Ce extends t.Texture{constructor(n){super(),Object.keys(n).forEach(e=>{this[e]=n[e]}),this.copy(n)}}const G=class extends Z.Pass{constructor(e=new t.Vector2(256,256),r=1,s=0,a=0,h=new t.Scene,l=new t.PerspectiveCamera,d){super();o(this,"resolution");o(this,"strength");o(this,"radius");o(this,"threshold");o(this,"selectedObjects",[]);o(this,"renderScene");o(this,"renderCamera");o(this,"clearColor",new t.Color(0,0,0));o(this,"renderTargetsHorizontal",[]);o(this,"renderTargetsVertical",[]);o(this,"nMips",5);o(this,"selectRenderTarget");o(this,"renderTargetBright");o(this,"highPassUniforms");o(this,"materialHighPassFilter");o(this,"separableBlurMaterials",[]);o(this,"compositeMaterial");o(this,"bloomTintColors");o(this,"mixMaterial");o(this,"enabled",!0);o(this,"needsSwap",!1);o(this,"_oldClearColor",new t.Color);o(this,"oldClearAlpha",1);o(this,"basic",new t.MeshBasicMaterial);o(this,"fsQuad",new Z.FullScreenQuad);o(this,"materialCache",new Map);o(this,"sceneBackgroundCache",null);o(this,"overrideBackground",new t.Color("black"));o(this,"overrideMeshMaterial",new t.MeshBasicMaterial({color:"black"}));o(this,"overrideLineMaterial",new t.LineBasicMaterial({color:"black"}));o(this,"overridePointsMaterial",new t.PointsMaterial({color:"black"}));o(this,"overrideSpriteMaterial",new t.SpriteMaterial({color:"black"}));this.resolution=e,this.strength=r,this.radius=s,this.threshold=a,this.renderScene=h,this.renderCamera=l,this.selectedObjects=d;let y=Math.round(this.resolution.x/2),g=Math.round(this.resolution.y/2);this.selectRenderTarget=new t.WebGLRenderTarget(y,g),this.selectRenderTarget.texture.name="UnrealBloomPass.selected",this.selectRenderTarget.texture.generateMipmaps=!1,this.renderTargetBright=new t.WebGLRenderTarget(y,g),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let v=0;v<this.nMips;v++){const S=new t.WebGLRenderTarget(y,g);S.texture.name="UnrealBloomPass.h"+v,S.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(S);const T=new t.WebGLRenderTarget(y,g);T.texture.name="UnrealBloomPass.v"+v,T.texture.generateMipmaps=!1,this.renderTargetsVertical.push(T),y=Math.round(y/2),g=Math.round(g/2)}$.LuminosityHighPassShader===void 0&&console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");const m=$.LuminosityHighPassShader;this.highPassUniforms=t.UniformsUtils.clone(m.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new t.ShaderMaterial({uniforms:this.highPassUniforms,vertexShader:m.vertexShader,fragmentShader:m.fragmentShader,defines:{}});const w=[3,5,7,9,11];y=Math.round(this.resolution.x/2),g=Math.round(this.resolution.y/2);for(let v=0;v<this.nMips;v++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(w[v])),this.separableBlurMaterials[v].uniforms.texSize.value=new t.Vector2(y,g),y=Math.round(y/2),g=Math.round(g/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=r,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.needsUpdate=!0;const M=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=M,this.bloomTintColors=[new t.Vector3(1,1,1),new t.Vector3(1,1,1),new t.Vector3(1,1,1),new t.Vector3(1,1,1),new t.Vector3(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.mixMaterial=this.getMixMaterial()}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose()}setSize(e,r){let s=Math.round(e/2),a=Math.round(r/2);this.selectRenderTarget.setSize(s,a),this.renderTargetBright.setSize(s,a);for(let h=0;h<this.nMips;h++)this.renderTargetsHorizontal[h].setSize(s,a),this.renderTargetsVertical[h].setSize(s,a),this.separableBlurMaterials[h].uniforms.texSize.value=new t.Vector2(s,a),s=Math.round(s/2),a=Math.round(a/2)}render(e,r,s,a,h){if(!this.selectedObjects.length){this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=s.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e));return}e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const l=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),h&&e.state.buffers.stencil.setTest(!1);const d=new Map;for(const m of this.selectedObjects)d.set(m,!0);const y=this.materialCache;this.renderScene.background&&(this.sceneBackgroundCache=this.renderScene.background,this.renderScene.background=this.overrideBackground),this.renderScene.traverse(m=>{!d.has(m)&&!m.isLight&&m.visible&&(y.set(m,m.material),m instanceof t.Mesh?m.material=this.overrideMeshMaterial:m instanceof t.Line?m.material=this.overrideLineMaterial:m instanceof t.Points?m.material=this.overridePointsMaterial:m instanceof t.Sprite&&(m.material=this.overrideSpriteMaterial))}),e.setRenderTarget(this.selectRenderTarget),e.clear(),e.render(this.renderScene,this.renderCamera),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=this.selectRenderTarget.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=this.selectRenderTarget.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let g=this.renderTargetBright;for(let m=0;m<this.nMips;m++)this.fsQuad.material=this.separableBlurMaterials[m],this.separableBlurMaterials[m].uniforms.colorTexture.value=g.texture,this.separableBlurMaterials[m].uniforms.direction.value=G.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[m]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[m].uniforms.colorTexture.value=this.renderTargetsHorizontal[m].texture,this.separableBlurMaterials[m].uniforms.direction.value=G.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[m]),e.clear(),this.fsQuad.render(e),g=this.renderTargetsVertical[m];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.mixMaterial,this.mixMaterial.uniforms.bloom.value=this.renderTargetsHorizontal[0].texture,this.mixMaterial.uniforms.origin.value=s.texture,h&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=l;for(const m of y.entries())m[0].material=m[1];y.clear(),this.sceneBackgroundCache&&(this.renderScene.background=this.sceneBackgroundCache,this.sceneBackgroundCache=null)}getMixMaterial(){return new t.ShaderMaterial({blending:t.AdditiveBlending,depthTest:!1,depthWrite:!1,transparent:!0,uniforms:{bloom:{value:null},origin:{value:null}},vertexShader:`
    
        varying vec2 vUv;
    
        void main() {
    
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    
        }`,fragmentShader:`
        uniform sampler2D bloom;
        uniform sampler2D origin;
    
        varying vec2 vUv;
    
        void main() {
          vec3 bloomColor = texture2D(bloom, vUv).rgb;
          vec3 originColor = texture2D(origin, vUv).rgb;
          gl_FragColor = vec4(originColor + bloomColor, 1.0);
        }`})}getSeperableBlurMaterial(e){return new t.ShaderMaterial({defines:{KERNEL_RADIUS:e,SIGMA:e},uniforms:{colorTexture:{value:null},texSize:{value:new t.Vector2(.5,.5)},direction:{value:new t.Vector2(.5,.5)}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new t.ShaderMaterial({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};let j=G;o(j,"BlurDirectionX",new t.Vector2(1,0)),o(j,"BlurDirectionY",new t.Vector2(0,1));class Ee extends q{constructor(e=document.createElement("div")){super(e);o(this,"cacheBox",new t.Box3);o(this,"viewWorldMatrix",new t.Matrix4);o(this,"mvPosition",new t.Vector3);o(this,"matrixScale",new t.Vector3);o(this,"worldScale",new t.Vector3);o(this,"vA",new t.Vector3);o(this,"vB",new t.Vector3);o(this,"vC",new t.Vector3);o(this,"alignedPosition",new t.Vector2);o(this,"rotatedPosition",new t.Vector2);o(this,"intersectPoint",new t.Vector3);this.type="CSS2DPlane",this.element.classList.add("vis-css2d","vis-css2d-plane"),new MutationObserver(()=>{this.matrixScale.set(Math.abs(this.width/100)*.1,Math.abs(this.height/100)*.1,1)}).observe(this.element,{attributeFilter:["style"]})}transformVertex(e,r,s){const a=this.alignedPosition,h=this.rotatedPosition,l=0,d=1;a.copy(e).multiply(s),h.x=d*a.x-l*a.y,h.y=l*a.x+d*a.y,e.copy(r),e.x+=h.x,e.y+=h.y,e.applyMatrix4(this.viewWorldMatrix)}raycast(e,r){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),this.viewWorldMatrix.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),this.mvPosition.setFromMatrixPosition(this.modelViewMatrix),this.worldScale.copy(this.matrixScale).multiplyScalar(-this.mvPosition.z),this.transformVertex(this.vA.set(-.5,-.5,0),this.mvPosition,this.worldScale),this.transformVertex(this.vB.set(.5,-.5,0),this.mvPosition,this.worldScale),this.transformVertex(this.vC.set(.5,.5,0),this.mvPosition,this.worldScale);let s=e.ray.intersectTriangle(this.vA,this.vB,this.vC,!1,this.intersectPoint);if(s===null&&(this.transformVertex(this.vB.set(-.5,.5,0),this.mvPosition,this.worldScale),s=e.ray.intersectTriangle(this.vA,this.vC,this.vB,!1,this.intersectPoint),s===null))return;const a=e.ray.origin.distanceTo(this.intersectPoint);a<e.near||a>e.far||r.push({distance:a,point:this.intersectPoint.clone(),face:null,object:this})}}class Le extends J{constructor(e=document.createElement("div")){super(e);o(this,"cacheBox",new t.Box3);this.type="CSS3DPlane",this.element.classList.add("vis-css3d","vis-css3d-plane")}raycast(e,r){const s=this.cacheBox.copy(this.geometry.boundingBox);s.applyMatrix4(this.matrixWorld),e.ray.intersectsBox(s)&&r.push({distance:e.ray.origin.distanceTo(this.position),object:this,point:this.position})}}class De extends ee{constructor(n=document.createElement("div")){super(n),this.type="CSS3DSprite",this.element.classList.add("vis-css3d","vis-css3d-plane")}}class Be extends t.BufferGeometry{constructor(e){super();o(this,"type","LoadBufferGeometry");e&&this.copy(e)}}class k extends t.BufferGeometry{constructor(e=[],r=36,s=!0){super();o(this,"parameters");this.type="CurveGeometry",this.parameters={path:e.map(a=>a.clone()),space:s,divisions:r}}}class Oe extends k{constructor(n=[],e=36,r=!0){super(n,e,r),this.type="CubicBezierCurveGeometry";const s=new t.CurvePath;if(n.length<4){console.warn("CubicBezierCurveGeometry path length at least 4.");return}const a=4+(n.length-4)-(n.length-4)%3;for(let l=2;l<a;l+=3)s.add(new t.CubicBezierCurve3(n[l-2],n[l-1],n[l],n[l+1]));const h=s.curves.reduce((l,d)=>l+=d.arcLengthDivisions,0);if(e>h){const l=Math.ceil((e-h)/s.curves.length);s.curves.forEach(d=>{d.arcLengthDivisions=d.arcLengthDivisions*(l+1),d.updateArcLengths()})}this.setFromPoints(r?s.getSpacedPoints(e):s.getPoints(e))}}class Re extends k{constructor(n=[],e=36,r=!0){if(super(n,e,r),this.type="LineCurveGeometry",!n.length){console.warn("LineCurveGeometry path length at least 1.");return}const s=new t.CurvePath;for(let h=1;h<n.length;h+=1)s.add(new t.LineCurve3(n[h-1],n[h]));const a=s.curves.reduce((h,l)=>h+=l.arcLengthDivisions,0);if(e>a){const h=Math.ceil((e-a)/s.curves.length);s.curves.forEach(l=>{l.arcLengthDivisions=l.arcLengthDivisions*(h+1),l.updateArcLengths()})}this.setFromPoints(r?s.getSpacedPoints(e):s.getPoints(e))}}class Ve extends k{constructor(n=[],e=36,r=!0){super(n,e,r),this.type="QuadraticBezierCurveGeometry";const s=new t.CurvePath;if(n.length<3){console.warn("QuadraticBezierCurveGeometry path length at least 3.");return}const a=3+(n.length-3)-(n.length-3)%2;for(let l=1;l<a;l+=2)s.add(new t.QuadraticBezierCurve3(n[l-1],n[l],n[l+1]));const h=s.curves.reduce((l,d)=>l+=d.arcLengthDivisions,0);if(e>h){const l=Math.ceil((e-h)/s.curves.length);s.curves.forEach(d=>{d.arcLengthDivisions=d.arcLengthDivisions*(l+1),d.updateArcLengths()})}this.setFromPoints(r?s.getSpacedPoints(e):s.getPoints(e))}}class Ae extends k{constructor(n=[],e=36,r=!0){if(super(n,e,r),this.type="SplineCurveGeometry",!n.length){console.warn("SplineCurveGeometry path length at least 1.");return}const s=new t.CatmullRomCurve3(n);this.setFromPoints(r?s.getSpacedPoints(e):s.getPoints(e))}}class Ue extends t.ShapeBufferGeometry{constructor(n=[new t.Vector2(0,0)],e=12){const r=new t.Shape,s=n[0];if(s){r.moveTo(s.x,s.y);for(let a=1;a<n.length;a+=1)r.lineTo(n[a].x,n[a].y)}super(r,e),this.type="LineShapeGeometry"}}class _e extends t.TubeGeometry{constructor(n=[],e=64,r=1,s=8,a=!1){if(!n.length){console.warn("LineTubeGeometry path length at least 1.");return}const h=new t.CurvePath;for(let l=1;l<n.length;l+=1)h.add(new t.LineCurve3(n[l-1],n[l]));super(h,e,r,s,a),this.type="LineTubeGeometry"}}class je extends t.TubeGeometry{constructor(n=[],e=64,r=1,s=8,a=!1){if(!n.length){console.warn("SplineTubeGeometry path length at least 1.");return}const h=new t.CatmullRomCurve3(n);super(h,e,r,s,a),this.type="SplineTubeGeometry"}}const O=class extends t.Loader{constructor(n){super(n)}load(n,e,r,s){this.path!==void 0&&(n=this.path+n),this.manager.itemStart(n),n=this.manager.resolveURL(n);const a=t.Cache.get(n);if(a!==void 0)return setTimeout(()=>{e&&e(a),this.manager.itemEnd(n)},0),a;const h=document.createElement("video");return h.preload=O.preload,h.autoplay=O.autoplay,h.loop=O.loop,h.muted=O.muted,h.src=n,h.style.position="fixed",h.style.top="0",h.style.left="0",h.style.zIndex="-1",document.body.appendChild(h),h.oncanplay=()=>{t.Cache.add(n,h),this.manager.itemEnd(n),e&&e(h)},h.onerror=l=>{this.manager.itemEnd(n),s&&s(l)},h}};let B=O;o(B,"autoplay",!0),o(B,"preload","auto"),o(B,"muted",!0),o(B,"loop",!0);const ke=function(p){return()=>p};u.CSS2DPlane=Ee,u.CSS3DPlane=Le,u.CSS3DSprite=De,u.CubicBezierCurveGeometry=Oe,u.CurveGeometry=k,u.ENGINE_EVENT=K,u.Engine=ve,u.EventDispatcher=F,u.ImageTexture=Pe,u.LineCurveGeometry=Re,u.LineShapeGeometry=Ue,u.LineTubeGeometry=_e,u.LoadGeometry=Be,u.LoadTexture=Ce,u.QuadraticBezierCurveGeometry=Ve,u.SelectiveBloomPass=j,u.SplineCurveGeometry=Ae,u.SplineTubeGeometry=je,u.VideoLoader=B,u.VideoTexture=Se,u.VisCSS2DObject=q,u.VisCSS3DObject=J,u.VisCSS3DSprite=ee,u.VisOrbitControls=Te,u.VisSelectionBox=we,u.VisSelectionHelper=Me,u.definePlugin=xe,u.defineStrategy=ke,Object.defineProperties(u,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
