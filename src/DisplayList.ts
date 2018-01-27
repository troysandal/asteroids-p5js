import {remove, concat} from 'lodash'

import DisplayObject from './DisplayObject'
import FlyingObject from './FlyingObject'
import { Globals } from './Globals'

export default class DisplayList {
    private objects/*:List*/ = []

    public iterator() {
        return this.objects
    }

    add(o:DisplayObject) {
        this.objects.push(o);
    }

    public update() {
        for (const fo of this.objects) {
            fo.update({add:(o) =>{this.objects.push(o)}});
        }
    }

    public hitTest() {
        // Compare all pairs
        //ListIterator lit = objects.listIterator(0);
        const newObjects = []
        let l:FlyingObject
        let r:FlyingObject

        if (!Globals.noHit) {
            for(let i = 0 ; i < this.objects.length ; i++) {
                let x = this.objects[i]
                if (!(x instanceof FlyingObject)) {
                    continue
                };

                const l:FlyingObject = x as FlyingObject;
                if (l.remove) {
                    continue
                };

                for (let j = i + 1 ; j < this.objects.length ; j++) {
                    x = this.objects[i]
                    if (!(x instanceof FlyingObject)) {
                        continue
                    };

                    const r:FlyingObject = x;
                    if (r.remove) {
                        continue
                    };

                    if (l.intersects(r)) {
                        l.collide(r, newObjects);
                        r.collide(l, newObjects);
                        break;
                    }
                }
            }
        }

        // Remove dead objects.

        remove(this.objects, (fo) => fo.remove);

        // Add new objects.
        this.objects = concat(this.objects, newObjects)
    }
}