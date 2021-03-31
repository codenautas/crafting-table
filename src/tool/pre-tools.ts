"use strict";

export type Record<T extends string> = {[x in T]: any}

export function controlarNiveles<Keys extends string>(tabla:Record<Keys>[], columnaGrupo:Keys, columnaControlar:Keys){
    var sumadores:number[] = []
    for(var row of tabla){
        var valorAControlar = row[columnaControlar];
        var grupoDelaRow = row[columnaGrupo];
        if(sumadores[grupoDelaRow] == null){
            sumadores[grupoDelaRow] = 0;
        }
        sumadores[grupoDelaRow] = sumadores[grupoDelaRow] + valorAControlar;
    }
    var sumaNivel0 = sumadores[0];
    for(var nivelActual in sumadores){
        var sumaEsteNivel = sumadores[nivelActual];
        if(sumaEsteNivel != sumaNivel0){
            return {result:false, error:'el nivel '+nivelActual+' debía sumar '+sumaNivel0+' y suma '+sumaEsteNivel}
        }
    }
    return {
        result:true
    };
}
