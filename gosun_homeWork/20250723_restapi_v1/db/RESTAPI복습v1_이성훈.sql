--======================================================
-- 20250723 과제
--======================================================

commit;

-- 테이블 Drop
DROP TABLE BOARD CASCADE CONSTRAINTS;

-- 시퀀스 Drop
DROP SEQUENCE SEQ_BOARD;

-- 시퀀스 생성
CREATE SEQUENCE SEQ_BOARD START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

--=====================================
-- 테이블 생성
-- 과제 04
CREATE TABLE BOARD 
(
    NO                  NUMBER              PRIMARY KEY
    , TITLE             VARCHAR2(100)
    , CONTENT           VARCHAR2(100)
    , CREATED_AT        DATE                DEFAULT SYSDATE
    , MODIFIED_AT       DATE
    , DEL_YN            CHAR(1)             DEFAULT 'N' CHECK(DEL_YN IN ('Y','N'))
)
;

--==========================================================
-- 더미 데이터
INSERT INTO BOARD (NO, TITLE, CONTENT) VALUES (SEQ_BOARD.NEXTVAL, '테스트 게시글 1', '테스트 내용 1');
INSERT INTO BOARD (NO, TITLE, CONTENT) VALUES (SEQ_BOARD.NEXTVAL, '테스트 게시글 2', '테스트 내용 2');
INSERT INTO BOARD (NO, TITLE, CONTENT) VALUES (SEQ_BOARD.NEXTVAL, '테스트 게시글 3', '테스트 내용 3');
INSERT INTO BOARD (NO, TITLE, CONTENT) VALUES (SEQ_BOARD.NEXTVAL, '테스트 게시글 4', '테스트 내용 4');
INSERT INTO BOARD (NO, TITLE, CONTENT) VALUES (SEQ_BOARD.NEXTVAL, '테스트 게시글 5', '테스트 내용 5');
INSERT INTO BOARD (NO, TITLE, CONTENT) VALUES (SEQ_BOARD.NEXTVAL, '테스트 게시글 6', '테스트 내용 6');
INSERT INTO BOARD (NO, TITLE, CONTENT) VALUES (SEQ_BOARD.NEXTVAL, '테스트 게시글 7', '테스트 내용 7');
INSERT INTO BOARD (NO, TITLE, CONTENT) VALUES (SEQ_BOARD.NEXTVAL, '테스트 게시글 8', '테스트 내용 8');
INSERT INTO BOARD (NO, TITLE, CONTENT) VALUES (SEQ_BOARD.NEXTVAL, '테스트 게시글 9', '테스트 내용 9');
INSERT INTO BOARD (NO, TITLE, CONTENT) VALUES (SEQ_BOARD.NEXTVAL, '테스트 게시글 10', '테스트 내용 10');



--==========================================================
-- 쿼리문 모음
-- INSERT
INSERT INTO BOARD
(
    NO
    , TITLE
    , CONTENT
)
VALUES 
(
    SEQ_BOARD.NEXTVAL
    , #{title}
    , #{content}
)
;

-- SELECT LIST
SELECT
    NO
    , TITLE
    , CONTENT
    , CREATED_AT 
    , MODIFIED_AT
    , DEL_YN
FROM BOARD
;


--  SELECT ONE BY NO
SELECT
    NO
    , TITLE
    , CONTENT
    , CREATED_AT 
    , MODIFIED_AT
    , DEL_YN
FROM BOARD
WHERE NO = #{no}
;

-- DELETE
UPDATE BOARD
    SET DEL_YN = 'Y'
WHERE POST_ID = #{no}
;

-- UPDATE
UPDATE BOARD
   SET
      TITLE = #{title}
    , CONTENT = #{content}
    , MODIFIED_AT = SYSDATE
WHERE NO = #{no}
;


