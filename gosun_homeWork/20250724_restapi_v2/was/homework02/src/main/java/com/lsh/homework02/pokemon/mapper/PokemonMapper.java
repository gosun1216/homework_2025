package com.lsh.homework02.pokemon.mapper;

import com.lsh.homework02.pokemon.vo.PokemonVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface PokemonMapper {


    @Insert("""
            INSERT INTO POKEMON\s
            (
                POKEMON_ID
                , NICKNAME
                , POKEMON_LEVEL
                , SPECIES_ID
                , TRAINER_ID
            )
            VALUES\s
            (
                SEQ_POKEMON.NEXTVAL
                , #{nickname}
                , #{pokemonLevel}
                , #{speciesId}
                , #{trainerId}
            )
            """)
    int pokemonCenterJoin(PokemonVo vo);


    @Select("""
            SELECT\s
                P.POKEMON_ID
                , P.NICKNAME
                , P.POKEMON_LEVEL
                , P.SPECIES_ID
                , S.NAME
                , S.TYPE
                , P.TRAINER_ID
                , T.TRAINER_NAME
                , P.CAUGHT_AT
                , P.MODIFIED_AT
            FROM POKEMON P
            JOIN POKEMON_SPECIES S ON P.SPECIES_ID = S.SPECIES_ID
            JOIN POKEMON_TRAINER T ON P.TRAINER_ID = T.TRAINER_ID
            WHERE P.DEL_YN = 'N'
            ORDER BY P.POKEMON_ID
            """)
    List<PokemonVo> selectPokemonList();

    @Select("""
            SELECT\s
                P.POKEMON_ID
                , P.NICKNAME
                , P.POKEMON_LEVEL
                , P.SPECIES_ID
                , S.NAME
                , S.TYPE
                , P.TRAINER_ID
                , T.TRAINER_NAME
                , P.CAUGHT_AT
                , P.MODIFIED_AT
            FROM POKEMON P
            JOIN POKEMON_SPECIES S ON P.SPECIES_ID = S.SPECIES_ID
            JOIN POKEMON_TRAINER T ON P.TRAINER_ID = T.TRAINER_ID
            WHERE P.POKEMON_ID = #{pokemonId}
            AND P.DEL_YN = 'N'
            """)
    PokemonVo pokemonDetail(String pokemonId);

    @Update("""
            UPDATE POKEMON
            SET\s
                NICKNAME = #{nickname}
                , POKEMON_LEVEL = #{pokemonLevel}
                , SPECIES_ID = #{speciesId}
                , TRAINER_ID = #{trainerId}
                , MODIFIED_AT = SYSDATE
            WHERE POKEMON_ID = #{pokemonId}
            AND DEL_YN = 'N'
            """)
    int updatePokemon(PokemonVo vo);


    @Update("""
            UPDATE POKEMON
            SET
                DEL_YN = 'Y'
            WHERE POKEMON_ID = #{pokemonId}
            """)
    int deletePokemon(String pokemonId);
}
