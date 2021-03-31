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

export type RowGasto={codigo1:string, codigo:string, w:number, repartoNivel:number|null, repartoCodigo:string|null};
export type RowReparto={codigo:string, wr:number}
export function repartirPonderaciones(tabla:RowGasto[]):RowReparto[]{
    var resultado:RowReparto[] = [];
    var montoARepartir:{[k in string]: number} = {};
    var sumaSeleccionada:{[k in string]: number} = {};
    for(var row of tabla){
        if(row.repartoNivel != null){
            montoARepartir[row.codigo1] = (montoARepartir[row.codigo1]??0) + row.w;
        }else{
            sumaSeleccionada[row.codigo1] = (sumaSeleccionada[row.codigo1]??0) + row.w
        }
    }
    for(var row of tabla){
        if(row.repartoNivel == null){
            var wRepartir = 0
            if( sumaSeleccionada[row.codigo1] != null){
                wRepartir = row.w * (montoARepartir[row.codigo1]??0) / sumaSeleccionada[row.codigo1]
            }
            resultado.push({codigo:row.codigo, wr:row.w + wRepartir});
        }
    }
    return resultado;
}