"use strict";

export type Record<T extends string> = {[x in T]: any}

export function controlarNiveles<Keys extends string>(tabla:Record<Keys>[], columnaGrupo:Keys, columnaControlar:Keys){
    return {result:tabla[0][columnaGrupo] != tabla[0][columnaControlar]};
}
