"use strict";
/*jshint eqnull:true */
/*jshint globalstrict:true */
/*jshint node:true */
/*eslint-env node*/
/* global describe */
/* global it */

import {promises as fs} from 'fs';
import { controlarNiveles } from "../..";
import { strict as assert } from 'assert';

async function compareFiles(expectedFileName:string, obtainedFileName:string){
    var expected = await fs.readFile(expectedFileName,'utf8');
    var obtained = await fs.readFile(obtainedFileName,'utf8');
    assert.deepEqual(obtained, expected);
}

console.log(!!compareFiles)

describe('controlarNiveles', function(){
    it('ok de 2 niveles', async function(){
        var tablaOk = [
            {nivel:1, gasto:1234},
            {nivel:2, gasto: 234},
            {nivel:2, gasto:1000},
        ];
        var {result} = controlarNiveles(tablaOk, 'nivel', 'gasto');
        assert.equal(result, true);
    });
});
