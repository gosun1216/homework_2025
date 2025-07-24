package com.lsh.homework01.board.service;

import com.lsh.homework01.board.mapper.BoardMapper;
import com.lsh.homework01.board.vo.BoardVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final BoardMapper mapper;

    public int insertBoard(BoardVo vo) {

       return mapper.insertBoard(vo);

    }

    public List<BoardVo> selectBoardList() {

        return mapper.selectBoardList();
    }

    public BoardVo selectBoardOne(String no) {
        return mapper.selectBoardOne(no);
    }

    public int deleteBoard(String no) {
        return mapper.deleteBoard(no);
    }

    public int updateBoard(BoardVo vo) {
        return mapper.updateBoard(vo);
    }
}
