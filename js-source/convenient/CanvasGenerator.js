/**
 * @deprecated CanvasTextureGenerator rename to CanvasGenerator
 */
export class CanvasTextureGenerator {
    canvas;
    constructor(parameters) {
        this.canvas = document.createElement("canvas");
        const devicePixelRatio = window.devicePixelRatio;
        this.canvas.width = (parameters?.width || 512) * devicePixelRatio;
        this.canvas.height = (parameters?.height || 512) * devicePixelRatio;
        this.canvas.style.backgroundColor =
            parameters?.bgColor || "rgb(255, 255, 255)";
    }
    get() {
        return this.canvas;
    }
    draw(fun) {
        const ctx = this.canvas.getContext("2d");
        if (ctx) {
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            fun(ctx);
            return this;
        }
        else {
            console.warn(`you browser can not support canvas 2d`);
            return this;
        }
    }
    preview(parameters) {
        const canvas = this.canvas;
        canvas.style.position = "fixed";
        canvas.style.top = parameters?.top || "5%";
        canvas.style.left = parameters?.left || "5%";
        canvas.style.right = parameters?.right || "unset";
        canvas.style.bottom = parameters?.bottom || "unset";
        document.body.appendChild(this.canvas);
        return this;
    }
}
export class CanvasGenerator {
    canvas;
    constructor(parameters) {
        this.canvas = document.createElement("canvas");
        const devicePixelRatio = window.devicePixelRatio;
        this.canvas.width = (parameters?.width || 512) * devicePixelRatio;
        this.canvas.height = (parameters?.height || 512) * devicePixelRatio;
        this.canvas.style.backgroundColor =
            parameters?.bgColor || "rgb(255, 255, 255)";
    }
    get() {
        return this.canvas;
    }
    /**
     * 清空画布
     * @param x position x px
     * @param y  position z px
     * @param width width px
     * @param height height px
     * @returns this
     */
    clear(x = 0, y = 0, width, height) {
        !width && (width = this.canvas.width);
        !height && (height = this.canvas.height);
        const ctx = this.canvas.getContext("2d");
        if (ctx) {
            ctx.clearRect(x, y, width, height);
            return this;
        }
        else {
            console.warn(`you browser can not support canvas 2d`);
            return this;
        }
    }
    draw(fun) {
        const ctx = this.canvas.getContext("2d");
        if (ctx) {
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            fun(ctx);
            return this;
        }
        else {
            console.warn(`you browser can not support canvas 2d`);
            return this;
        }
    }
    preview(parameters) {
        const canvas = this.canvas;
        canvas.style.position = "fixed";
        canvas.style.top = parameters?.top || "5%";
        canvas.style.left = parameters?.left || "5%";
        canvas.style.right = parameters?.right || "unset";
        canvas.style.bottom = parameters?.bottom || "unset";
        document.body.appendChild(this.canvas);
        return this;
    }
}
//# sourceMappingURL=CanvasGenerator.js.map