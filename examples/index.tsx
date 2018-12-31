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

import { storiesOf } from '@storybook/react';
import * as React from 'react';
import FlowMapLayer from '../src';
import CitibikeExample from './CitibikeExample';
import { fitFeaturesInView } from './fitInView';
import { pipe, withFetchJson, withStats } from './hocs';
import InteractiveExample from './InteractiveExample';
import StaticExample from './StaticExample';

export const mapboxAccessToken = process.env.MapboxAccessToken || '';

storiesOf('FlowMapLayer', module)
  .add(
    'non-interactive',
    pipe(
      withStats,
      withFetchJson('locations', '/data/locations.json'),
      withFetchJson('flows', '/data/flows-2016.json'),
    )(({ locations, flows }: any) => (
      <StaticExample
        flows={flows}
        locations={locations}
        initialViewState={fitFeaturesInView(locations, [window.innerWidth, window.innerHeight])}
        mapboxAccessToken={mapboxAccessToken}
      />
    )),
  )
  .add(
    'interactive',
    pipe(
      withStats,
      withFetchJson('locations', '/data/locations.json'),
      withFetchJson('flows', '/data/flows-2016.json'),
    )(({ locations, flows }: any) => (
      <InteractiveExample
        showTotals={true}
        showLocationAreas={true}
        flows={flows}
        locations={locations}
        initialViewState={fitFeaturesInView(locations, [window.innerWidth, window.innerHeight])}
        mapboxAccessToken={mapboxAccessToken}
      />
    )),
  )
  .add(
    'no location areas',
    pipe(
      withStats,
      withFetchJson('locations', '/data/locations.json'),
      withFetchJson('flows', '/data/flows-2016.json'),
    )(({ locations, flows }: any) => (
      <InteractiveExample
        showTotals={true}
        showLocationAreas={false}
        flows={flows}
        locations={locations}
        initialViewState={fitFeaturesInView(locations, [window.innerWidth, window.innerHeight])}
        mapboxAccessToken={mapboxAccessToken}
      />
    )),
  )
  .add(
    'no totals',
    pipe(
      withStats,
      withFetchJson('locations', '/data/locations.json'),
      withFetchJson('flows', '/data/flows-2016.json'),
    )(({ locations, flows }: any) => (
      <InteractiveExample
        showTotals={false}
        showLocationAreas={true}
        flows={flows}
        locations={locations}
        initialViewState={fitFeaturesInView(locations, [window.innerWidth, window.innerHeight])}
        mapboxAccessToken={mapboxAccessToken}/>
  )))
  .add(
    'custom borders',
    pipe(
      withStats,
      withFetchJson('locations', '/data/locations.json'),
      withFetchJson('flows', '/data/flows-2016.json'),
    )(({ locations, flows }: any) => (
      <InteractiveExample
        showTotals={true}
        showLocationAreas={true}
        flows={flows}
        locations={locations}
        initialViewState={fitFeaturesInView(locations, [window.innerWidth, window.innerHeight])}
        borderThickness={5}
        borderColor="#64e9f9"
        mapboxAccessToken={mapboxAccessToken}
      />
    )),
  )
  .add(
    'diff',
    pipe(
      withStats,
      withFetchJson('locations', '/data/locations.json'),
      withFetchJson('flows', '/data/flows-diff-2015-2016.json'),
    )(({ locations, flows }: any) => (
      <InteractiveExample
        showTotals={true}
        showLocationAreas={true}
        flows={flows}
        diff={true}
        locations={locations}
        initialViewState={fitFeaturesInView(locations, [window.innerWidth, window.innerHeight])}
        mapboxAccessToken={mapboxAccessToken}
      />
    )),
  )
  .add('perf test (NYC citibike)', () => <CitibikeExample />);
