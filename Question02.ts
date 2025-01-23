/**
 *
 * 주변에 1이 있는지 확인, 0인경우는 찾지 않는다.
 * 2중포문을 돌면서 1이 나올때마다 bfs를 확인해본다.
 * 2중포문은 값이 1이여야 하고, 방분한 곳이 아니어야 한다.
 *
 * 1. 아이디어
 * - 2중 for => 값이 1 && 방문x
 * - BFS돌면서 위, 오른쪽 위 대각선, 오른쪽, 오른쪽 아래 대각선, 아래, 왼쪽 아래 대각선, 왼쪽, 왼쪽 위 대각선에 1이 있는지 확인한다
 *
 * 2. 시간 복잡도
 * BFS: O(V+E)
 * V = M * N
 * E = 4E
 *
 * 3. 자료구조
 * 그래프 전체지도 : string[][]
 * 방문여부 : boolean[][]
 * Queue(BFS)
 *
 * 방문해야 되는 섬 boolean [][]
 * 이미 갔다온섬 boolean[]
 * 외로운섬 number[]
 *
 * 방문해야 되는 섬[x][y] = true
 * 이미 갔다온섬에 [x][y] 추가
 *
 * 반복문(이미 갔다온 섬의 길이 > 0){
 *
 *  갔다온섬[0] 제거
 *
 * 인접한 섬 확인
 *  반복문 {
 *    아직 방문하지 않았은 섬이고 graph[i]가 1 이라면
 *      방문해야 되는 섬[x][y] = true;
 *      이미 갔다온 섬.push(i)
 *    }
 * }
 *
 */
import * as fs from "fs";

const filePath = "Question01.txt";

const data = fs.readFileSync(filePath, "utf-8");

// 상, 하, 좌, 우, 왼쪽 위, 오른쪽 위, 왼쪽 아래, 오른쪽 아래
const dx = [-1, 1, 0, 0, -1, -1, 1, 1];
const dy = [0, 0, -1, 1, -1, 1, -1, 1];

const [x, y] = data.split("\n")[0].split(" ").map(Number);

// graph 배열을 만들어 각 행을 공백을 기준으로 나누어 문자열 배열로 변환
const graph: string[][] = data
  .split("\n")
  .slice(1, y + 1) // y줄만큼 데이터를 가져옵니다.
  .map((row) => row.split("")); // 각 행을 배열로 변환

let answer: number = 0;

// island 배열을 생성 (크기 y, x)
let island: boolean[][] = Array.from({ length: y }, () =>
  new Array(x).fill(false)
);

// 섬 탐색
for (let i = 0; i < y; i++) {
  for (let j = 0; j < x; j++) {
    // graph[i][j] 값이 존재하는지 확인
    if (graph[i] && graph[i][j] !== undefined) {
      if (graph[i][j] === "1" && !island[i][j]) {
        // 외로운 섬만 확인
        if (bfs(graph, i, j)) {
          answer += 1;
        }
      }
    } else {
      console.log(`graph[${i}][${j}] is undefined!`);
    }
  }
}

console.log(answer);

function bfs(graph: string[][], x: number, y: number): boolean {
  let visitedIsland: boolean[][] = Array.from(
    { length: graph.length }, // y 크기로 배열
    () => new Array(graph[0].length).fill(false) // x 크기로 배열
  ); // 갔다온 섬

  let queue: [number, number][] = [];
  let isLonely = true; // 현재 섬이 외로운 섬인지 확인하는 변수

  queue.push([x, y]);
  visitedIsland[x][y] = true; // 시작섬

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) return false;

    const [currentX, currentY] = current;

    for (let i = 0; i < 8; i++) {
      const nx = currentX + dx[i];
      const ny = currentY + dy[i];

      if (
        nx >= 0 &&
        nx < y &&
        ny >= 0 &&
        ny < x &&
        !visitedIsland[nx][ny] &&
        graph[nx][ny] === "1"
      ) {
        queue.push([nx, ny]);
        visitedIsland[nx][ny] = true;
        isLonely = false; // 연결된 섬이 있으면 외로운 섬 아님
      }
    }
  }

  return isLonely;
}
