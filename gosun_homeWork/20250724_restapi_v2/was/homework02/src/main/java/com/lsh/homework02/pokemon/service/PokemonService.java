package com.lsh.homework02.pokemon.service;

import com.lsh.homework02.pokemon.mapper.PokemonMapper;
import com.lsh.homework02.pokemon.vo.PokemonVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PokemonService {

    private final PokemonMapper mapper;

    public int pokemonCenterJoin(PokemonVo vo) {

        return mapper.pokemonCenterJoin(vo);
    }

    public List<PokemonVo> selectPokemonList() {

        return mapper.selectPokemonList();
    }

    public PokemonVo pokemonDetail(String pokemonId) {
        return mapper.pokemonDetail(pokemonId);
    }

    public int updatePokemon(PokemonVo vo) {
        return mapper.updatePokemon(vo);
    }

    public int deletePokemon(String pokemonId) {
        return mapper.deletePokemon(pokemonId);
    }
}
