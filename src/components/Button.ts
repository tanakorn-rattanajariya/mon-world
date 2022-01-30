import { ListenerFn } from "@pixi/utils/node_modules/eventemitter3";
import { Text, Sprite, Texture } from "pixi.js";
interface IButton {
  text: string;
  x: number;
  y: number;
  color?: number;
  fontSize?: number;
  onClick?: ListenerFn;
}
export default function Button(props: IButton) {
  const { text, x, y, color, fontSize, onClick } = props;
  const button = new Text(text, {
    fill: color || 0xffffff,
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 440,
    fontSize: fontSize || 20,
  });
  button.x = x;
  button.y = y;
  onClick && button.addListener("click", onClick);

  button.interactive = true;
  button.buttonMode = true;
  button.interactive = true;
  return button;
}
