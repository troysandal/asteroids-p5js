import hello from './hello'
import {map} from 'lodash'

console.log(hello())

const x = [1,2,3]
console.log(x)
const squares = map(x, v => v*v )
console.log(squares)
