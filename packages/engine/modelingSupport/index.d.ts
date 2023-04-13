import { EngineSupport } from "@vis-three/middleware";
import { AxesHelper, Event, GridHelper, Object3D, Vector3, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { Screenshot, WebGLRendererEngine } from "@vis-three/plugin-webgl-renderer";
import { EffectComposerEngine } from "@vis-three/plugin-effect-composer";
import { OrbitControlsEngine } from "@vis-three/plugin-orbit-controls";
import { SelectionSupportEngine } from "@vis-three/plugin-selection-support";
import { AxesHelperEngine, AxesHelperOptions } from "@vis-three/plugin-axes-helper";
import { GridHelperEngine } from "@vis-three/plugin-grid-helper";
import { VIEWPOINT, ViewpointEngine } from "@vis-three/plugin-viewpoint";
import { TransformControlsEngine, VisTransformControls } from "@vis-three/plugin-transform-controls";
import { StatsEngine } from "@vis-three/plugin-stats";
import { KeyboardManager, KeyboardManagerEngine } from "@vis-three/plugin-keyboard-manager";
import { ObjectHelperEngine, ObjectHelperManager } from "@vis-three/plugin-object-helper";
import { CSS2DRendererEngine } from "@vis-three/plugin-css2d-renderer";
import { CSS3DRendererEngine } from "@vis-three/plugin-css3d-renderer";
import { SelectionEngine } from "@vis-three/plugin-selection";
import { VisStats } from "@vis-three/plugin-stats/VisStats";
import { PathDrawingEngine } from "@vis-three/plugin-path-drawing";
import { PathDrawing } from "@vis-three/plugin-path-drawing/PathDrawing";
export { VIEWPOINT };
export declare class ModelingEngineSupport extends EngineSupport implements WebGLRendererEngine, EffectComposerEngine, OrbitControlsEngine, KeyboardManagerEngine, StatsEngine, TransformControlsEngine, ViewpointEngine, GridHelperEngine, AxesHelperEngine, SelectionSupportEngine, ObjectHelperEngine, CSS2DRendererEngine, CSS3DRendererEngine, PathDrawingEngine {
    webGLRenderer: WebGLRenderer;
    getScreenshot: (params?: Screenshot | undefined) => Promise<string>;
    effectComposer: EffectComposer;
    orbitControls: any;
    keyboardManager: KeyboardManager;
    stats: VisStats;
    setStats: (show: boolean) => StatsEngine;
    transing: boolean;
    transformControls: VisTransformControls;
    setTransformControls: (show: boolean) => TransformControlsEngine;
    setViewpoint: any;
    gridHelper: GridHelper;
    setGridHelper: (show: boolean) => GridHelperEngine;
    axesHelper: AxesHelper;
    setAxesHelper: (params: AxesHelperOptions) => AxesHelperEngine;
    selectionBox: Set<Object3D<Event>>;
    setSelectionBox: (objects: Object3D<Event>[]) => SelectionEngine;
    setSelectionBoxBySymbol: (symbols: string[]) => SelectionSupportEngine;
    objectHelperManager: ObjectHelperManager;
    setObjectHelper: (show: boolean) => ObjectHelperEngine;
    css2DRenderer: CSS2DRenderer;
    css3DRenderer: CSS3DRenderer;
    pathDrawing: PathDrawing;
    drawPath: () => PathDrawingEngine;
    getPathPoint: (result?: Vector3 | undefined) => Vector3 | null;
    constructor();
}
