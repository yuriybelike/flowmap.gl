/*
 * Copyright 2018 Teralytics
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Feature, FeatureCollection, GeometryObject } from 'geojson';

export interface FlowColors {
  max: string;
  min?: string;
}

export interface LocationCircleColors {
  inner: string;
  outgoing?: string;
  incoming?: string;
}

export interface LocationAreaColors {
  outline: string;
  normal: string;
  selected: string;
  highlighted?: string;
  connected?: string;
}

export interface Colors {
  flows: FlowColors;
  locationCircles?: LocationCircleColors;
  locationAreas: LocationAreaColors;
  dimmedOpacity?: number;
  borderColor?: string;
}

export interface DiffColors {
  positive: {
    flows: FlowColors;
    locationCircles?: LocationCircleColors;
  };
  negative: {
    flows: FlowColors;
    locationCircles?: LocationCircleColors;
  };
  locationAreas: LocationAreaColors;
  dimmedOpacity?: number;
  borderColor?: string;
}

export function isDiffColors(colors: DiffColors | Colors): colors is DiffColors {
  return (colors as DiffColors).positive !== undefined;
}

export type RGBA = [number, number, number, number];

export type Flow = any;

export type LocationProperties = any;

export type Location = Feature<GeometryObject, LocationProperties> | any;

export type Locations = FeatureCollection<GeometryObject, LocationProperties> | Location[];

export function isFeatureCollection(
  locations: Locations,
): locations is FeatureCollection<GeometryObject, LocationProperties> {
  return (locations as FeatureCollection<GeometryObject, LocationProperties>).type === 'FeatureCollection';
}

export const enum LocationCircleType {
  INNER = 'inner',
  OUTER = 'outer',
}

export interface LocationCircle {
  location: Location;
  type: LocationCircleType;
}

export type Data = Flow | Location | LocationCircle;

export const enum PickingType {
  LOCATION = 'location',
  FLOW = 'flow',
  LOCATION_AREA = 'location-area',
}

export type DeckGLLayer = any;

export interface PickingInfo<T> {
  layer: DeckGLLayer;
  index: number;
  object: T;
  x: number;
  y: number;
  lngLat: [number, number];
}

export type PickingHandler<T> = (info: T) => void;

export interface LocationPickingInfo extends PickingInfo<Data> {
  type: PickingType.LOCATION;
  object: Location;
}

export interface LocationAreaPickingInfo extends PickingInfo<Data> {
  type: PickingType.LOCATION_AREA;
  object: Location;
}

export interface FlowPickingInfo extends PickingInfo<Data> {
  type: PickingType.FLOW;
  object: Flow;
}

export type FlowLayerPickingInfo = LocationPickingInfo | LocationAreaPickingInfo | FlowPickingInfo;

export type FlowAccessor<T> = (flow: Flow) => T;
export type LocationAccessor<T> = (location: Location) => T;
export type LocationCircleAccessor<T> = (locCircle: LocationCircle) => T;

export type NumberScale = (value: number) => number;
export type ColorScale = (value: number) => string;
