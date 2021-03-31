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
            {nivel:0, gasto:1234},
            {nivel:1, gasto: 234},
            {nivel:1, gasto:1000},
        ];
        var {result} = controlarNiveles(tablaOk, 'nivel', 'gasto');
        assert.equal(result, true);
    });
    it('no suma de 2 niveles', async function(){
        var tablaOk = [
            {nivel:0, gasto:1234},
            {nivel:1, gasto: 234},
            {nivel:1, gasto: 777},
        ];
        var {result} = controlarNiveles(tablaOk, 'nivel', 'gasto');
        assert.equal(result, false);
    });
    it('no suma con 4 niveles', async function(){
        var tablaOk = [
            {nivel:0, gasto:1234},
            {nivel:1, gasto: 234},
            {nivel:1, gasto:1000},
            {nivel:2, gasto: 234},
            {nivel:2, gasto: 750},
            {nivel:2, gasto: 250},
            {nivel:3, gasto: 234},
            {nivel:3, gasto: 500},
            {nivel:3, gasto: 100},
            {nivel:3, gasto: 250},
        ];
        var {result, error} = controlarNiveles(tablaOk, 'nivel', 'gasto');
        assert.equal(result, false);
        assert.equal(error, "el nivel 3 debía sumar 1234 y suma 1084");
    });
});
