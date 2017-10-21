/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

This file is part of bluemath.

bluemath is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

bluemath is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with bluemath. If not, see <http://www.gnu.org/licenses/>.

*/

import {nurbs} from '@bluemath/geom'

import {NDArray, AABB} from '@bluemath/common'
import {Renderer} from './renderer'

const RESOLUTION = 100;

function genBezierCurveTess(bezcrv:nurbs.BezierCurve) : NDArray {
  return bezcrv.tessellate(RESOLUTION);
}

function genBezierPlotTraces(bezcrv:nurbs.BezierCurve,axes=['x1','y1']) {
  let tess = bezcrv.tessellateAdaptive(0.01);
  return [
    {
      x: Array.from(tess.getA(':',0).data),
      y: Array.from(tess.getA(':',1).data),
      xaxis : axes[0],
      yaxis : axes[1],
      type : 'scatter',
      mode : 'lines'
    },
    {
      x: Array.from(bezcrv.cpoints.getA(':',0).data),
      y: Array.from(bezcrv.cpoints.getA(':',1).data),
      xaxis : axes[0],
      yaxis : axes[1],
      type : 'scatter',
      mode : 'markers'
    }
  ];
}

function genBSplineCurveTess(bcrv:nurbs.BSplineCurve) {
  return bcrv.tessellate(RESOLUTION);
}

function genBSplinePlotTraces(bcrv:nurbs.BSplineCurve,axes=['x1','y1']) {
  let tess = bcrv.tessellateAdaptive(0.01);
  return [
    {
      x: Array.from(tess.getA(':',0).data),
      y: Array.from(tess.getA(':',1).data),
      xaxis : axes[0],
      yaxis : axes[1],
      type : 'scatter',
      mode : 'lines'
    },
    {
      x: Array.from(bcrv.cpoints.getA(':',0).data),
      y: Array.from(bcrv.cpoints.getA(':',1).data),
      xaxis : axes[0],
      yaxis : axes[1],
      type : 'scatter',
      mode : 'markers'
    }
  ]
}

export class GeometryAdapter {

  constructor(public geom:any, public rndr:Renderer)
  {
    if(geom instanceof nurbs.BezierCurve) {

      if(this.is3D()) {
        let tess = genBezierCurveTess(<nurbs.BezierCurve>geom);
        this.rndr.render3D([{
          line : tess.toArray(),
          points : (<nurbs.BezierCurve>geom).cpoints.toArray()
        }]);
      } else {
        this.rndr.render2D(
          genBezierPlotTraces(<nurbs.BezierCurve>geom),computeRange([geom]));
      }

    } else if(
      geom instanceof nurbs.BSplineCurve ||
      geom instanceof nurbs.LineSegment ||
      geom instanceof nurbs.CircleArc ||
      geom instanceof nurbs.Circle
    ) {
      if(this.is3D()) {
        let tess = genBSplineCurveTess(<nurbs.BSplineCurve>geom);
        this.rndr.render3D([{
          line : tess.toArray(),
          points : (<nurbs.BSplineCurve>geom).cpoints.toArray()
        }]);
      } else {
        this.rndr.render2D(
          genBSplinePlotTraces(<nurbs.BSplineCurve>geom), computeRange([geom]));
      }

    } else if(
      geom instanceof nurbs.BezierSurface ||
      geom instanceof nurbs.BSplineSurface ||
      geom instanceof nurbs.BilinearSurface ||
      geom instanceof nurbs.GeneralCylinder ||
      geom instanceof nurbs.Cylinder
    ) {
      let [nrows,ncols] = (<nurbs.BSplineSurface>geom).cpoints.shape;
      let cpointsArr = (<nurbs.BSplineSurface>geom)
        .cpoints.clone().reshape([nrows*ncols,3]);
      this.rndr.render3D([{
        mesh:(<nurbs.BSplineSurface>geom).tessellate(),
        points:cpointsArr.toArray()
      }]);

    }
  }

  is3D() {
    return this.geom.dimension === 3;
  }
}

function computeRange(
  geoms:Array<nurbs.BezierCurve|nurbs.BSplineCurve|nurbs.BezierSurface|nurbs.BSplineSurface>)
{
  if(geoms[0].dimension === 2) {
    let aabb:AABB|undefined = undefined;
    for(let geom of geoms) {
      if(aabb) {
        (<AABB>aabb).merge(geom.aabb());
      } else {
        aabb = geom.aabb();
      }
    }
    let xmin = aabb!.min.getN(0);
    let ymin = aabb!.min.getN(1);
    let xmax = aabb!.max.getN(0);
    let ymax = aabb!.max.getN(1);
    let xspan = xmax-xmin;
    let yspan = ymax-ymin;
    return {
      x : [xmin-0.1*xspan, xmax+0.1*xspan],
      y : [ymin-0.1*xspan, ymax+0.1*yspan]
    }
  } else {
    throw new Error('TODO');
  }
}
