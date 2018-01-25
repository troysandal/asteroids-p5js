export class Rectangle {
  public width:number;
  public height:number;

  constructor(x, y, w, h) { }

  intersects(other: Rectangle):boolean {
    throw "TBD"
  }
}

export class Polygon {
  public npoints:number
  public xpoints:number[]
  public ypoints:number[]

  constructor(xpoints:number[] = [], ypoints:number[] = [], npoints:number = 0) {
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

