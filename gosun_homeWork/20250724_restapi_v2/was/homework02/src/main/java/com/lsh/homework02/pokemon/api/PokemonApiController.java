package com.lsh.homework02.pokemon.api;

import com.lsh.homework02.pokemon.service.PokemonService;
import com.lsh.homework02.pokemon.vo.PokemonVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/pokemon")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://192.168.20.192:5501")
public class PokemonApiController {

    private final PokemonService service;

    @PostMapping
    public ResponseEntity<Integer> pokemonCenterJoin(@RequestBody PokemonVo vo){

        int result = service.pokemonCenterJoin(vo);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }

    @GetMapping
    public ResponseEntity<List<PokemonVo>> selectPokemonList() {
       List<PokemonVo> voList =  service.selectPokemonList();
       return ResponseEntity
               .status(HttpStatus.OK)
               .body(voList);
    }

    @GetMapping("detail/{pokemonId}")
    public ResponseEntity<PokemonVo> pokemonDetail(@PathVariable String pokemonId) {

        PokemonVo vo = service.pokemonDetail(pokemonId);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(vo)
                ;
    }

    @PutMapping("{pokemonId}")
    public ResponseEntity<PokemonVo> updatePokemon(@PathVariable String pokemonId, @RequestBody PokemonVo vo){
        vo.setPokemonId(pokemonId);
        int result = service.updatePokemon(vo);

        if(result != 1){
            throw new IllegalStateException();
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(vo)
                ;
    }

    @DeleteMapping("{pokemonId}")
    public ResponseEntity<Object> deletePokemon(@PathVariable String pokemonId){

        int result = service.deletePokemon(pokemonId);

        if (result != 1) {
            throw new IllegalStateException();
        }
        return ResponseEntity
                .ok()
                .build()
                ;

    }

}
