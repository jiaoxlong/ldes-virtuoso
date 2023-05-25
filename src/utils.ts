import * as n3 from "n3";
export function stringify_quads(quads: n3.Quad[]): string {
    return new n3.Writer().quadsToString(quads);
}

export function sparql_insert_query (prefixes:{[key:string]: any}, quadString:string){
    let prefix = ''
    for (const k in prefixes){
        prefix += `PREFIX ${k}: ${prefixes[k]} \r\n`
    }
    let insert = 'INSERT \r\n{ ${quadString} }'
    return prefix + insert
}


