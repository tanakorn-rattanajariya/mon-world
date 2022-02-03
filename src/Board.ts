import * as PIXI from "pixi.js";
import naruto from "./naruto.jpg";
import { useState } from "react";
export function useBoard(): Board {
  return useState(() => new Board())[0];
}
export class Board {
  public app: PIXI.Application;
  private static _instance: Board;
  constructor() {
    this.app = new PIXI.Application({
      width: 500,
      height: 500,
      antialias: true,
      transparent: false,
      resolution: 1,
    });
  }
  static getInstance() {
    return this._instance || (this._instance = new this());
  }
}
