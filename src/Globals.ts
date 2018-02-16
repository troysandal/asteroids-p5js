import Sounds from './Sounds';

export const KEY_LEFT:number = 37;
export const KEY_UP:number = 38;
export const KEY_RIGHT:number = 39;
export const KEY_DOWN:number = 40;
export const KEY_SPACE:number = 32;
export const KEY_CTRL:number = 17;

export const EXPLODE_BIG = 2;
export const EXPLODE_MEDIUM = 1;
export const EXPLODE_SMALL = 0;

export class Globals {
  public static p
  public static noSound: boolean
  public static noHit:boolean
  public static game
  public static fontA
  public static sounds: Sounds
}