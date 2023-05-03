import { CanvasGenerator } from "@vis-three/convenient";
import { AlwaysDepth, BufferAttribute, CanvasTexture, Plane, Points, PointsMaterial, Quaternion, Raycaster, ShaderMaterial, Vector3, } from "three";
class PointsActiveMaterial extends ShaderMaterial {
    constructor(points) {
        super();
        this.uniforms = {
            index: {
                value: points,
            },
        };
        this.vertexShader = `
    void main () {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`;
        this.fragmentShader = `
      uniform bool index[${points.length}]
    `;
    }
}
const anchorTexture = new CanvasTexture(new CanvasGenerator({ width: 32, height: 32 })
    .draw((ctx) => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, 32, 32);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "rgb(0, 255, 238)";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.arc(16, 16, 15, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
})
    .getDom());
export class PathSupportControls extends Points {
    static commonMaterial = new PointsMaterial({
        map: anchorTexture,
        transparent: true,
        depthFunc: AlwaysDepth,
        alphaTest: 0.01,
        sizeAttenuation: false,
        size: 15,
    });
    // static commonActiveMaterial = new
    dragging = false;
    raycaster = new Raycaster();
    plane = new Plane();
    cachePlaneVector3 = new Vector3();
    cacheQuaternion = new Quaternion();
    cacheNormal = new Vector3();
    cachePosition = new Vector3();
    index = 0;
    domElement;
    camera;
    config;
    object;
    _pointerHover = this.pointerHover.bind(this);
    _pointerMove = this.pointerMove.bind(this);
    _pointerDown = this.pointerDown.bind(this);
    _pointerUp = this.pointerUp.bind(this);
    constructor(camera, dom, object, config) {
        super();
        this.material = PathSupportControls.commonMaterial;
        this.renderOrder = Infinity;
        this.matrixAutoUpdate = false;
        config && this.setConfig(config);
        object && this.setObject(object);
        this.setDom(dom).setCamera(camera).connect();
    }
    setDom(dom) {
        if (this.domElement) {
            this.disconnect();
        }
        this.domElement = dom;
        this.connect();
        return this;
    }
    setCamera(camera) {
        this.camera = camera;
        return this;
    }
    setObject(object) {
        this.object = object;
        this.matrix = object.matrix;
        this.matrixWorld = object.matrixWorld;
        return this;
    }
    setConfig(config) {
        this.config = config;
        const position = [];
        this.config.curves.forEach((segment, i, arr) => {
            if (i === arr.length - 1) {
                position.push(segment.params[0], segment.params[1], 0, segment.params[segment.params.length - 2], segment.params[segment.params.length - 1], 0);
            }
            else {
                position.push(segment.params[0], segment.params[1], 0);
            }
        });
        this.geometry.setAttribute("position", new BufferAttribute(new Float32Array(position), 3));
        this.geometry.getAttribute("position").needsUpdate = true;
        return this;
    }
    connect() {
        if (this.object && this.config) {
            this.domElement.addEventListener("pointermove", this._pointerHover);
            this.domElement.addEventListener("mousedown", this._pointerDown);
        }
        return this;
    }
    disconnect() {
        this.domElement.removeEventListener("pointermove", this._pointerHover);
        this.domElement.removeEventListener("mousedown", this._pointerDown);
        return this;
    }
    getPointer(event) {
        if (this.domElement.ownerDocument.pointerLockElement) {
            return {
                x: 0,
                y: 0,
                button: event.button,
            };
        }
        else {
            const rect = this.domElement.getBoundingClientRect();
            return {
                x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
                y: (-(event.clientY - rect.top) / rect.height) * 2 + 1,
                button: event.button,
            };
        }
    }
    intersectPoint(event) {
        this.raycaster.setFromCamera(this.getPointer(event), this.camera);
        const intersect = this.raycaster.intersectObject(this);
        if (intersect.length) {
            return intersect[0].index;
        }
        return null;
    }
    intersectPlane(event) {
        this.raycaster.setFromCamera(this.getPointer(event), this.camera);
        return this.raycaster.ray.intersectPlane(this.plane, this.cachePlaneVector3);
    }
    pointerHover(event) {
        if (this.dragging || !this.visible) {
            return;
        }
        const intersectPoint = this.intersectPoint(event);
        if (Number.isInteger(intersectPoint)) {
            this.domElement.style.cursor = "move";
        }
        else {
            this.domElement.style.cursor = "";
        }
    }
    pointerDown(event) {
        if (!this.visible) {
            return;
        }
        this.cacheQuaternion.setFromRotationMatrix(this.object.matrixWorld);
        this.cacheNormal.set(0, 0, 1).applyQuaternion(this.cacheQuaternion);
        this.cachePosition.setFromMatrixPosition(this.object.matrixWorld);
        this.plane.set(this.cacheNormal, this.cachePosition.length());
        const intersectPoint = this.intersectPoint(event);
        if (typeof intersectPoint === "number") {
            this.index = intersectPoint;
            this.dragging = true;
            this.domElement.addEventListener("mousemove", this._pointerMove);
            this.domElement.addEventListener("mouseup", this._pointerUp);
        }
    }
    pointerMove(event) {
        if (!this.visible && !this.dragging) {
            return;
        }
        const vect = this.intersectPlane(event);
        if (!vect) {
            return;
        }
        vect.sub(this.cachePosition);
        const length = this.config.curves.length;
        if (this.index !== this.config.curves.length) {
            const segment = this.config.curves[this.index];
            segment.params[0] = vect.x;
            segment.params[1] = vect.y;
        }
        else {
            const segment = this.config.curves[length - 1];
            segment.params[segment.params.length - 2] = vect.x;
            segment.params[segment.params.length - 1] = vect.y;
        }
        const position = this.geometry.getAttribute("position");
        const array = position.array;
        array[this.index * 3] = vect.x;
        array[this.index * 3 + 1] = vect.y;
        position.needsUpdate = true;
    }
    pointerUp(event) {
        this.dragging = false;
        this.domElement.removeEventListener("mousemove", this._pointerMove);
        this.domElement.removeEventListener("mouseup", this._pointerUp);
        this.geometry.computeBoundingSphere();
        this.geometry.computeBoundingBox();
    }
}
