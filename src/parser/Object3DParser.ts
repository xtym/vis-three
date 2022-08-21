import { Color, Material, Object3D, Texture, Vector3 } from "three";
import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { MaterialConfig } from "../middleware/material/MaterialConfig";
import { SolidObjectConfig } from "../middleware/solidObject/SolidObjectConfig";
import { LoadTextureConfig } from "../middleware/texture/TextureConfig";
import { syncObject } from "../utils/utils";
import { ParseParams, Parser } from "./Parser";
import { v4 } from "uuid";

export class Object3DParser extends Parser {
  parse(params: ParseParams): void {
    this.parseObject3D(params);
  }

  /**
   * 解析颜色
   * @param color
   * @returns examples - rgb(255, 255,255)
   */
  private parseColor(color: Color): string {
    return `rgb(${Math.round(255 * color.r)}, ${Math.round(
      255 * color.g
    )}, ${Math.round(255 * color.b)})`;
  }

  /**
   * 对象增强,class对象的get set属性转key， three中的是通过_key进行闭包
   * @param object
   * @returns object
   */
  private attributeEnhance<O extends object>(object: O): O {
    const result: O = {} as O;

    for (const key in object) {
      if (key.startsWith("_")) {
        result[key.slice(1)] = object[key];
      } else {
        result[key] = object[key];
      }
    }
    return result;
  }

  /**
   *  解析贴图
   * @param params
   */
  private parseTexture({ url, resource, configMap, resourceMap }: ParseParams) {
    resourceMap.set(url, resource);

    const config = CONFIGFACTORY[CONFIGTYPE.LOADTEXTURE]();
    configMap.set(url, config);

    config.vid = v4();
    config.url = url;

    syncObject<LoadTextureConfig, Texture>(
      resource,
      config as unknown as Texture,
      {
        type: true,
        vid: true,
        url: true,
      }
    );
  }

  private parseMaterial({
    url,
    resource,
    configMap,
    resourceMap,
  }: ParseParams) {
    resourceMap.set(url, resource);

    if (!CONFIGFACTORY[resource.type]) {
      console.warn(
        `can not found support config in vis for this resource`,
        resource
      );
      return;
    }

    const config = CONFIGFACTORY[resource.type]();
    configMap.set(url, config);

    config.vid = v4();

    syncObject<MaterialConfig, Material>(
      this.attributeEnhance(resource),
      config,
      {
        type: true,
        vid: true,
      }
    );

    // 同步颜色配置
    // 同步贴图

    for (const key in resource) {
      if (!resource[key]) {
        continue;
      }

      if ((<Color>resource[key]).isColor) {
        config[key] = this.parseColor(resource[key]);
      } else if (key.toLocaleLowerCase().endsWith("map") && resource[key]) {
        const textureUrl = `${url}.${key}`;

        this.parseTexture({
          url: textureUrl,
          resource: resource[key],
          configMap,
          resourceMap,
        });

        // 同步配置
        config[key] = configMap.get(textureUrl)!.vid;
      }
    }
  }

  private parseGeometry({
    url,
    resource,
    configMap,
    resourceMap,
  }: ParseParams) {
    resourceMap.set(url, resource);

    resource.computeBoundingBox();
    const box = resource.boundingBox!;
    const center = box.getCenter(new Vector3());

    const config = CONFIGFACTORY[CONFIGTYPE.LOADGEOMETRY]();
    config.vid = v4();
    config.url = url;
    config.position.x = (center.x / (box.max.x - box.min.x)) * 2;
    config.position.y = (center.y / (box.max.y - box.min.y)) * 2;
    config.position.z = (center.z / (box.max.z - box.min.z)) * 2;

    configMap.set(url, config);
  }

  private parseObject3D({
    url,
    resource,
    configMap,
    resourceMap,
  }: ParseParams) {
    resourceMap.set(url, resource);

    if (!CONFIGFACTORY[resource.type]) {
      console.warn(
        `can not found support config in vis for this resource`,
        resource
      );
      return;
    }

    const config = CONFIGFACTORY[resource.type]();
    config.vid = v4();

    // 将一般属性同步到配置
    syncObject<SolidObjectConfig, Object3D>(resource, config, {
      type: true,
      vid: true,
      children: true,
      geometry: true,
      material: true,
      parent: true,
      lookAt: true, // load object是没有lookAt的
    });

    config.rotation.x = resource.rotation.x;
    config.rotation.y = resource.rotation.y;
    config.rotation.z = resource.rotation.z;

    configMap.set(url, config);

    // 解析材质
    if (resource.material) {
      if (Array.isArray(resource.material)) {
        config.material = [];
        resource.material.forEach((material, i, arr) => {
          const materialUrl = `${url}.material.${i}`;

          this.parseMaterial({
            url: materialUrl,
            resource: material,

            configMap,
            resourceMap,
          });

          // 同步配置
          config.material.push(configMap.get(materialUrl)!.vid);
        });
      } else {
        const materialUrl = `${url}.material`;

        this.parseMaterial({
          url: materialUrl,
          resource: resource.material,

          configMap,
          resourceMap,
        });

        // 同步配置
        config.material = configMap.get(materialUrl)!.vid;
      }
    }

    // 解析几何
    if (resource.geometry) {
      const geometryUrl = `${url}.geometry`;

      this.parseGeometry({
        url: geometryUrl,
        resource: resource.geometry,

        configMap,
        resourceMap,
      });

      // 同步配置
      config.geometry = configMap.get(geometryUrl)!.vid;
    }

    // 解析children
    if (resource.children && resource.children.length) {
      resource.children.forEach((object, i, arr) => {
        const objectUrl = `${url}.children.${i}`;

        this.parseObject3D({
          url: objectUrl,
          resource: object,

          configMap,
          resourceMap,
        });

        // 同步配置
        config.children.push(configMap.get(objectUrl)!.vid);
      });
    }
  }
}
