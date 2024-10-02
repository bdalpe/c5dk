import {Cribl} from "../lib/cribl";
import {Variable} from "../lib/cribl/objects/variable";

const cribl = new Cribl();
new Variable(cribl, 'test', {type: 'expression', value: 'test'});
cribl.synth();


// Container node
// path prefix
