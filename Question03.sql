

/**
문제 : MySQL 또는 PostgreSQL을 사용하여 여러 단계의 승인 및 반려가 가능한 결제 시스템을 구축하는 시나리오에서,
1. 필요한 테이블을 최소로 정의해 주세요.
2. 특정 사용자가 처리해야 할 결제건을 나열하는 query를 작성해주세요

*/

SELECT approval_id, approval.progress_date, approval.comment, approval.draft_id, approval.next_approver, approval.status
from school.approval
join school.draft on approval.draft_id = draft.draft_id
where approval.next_approver = :user_id
and approval.status = 'pending';


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



