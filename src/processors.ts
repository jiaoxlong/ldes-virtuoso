import { newEngine } from '@treecg/actor-init-ldes-client';
import { getConfig} from "./config";
import {sparql_insert_query, stringify_quads} from "./utils";
import { Stream, Writer } from "@treecg/connector-types";
import {QueryEngine} from "@comunica/query-sparql"


export async function ldes_stream(configPath: string, ldesOutputWriter: Writer<string>){
    let LDESClient = new newEngine();
    const config = getConfig('../config/config.json')
    let ldes = LDESClient.createReadStream(config.config.url, config.config.options);
    ldes.on('data', async (quads) => {
        console.log(quads.id.value, quads.quads)
        await ldesOutputWriter.push(stringify_quads(quads.quads))
    })
    ldes.on('end', () => {
        console.log("No more data!");
    });
}

export async function sparql_ingest(configPath:string, ldesInputStream: Stream<string>){
    let LDESClient = new newEngine();
    const config = getConfig('../config/config.json')
    ldesInputStream.on('data', async(quadString) =>{
        const query = sparql_insert_query(JSON.parse(config.prefixes), quadString)
        const myEngine = new QueryEngine();
        await myEngine.queryVoid(query)
    })
}




