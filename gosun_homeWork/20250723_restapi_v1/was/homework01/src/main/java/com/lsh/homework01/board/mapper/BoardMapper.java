package com.lsh.homework01.board.mapper;

import com.lsh.homework01.board.vo.BoardVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface BoardMapper {

    @Insert("""
            INSERT INTO BOARD
            (
                NO
                , TITLE
                , CONTENT
            )
            VALUES\s
            (
                SEQ_BOARD.NEXTVAL
                , #{title}
                , #{content}
            )
            """)
    int insertBoard(BoardVo vo);

    @Select("""
            SELECT
                NO
                , TITLE
                , CONTENT
                , CREATED_AT\s
                , MODIFIED_AT
                , DEL_YN
            FROM BOARD
            WHERE DEL_YN = 'N'
            """)
    List<BoardVo> selectBoardList();


    @Select("""
            SELECT
                NO
                , TITLE
                , CONTENT
                , CREATED_AT\s
                , MODIFIED_AT
                , DEL_YN
            FROM BOARD
            WHERE NO = #{no}
            """)
    BoardVo selectBoardOne(String no);

    @Update("""
            UPDATE BOARD
                SET DEL_YN = 'Y'
            WHERE NO = #{no}
            """)
    int deleteBoard(String no);

    @Update("""
            UPDATE BOARD
               SET
                  TITLE = #{title}
                , CONTENT = #{content}
                , MODIFIED_AT = SYSDATE
            WHERE NO = #{no}
            """)
    int updateBoard(BoardVo vo);
}
