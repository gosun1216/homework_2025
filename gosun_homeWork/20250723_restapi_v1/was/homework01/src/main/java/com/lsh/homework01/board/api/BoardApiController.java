package com.lsh.homework01.board.api;

import com.lsh.homework01.board.service.BoardService;
import com.lsh.homework01.board.vo.BoardVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://192.168.20.192:5500")
public class BoardApiController {

    private final BoardService service;

    @PostMapping
    public ResponseEntity<Object> insertBoard(@RequestBody BoardVo vo){
        System.out.println("BoardApiController.insertBoard cell~~~~~~~~~~~~~~~~~~~~~~~");
        int result = service.insertBoard(vo);

        if (result != 1){
            throw new IllegalStateException();
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result)
                ;
    }

    @GetMapping
    public ResponseEntity<List<BoardVo>> selectBoardList(){
        List<BoardVo> voList = service.selectBoardList();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(voList)
                ;
    }

    @GetMapping("/detail/{no}")
    public ResponseEntity<BoardVo> selectBoardOne(@PathVariable String no){

        BoardVo vo = service.selectBoardOne(no);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(vo)
                ;
    }

    @DeleteMapping("{no}")
    public ResponseEntity<Object> deleteBoard(@PathVariable String no){
        int result = service.deleteBoard(no);

        if (result != 1) {
            throw new IllegalStateException();
        }
        return ResponseEntity
                .ok()
                .build()
                ;
    }

    @PutMapping("{no}")
    public ResponseEntity<BoardVo> updateBoard(@PathVariable String no, @RequestBody BoardVo vo){
        vo.setNo(no);

        int result = service.updateBoard(vo);

        if (result != 1){
            throw new IllegalStateException();
        }

        return ResponseEntity
                .ok()
                .body(vo)
                ;
    }

}
