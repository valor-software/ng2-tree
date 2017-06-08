import * as EventUtils from '../../src/utils/event.utils';

describe('EventUtils', () => {
  it('should detect whether escape was pressed', () => {
    const escEvent: KeyboardEvent = {
      keyCode: EventUtils.Keys.Escape
    } as KeyboardEvent;

    const notEscEvent: KeyboardEvent = {
      keyCode: 42
    } as KeyboardEvent;

    expect(EventUtils.isEscapePressed(escEvent)).toBe(true);
    expect(EventUtils.isEscapePressed(notEscEvent)).toBe(false);
  });

  it('should detect mouse right and left button clicks', () => {
    const leftEvent: MouseEvent = {
      button: EventUtils.MouseButtons.Left
    } as MouseEvent;

    const rightEvent: MouseEvent = {
      button: EventUtils.MouseButtons.Right
    } as MouseEvent;

    expect(EventUtils.isLeftButtonClicked(leftEvent)).toBe(true);
    expect(EventUtils.isLeftButtonClicked(rightEvent)).toBe(false);

    expect(EventUtils.isRightButtonClicked(rightEvent)).toBe(true);
    expect(EventUtils.isRightButtonClicked(leftEvent)).toBe(false);
  });

  it('should have correct Keys bindings', () => {
    expect(EventUtils.Keys.Escape).toEqual(27);
  });

  it('should have correct MouseButtons bindings', () => {
    expect(EventUtils.MouseButtons.Left).toEqual(0);
    expect(EventUtils.MouseButtons.Right).toEqual(2);
  });
});
