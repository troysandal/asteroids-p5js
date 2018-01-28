import {expect} from 'chai'
import {Rectangle} from '../src/Java'

describe('Rectangle', function() {
  describe('intersects', function() {
    it('trivial intersect', function() {
      const r1:Rectangle = new Rectangle(0, 0, 10, 10)
      const r2:Rectangle = new Rectangle(0, 0, 10, 10)

      expect(r1.intersects(r2)).to.equal(true);
    });
  });
});