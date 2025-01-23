/*
sql enum colunm https://feastforall.tistory.com/215
varchar 와 text https://medium.com/daangn/varchar-vs-text-230a718a22a1
*/

Table draft {
  id integer [primary key, auto increment]
  user_id integer
  title varchar
  contents varchar
  draft_number varchar
  status enum ('pending','approval','reject')
  created_at timestamp 
  approver integer  
  FOREIGN KEY (user_id) REFERENCES users(id),
}

/**
id 기안서 저장번호 autoIncrement 
user_id 작성자 id 
title 기안서 제목
contents 기안서 내용
draft_number 기안서 작성번호
status 기안서 상태(진행중, 승인, 거절)
created_at 생성일
approver 최초 승인자
**/

Table users {
  id integer [primary key, auto increment]
  username varchar
  password varchar
  role enum ('employee','team_leader','assistant_manager','manager','department_header') 
  created_at timestamp
}

/**
id 사용자 생성번호 autoIncrement
username 사용자 이름
password 비밀번호
role 직급('employee','team_leader','assistant_manager','manager','department_header')
created_at 생성일
**/

Table approval {
  id integer [primary key, auto increment]
  draft_id integer 
  status enum('pending', 'approval', 'reject')
  progress_date timestamp
  comment varchar 
  approver_id integer 
  next_approvaler integer
  FOREIGN KEY (draft_id) REFERENCES draft(id),
  FOREIGN KEY (approver_id) REFERENCES users(id)
}
/**
id 승인 번호 autoIncrement 
progress_date  승인 or 반려일
comment 승인 반려시 남기는 말
user_id 승인자
next_approvaler 다음 결제자
**/


 /*
 관계설정
 users와 draft는 1 대 n 관계입니다. 
 draft와 approval은 1 대 n 관계입니다.
 */


-- user 생성 query 예시
-- insert into school.users(username, password,role)
-- value ('대리2','password1234','assistant_manager');


-- draft 작성 쿼리  예시
-- insert into school.draft(title, contents, created_at, drafat_number, draft_status, user_id, approver)
-- values ('기안서1', '기안서1 내용', '2025-01-21','2025-0121-0001','pending',1,2);
/*
draft.approver는 최초의 승인자가 누군인지 알려주는 column입니다. 
*/

-- approval 작성쿼리  예시
-- insert into school.approval(progress_date,comment, approver_user, draft_id, next_approver,status)
-- values('2025-01-21','결제완료',2,2,3,'pending');

-- 마지막 결제 승인자 예시
-- insert into school.approval(progress_date,comment, approver_user, draft_id, next_approver,status)
-- values('2025-01-21','승인완료',2 , 2, null, 'approval');

-- reject 작성쿼리  예시
-- insert into school.approval(progress_date,comment, approver_user, draft_id, next_approver,status)
-- values('2025-01-21','승인거절',2 , 2, 1, 'reject');

