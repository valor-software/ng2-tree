export enum Keys {
  Escape = 27
}

export enum MouseButtons {
  Left = 0,
  Right = 2
}

export function isLeftButtonClicked(e: MouseEvent): boolean {
  return e.button === MouseButtons.Left;
}

export function isRightButtonClicked(e: MouseEvent): boolean {
  return e.button === MouseButtons.Right;
}

export function isEscapePressed(e: KeyboardEvent): boolean {
  return e.keyCode === Keys.Escape;
}
