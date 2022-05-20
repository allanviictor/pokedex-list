import './styleList.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

let url: string  = 'https://pokeapi.co/api/v2/pokemon'

interface PokemonList {
    name:string,
    url:string
}

export function ListPokemon(){

    let [pokemonList,setPokemonList] = useState<PokemonList[]>([])
    let [nextPage,setNextPage] = useState('')
    let [prevPage,setPrevPage] = useState('')

    async function getPokemon(url:string){
        
        await axios.get(url)
        .then( response => {
            console.log('result',response.data)
            setPokemonList(response.data.results)
            setNextPage(response.data.next)
            setPrevPage(response.data.previous)
        })
    
    }

    function nextPageList(){
        if(nextPage === null){
            return ''
        }else {
            getPokemon(nextPage)
        }
        
    }

    function prevPageList(){
        if(prevPage === null){
            return ''
        }else {
            getPokemon(prevPage)
        }
    }

    useEffect(()=> {
        
        getPokemon(url)
    },[])
    

    return(
        <>
            <div className="wrapper">
                <div className="container">
                    <ul>

                        {
                            pokemonList.map((item, index) => {
                                return (
                                    <li key={index}>{item.name}</li>
                                )
                            })
                        }
                    </ul>
                    <div className="buttons">
                        <button onClick={prevPageList} type="button">Anterior</button>
                        <button onClick={nextPageList} type="button">Proxima</button>
                    </div>
                </div>
            </div>
        </>
    );
}