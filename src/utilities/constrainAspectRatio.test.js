import * as testing from './constrainAspectRatio.js';

describe('constrainAspectRatio.test', () => {
  it('constrains aspect ratios accurately', () => {
    expect(testing.constrainAspectRatio({ width: 10, height: 10 }, { width: 2, height: 2 })).toEqual({ width: 10, height: 10 });
    expect(testing.constrainAspectRatio({ width: 10, height: 10 }, { width: 20, height: 10 })).toEqual({ width: 10, height: 5 });
    expect(testing.constrainAspectRatio({ width: 10, height: 10 }, { width: 100, height: 100 })).toEqual({ width: 10, height: 10 });
    expect(testing.constrainAspectRatio({ width: 10, height: 10 }, { width: 1, height: 5 })).toEqual({ width: 2, height: 10 });
    expect(testing.constrainAspectRatio({ width: 0, height: 0 }, { width: 0, height: 0 })).toEqual({ width: 0, height: 0 });
    expect(testing.constrainAspectRatio({ width: 0, height: 0 }, { width: 199123, height: 124555 })).toEqual({ width: 0, height: 0 });
    expect(testing.constrainAspectRatio({ width: 100, height: 100 }, { width: 0, height: 0 })).toEqual({ width: 0, height: 0 });
    expect(testing.constrainAspectRatio({ width: 100, height: 100 }, { width: 50, height: 0 })).toEqual({ width: 0, height: 0 });
    expect(testing.constrainAspectRatio({ width: 0, height: 100 }, { width: 50, height: 50 })).toEqual({ width: 0, height: 0 });
  });
});
