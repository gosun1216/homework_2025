package com.lsh.homework01.board.vo;

import lombok.Data;

@Data
public class BoardVo {

    private String no;
    private String title;
    private String content;
    private String createdAt;
    private String modifiedAt;
    private String delYn;
}
