"use strict";
/*jshint eqnull:true */
/*jshint globalstrict:true */
/*jshint node:true */
/*eslint-env node*/
/* global describe */
/* global it */

import {promises as fs} from 'fs';
import { controlarNiveles, repartirPonderaciones } from "../..";
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


describe('repartirPonderaciones', function(){
    it('reparto bien simple', async function(){
        var tabla=[
            {codigo1:'A01', codigo:'A011111', w:0.5, repartoNivel:null, repartoCodigo:null },
            {codigo1:'A01', codigo:'A011112', w:0.3, repartoNivel:null, repartoCodigo:null },
            {codigo1:'A01', codigo:'A011113', w:0.2, repartoNivel:1   , repartoCodigo:'A01'},
            {codigo1:'A02', codigo:'A022222', w:0.1, repartoNivel:null, repartoCodigo:null }
        ];
        var obtenido = repartirPonderaciones(tabla);
        var esperado = [
            {codigo:'A011111', wr:0.5 + 0.2 * 0.5 / 0.8},
            {codigo:'A011112', wr:0.3 + 0.2 * 0.3 / 0.8},
            {codigo:'A022222', wr:0.1},
        ];
        assert.deepEqual(obtenido, esperado)
    });
});
