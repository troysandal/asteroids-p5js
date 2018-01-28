import {max, min} from 'lodash'

class RectangleLRTB {
  public left:number;
  public right:number;
  public top:number;
  public bottom:number;

  constructor(other:Rectangle) {
    this.left = other.x
    this.right = other.x + other.width
    this.top = other.y
    this.bottom = other.y + other.height
  }

  intersects(other) {
    const notHorizontal = (this.right < other.left) || (this.left > other.right);
    const notVertical = (this.top > other.bottom) || (this.bottom < other.top);
    const noIntersection = notHorizontal || notVertical;
    return !noIntersection;
  }
}

export class Rectangle {
  public x:number;
  public y:number;
  public width:number;
  public height:number;

  constructor(x:number, y:number, w:number, h:number) {
    this.x = x
    this.y = y
    this.width = w
    this.height = h
  }

  intersects(other: Rectangle):boolean {
    const me = new RectangleLRTB(this)
    const them = new RectangleLRTB(other)

    return me.intersects(them)
  }

  translate(x: number, y:number) {
    this.x += x
    this.y += y
  }
}

export class Polygon {
  public npoints:number
  public xpoints:number[]
  public ypoints:number[]

  constructor(xpoints:number[] = [], ypoints:number[] = [], npoints:number = 0) {
    this.xpoints = xpoints
    this.ypoints = ypoints
    this.npoints = npoints
  }

  addPoint(x:number, y:number) {
    this.xpoints.push(x)
    this.ypoints.push(y)
    this.npoints++
  }

  private size():Dimension {
    return new Dimension(
      max(this.xpoints) - min(this.xpoints),
      max(this.ypoints) - min(this.ypoints)
    );
  }

  public getBounds(): Rectangle {
    const bounds = this.size()
    return new Rectangle(
       min(this.xpoints),
       min(this.ypoints),
       bounds.width,
       bounds.height
    );
  }
}

export class Dimension {
  public width:number
  public height:number

  constructor(width:number, height:number) {
    this.width = width
    this.height = height
  }
}

export class Point {
  public x:number
  public y:number

  constructor(x:number, y:number) {
    this.x = x
    this.y = y
  }
}

export function randomRange(from:number, to:number) {
  return from + (Math.random() * (to - from))
}

export function randomRangeInt(from:number, to:number) {
  return Math.round(randomRange(from, to))
}

