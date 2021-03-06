import "reflect-metadata";
import { GenericConstructor } from "../../shared/generic-constructor";
import { CacheableObject } from "../object-cache.reducer";
import { ResourceType } from "../../shared/resource-type";

const mapsToMetadataKey = Symbol("mapsTo");
const relationshipKey = Symbol("relationship");

const relationshipMap = new Map();

export const mapsTo = function(value: GenericConstructor<CacheableObject>) {
  return Reflect.metadata(mapsToMetadataKey, value);
};

export const getMapsTo = function(target: any) {
  return Reflect.getOwnMetadata(mapsToMetadataKey, target);
};

export const relationship = function(value: ResourceType, isList: boolean = false): any {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target || !propertyKey) {
      return;
    }

    let metaDataList : Array<string> = relationshipMap.get(target.constructor) || [];
    if (metaDataList.indexOf(propertyKey) === -1) {
      metaDataList.push(propertyKey);
    }
    relationshipMap.set(target.constructor, metaDataList);

    return Reflect.metadata(relationshipKey, { resourceType: value, isList }).apply(this, arguments);
  };
};

export const getRelationMetadata = function(target: any, propertyKey: string) {
  return Reflect.getMetadata(relationshipKey, target, propertyKey);
};

export const getRelationships = function(target: any) {
  return relationshipMap.get(target);
};
