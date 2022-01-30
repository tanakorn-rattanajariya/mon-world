import * as PIXI from "pixi.js";
import naruto from "./naruto.jpg";
import { useState } from "react";
export function useBoard(): Board {
  return useState(() => new Board())[0];
}
class Board {
  public app: PIXI.Application;
  constructor() {
    this.app = new PIXI.Application({
      width: 500,
      height: 500,
      antialias: true,
      transparent: false,
      resolution: 1,
    });
  }
  public run() {
    this.app.loader.add("bunny", naruto).load((loader, resources) => {
      // This creates a texture from a 'bunny.png' image
      const bunny = new PIXI.Sprite(resources.bunny.texture);

      // Setup the position of the bunny
      bunny.x = this.app.renderer.width / 2;
      bunny.y = this.app.renderer.height / 2;

      // Rotate around the center
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;

      // Add the bunny to the scene we are building
      this.app.stage.addChild(bunny);

      // Listen for frame updates
      this.app.ticker.add(() => {
        // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
      });
    });
  }
}
