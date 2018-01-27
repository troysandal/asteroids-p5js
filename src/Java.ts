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
    // TODO
    throw "TBD"
  }

  translate(x: number, y:number) {
    // TODO
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
  }

  getBounds(): Rectangle {
    return new Rectangle(0,0,0,0)
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

