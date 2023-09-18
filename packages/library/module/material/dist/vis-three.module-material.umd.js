(function(t,o){typeof exports=="object"&&typeof module!="undefined"?o(exports,require("@vis-three/middleware"),require("three"),require("@vis-three/utils")):typeof define=="function"&&define.amd?define(["exports","@vis-three/middleware","three","@vis-three/utils"],o):(t=typeof globalThis!="undefined"?globalThis:t||self,o((t["vis-three"]=t["vis-three"]||{},t["vis-three"]["module-material"]={}),t.middleware,t.three,t.utils))})(this,function(t,o,r,v){"use strict";class y extends o.Compiler{constructor(){super()}}const T=function(e,a){o.Rule(e,a)},u=function(){return{vid:"",type:"Material",alphaTest:0,colorWrite:!0,depthTest:!0,depthWrite:!0,name:"",needsUpdate:!1,opacity:1,dithering:!1,shadowSide:null,side:r.FrontSide,toneMapped:!0,transparent:!1,visible:!0,blendDst:r.OneMinusSrcAlphaFactor,blendDstAlpha:null,blendEquation:r.AddEquation,blendEquationAlpha:null,blending:r.NormalBlending,blendSrc:r.SrcAlphaFactor,blendSrcAlpha:null,polygonOffset:!1,polygonOffsetFactor:0,polygonOffsetUnits:0}},b=function(){return Object.assign(u(),{color:"rgb(255, 255, 255)",combine:r.MultiplyOperation,aoMapIntensity:1,fog:!0,lightMapIntensity:1,reflectivity:1,refractionRatio:.98,wireframe:!1,wireframeLinecap:"round",wireframeLinejoin:"round",wireframeLinewidth:1,map:"",envMap:"",alphaMap:"",aoMap:"",lightMap:"",specularMap:""})},g=function(){return Object.assign(u(),{aoMapIntensity:1,bumpScale:1,color:"rgb(255, 255, 255)",displacementScale:1,displacementBias:0,emissive:"rgb(0, 0, 0)",emissiveIntensity:1,envMapIntensity:1,flatShading:!1,lightMapIntensity:1,metalness:0,normalMapType:r.TangentSpaceNormalMap,refractionRatio:.98,roughness:1,wireframe:!1,wireframeLinecap:"round",wireframeLinejoin:"round",roughnessMap:"",normalMap:"",metalnessMap:"",map:"",lightMap:"",envMap:"",emissiveMap:"",displacementMap:"",bumpMap:"",alphaMap:"",aoMap:""})},C=function(){return Object.assign(g(),{attenuationColor:"rgb(255, 255, 255)",attenuationDistance:0,clearcoat:0,clearcoatNormalScale:{x:1,y:1},clearcoatRoughness:0,ior:1.5,reflectivity:.5,sheen:0,sheenRoughness:1,sheenColor:"rgb(255, 255, 255)",specularIntensity:0,specularColor:"rgb(255, 255, 255)",thickness:0,transmission:0,clearcoatMap:"",clearcoatNormalMap:"",clearcoatRoughnessMap:"",sheenRoughnessMap:"",sheenColorMap:"",specularIntensityMap:"",specularColorMap:"",thicknessMap:"",transmissionMap:""})},P=function(){return Object.assign(u(),{aoMapIntensity:1,bumpScale:1,color:"rgb(255, 255, 255)",displacementScale:1,displacementBias:0,emissive:"rgb(0, 0, 0)",emissiveIntensity:1,envMapIntensity:1,flatShading:!1,lightMapIntensity:1,normalMapType:r.TangentSpaceNormalMap,refractionRatio:.98,wireframe:!1,wireframeLinecap:"round",wireframeLinejoin:"round",specular:"rgb(17, 17, 17)",shininess:30,combine:r.MultiplyOperation,normalMap:"",map:"",lightMap:"",envMap:"",emissiveMap:"",displacementMap:"",bumpMap:"",alphaMap:"",aoMap:"",specularMap:""})},O=function(){return Object.assign(u(),{color:"rgb(255, 255, 255)",rotation:0,map:"",alphaMap:"",sizeAttenuation:!0})},m=function(){return Object.assign(u(),{color:"rgb(255, 255, 255)",linecap:"round",linejoin:"round",linewidth:1})},j=function(){return Object.assign(m(),{dashSize:3,gapSize:1,scale:1})},L=function(){return Object.assign(u(),{map:"",alphaMap:"",color:"rgb(255, 255, 255)",sizeAttenuation:!0,size:1})},w=function(){return Object.assign(u(),{shader:"",uniforms:{}})},B=function(){return Object.assign(u(),{color:"rgb(255, 255, 255)",bumpScale:1,displacementScale:1,displacementBias:0,flatShading:!1,fog:!0,normalMapType:r.TangentSpaceNormalMap,normalSale:{x:1,y:1},map:"",alphaMap:"",bumpMap:"",displacementMap:"",matcap:"",normalMap:""})},l={reg:new RegExp("transparent|sizeAttenuation"),handler({target:e,key:a,value:n}){e[a]=n,e.needsUpdate=!0}},h=function({target:e,key:a,value:n,engine:i}){o.globalAntiShake.exec(c=>{if(!n)return e[a]=null,e.needsUpdate=!0,!0;const S=i.compilerManager.getObjectBySymbol(n);return S instanceof r.Texture?(e[a]=S,e.needsUpdate=!0,!0):(c&&console.warn(`this url resource is not instance of Texture: ${a}`,n,S),e[a]=null,!1)})},M={reg:new RegExp("map$","i"),handler:h},s=function({target:e,key:a,value:n}){e[a].copy(new r.Color(n))},f=function(e,a,n){const i={};for(const c of Object.keys(a))c.toLocaleLowerCase().endsWith("map")&&a[c]?(h({target:e,key:c,value:a[c],engine:n}),i[c]=!0):e[c]instanceof r.Color&&(e[c]=new r.Color(a[c]),i[c]=!0);return v.syncObject(a,e,i),e.needsUpdate=!0,e},p=function(e){e.dispose()};var R=o.defineProcessor({type:"MeshBasicMaterial",config:b,commands:{set:{color:s,$reg:[M,l]}},create:function(e,a){return f(new r.MeshBasicMaterial,e,a)},dispose:p}),x=o.defineProcessor({type:"MeshPhongMaterial",config:P,commands:{set:{color:s,emissive:s,specular:s,$reg:[M,l]}},create:function(e,a){return f(new r.MeshPhongMaterial,e,a)},dispose:p}),I=o.defineProcessor({type:"MeshPhysicalMaterial",config:C,commands:{set:{color:s,emissive:s,specularColor:s,sheenColor:s,attenuationColor:s,$reg:[M,l]}},create:function(e,a){return f(new r.MeshPhysicalMaterial,e,a)},dispose:p}),$=o.defineProcessor({type:"MeshStandardMaterial",config:g,commands:{set:{color:s,emissive:s,$reg:[M,l]}},create:function(e,a){return f(new r.MeshStandardMaterial,e,a)},dispose:p}),A=o.defineProcessor({type:"PointsMaterial",config:L,commands:{set:{color:s,$reg:[M,l]}},create:function(e,a){return f(new r.PointsMaterial,e,a)},dispose:p});const d={vertexShader:`
  void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,fragmentShader:`
    void main () {
      gl_FragColor = vec4(0.8,0.8,0.8,1.0);
    }`};var U=o.defineProcessor({type:"ShaderMaterial",config:w,commands:{set:{shader({target:e,value:a}){if(e.vertexShader=d.vertexShader,e.fragmentShader=d.fragmentShader,a){const n=o.ShaderGeneratorManager.getShader(a);n!=null&&n.vertexShader&&(e.vertexShader=n.vertexShader),n!=null&&n.fragmentShader&&(e.fragmentShader=n.fragmentShader),n!=null&&n.uniforms&&(e.uniforms=n.uniforms),n!=null&&n.defines&&(e.defines=n.defines)}e.needsUpdate=!0},$reg:[l]}},create:function(e,a){const n=new r.ShaderMaterial;if(n.vertexShader=d.vertexShader,n.fragmentShader=d.fragmentShader,e.shader){const i=o.ShaderGeneratorManager.getShader(e.shader);i!=null&&i.vertexShader&&(n.vertexShader=i.vertexShader),i!=null&&i.fragmentShader&&(n.fragmentShader=i.fragmentShader),i!=null&&i.uniforms&&(n.uniforms=i.uniforms),i!=null&&i.defines&&(n.defines=i.defines)}return v.syncObject(e,n,{type:!0,shader:!0}),n.needsUpdate=!0,n},dispose:p}),D=o.defineProcessor({type:"SpriteMaterial",config:O,commands:{set:{color:s,$reg:[M,l]}},create:function(e,a){return f(new r.SpriteMaterial,e,a)},dispose:p}),E=o.defineProcessor({type:"LineBasicMaterial",config:m,commands:{set:{color:s,$reg:[M,l]}},create:function(e,a){return f(new r.LineBasicMaterial,e,a)},dispose:p}),N=o.defineProcessor({type:"LineDashedMaterial",config:j,commands:{set:{color:s,$reg:[M,l]}},create:function(e,a){return f(new r.LineDashedMaterial,e,a)},dispose:p}),q=o.defineProcessor({type:"MeshMatcapMaterial",config:B,commands:{set:{color:s,matcap:h,$reg:[M,l]}},create(e,a){return f(new r.MeshMatcapMaterial,e,a)},dispose:p}),z={type:"material",compiler:y,rule:T,processors:[E,N,R,x,I,$,A,U,D,q],lifeOrder:o.SUPPORT_LIFE_CYCLE.TWO};t.MaterialCompiler=y,t.default=z,t.getLineBasicMaterialConfig=m,t.getLineDashedMaterialConfig=j,t.getMaterialConfig=u,t.getMeshBasicMaterialConfig=b,t.getMeshMatcapMaterialConfig=B,t.getMeshPhongMaterialConfig=P,t.getMeshPhysicalMaterialConfig=C,t.getMeshStandardMaterialConfig=g,t.getPointsMaterialConfig=L,t.getShaderMaterialConfig=w,t.getSpriteMaterialConfig=O,Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
