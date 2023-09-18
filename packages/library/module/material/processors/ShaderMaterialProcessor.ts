import { syncObject } from "@vis-three/utils";
import { ShaderMaterial } from "three";
import {
  getShaderMaterialConfig,
  ShaderMaterialConfig,
} from "../MaterialConfig";
import { commonNeedUpdatesRegCommand, create, dispose } from "./common";
import { MaterialCompiler } from "../MaterialCompiler";
import {
  defineProcessor,
  EngineSupport,
  ShaderGeneratorManager,
} from "@vis-three/middleware";

const defaultShader = {
  vertexShader: `
  void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  fragmentShader: `
    void main () {
      gl_FragColor = vec4(0.8,0.8,0.8,1.0);
    }`,
};

export default defineProcessor<
  ShaderMaterialConfig,
  ShaderMaterial,
  EngineSupport,
  MaterialCompiler
>({
  type: "ShaderMaterial",
  config: getShaderMaterialConfig,
  commands: {
    set: {
      shader({ target, value }) {
        target.vertexShader = defaultShader.vertexShader;
        target.fragmentShader = defaultShader.fragmentShader;

        if (value) {
          const shader = ShaderGeneratorManager.getShader(value);
          shader?.vertexShader && (target.vertexShader = shader.vertexShader);
          shader?.fragmentShader &&
            (target.fragmentShader = shader.fragmentShader);
          shader?.uniforms && (target.uniforms = shader.uniforms);
          shader?.defines && (target.defines = shader.defines);
        }

        target.needsUpdate = true;
      },
      $reg: [commonNeedUpdatesRegCommand],
    },
  },
  create: function (
    config: ShaderMaterialConfig,
    engine: EngineSupport
  ): ShaderMaterial {
    const material = new ShaderMaterial();
    material.vertexShader = defaultShader.vertexShader;
    material.fragmentShader = defaultShader.fragmentShader;

    if (config.shader) {
      const shader = ShaderGeneratorManager.getShader(config.shader);
      shader?.vertexShader && (material.vertexShader = shader.vertexShader);
      shader?.fragmentShader &&
        (material.fragmentShader = shader.fragmentShader);
      shader?.uniforms && (material.uniforms = shader.uniforms);
      shader?.defines && (material.defines = shader.defines);
    }

    syncObject(config, material, {
      type: true,
      shader: true,
    });

    material.needsUpdate = true;
    return material;
  },
  dispose,
});
