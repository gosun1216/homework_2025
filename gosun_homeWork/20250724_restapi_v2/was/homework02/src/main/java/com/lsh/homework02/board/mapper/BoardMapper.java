package com.lsh.homework02.board.mapper;

import com.lsh.homework02.board.vo.BoardVo;
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
                , CATEGORY_NO
            )
            VALUES\s
            (
                SEQ_BOARD.NEXTVAL
                , #{title}
                , #{content}
                , #{categoryNo}
            )
            """)
    int insertBoard(BoardVo vo);

    @Select("""
            SELECT
                B.NO
                , B.TITLE
                , B.CONTENT
                , B.CATEGORY_NO
                , C.CATEGORY_NAME
                , B.CREATED_AT\s
                , B.MODIFIED_AT
                , B.DEL_YN
            FROM BOARD B
            JOIN CATEGORY C ON C.CATEGORY_NO = B.CATEGORY_NO
            WHERE DEL_YN = 'N'
            ORDER BY B.NO DESC
            """)
    List<BoardVo> selectBoardList();


    @Select("""
            SELECT
                B.NO
                , B.TITLE
                , B.CONTENT
                , B.CATEGORY_NO
                , C.CATEGORY_NAME
                , B.CREATED_AT\s
                , B.MODIFIED_AT
                , B.DEL_YN
            FROM BOARD B
            JOIN CATEGORY C ON C.CATEGORY_NO = B.CATEGORY_NO
            WHERE B.NO = #{no}
            AND B.DEL_YN = 'N'
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
            AND DEL_YN = 'N'
            """)
    int updateBoard(BoardVo vo);
}
