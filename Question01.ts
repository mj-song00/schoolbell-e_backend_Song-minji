//1,3,5,7,9 숫자를 각각 한번씩만 사용하여 만들 수 있는 두 개의 숫자(예: 13, 579) 중에서, 곱이 가장 큰 조합을 찾는 스크립트를 작성해주세요

//1. 2자릿수 숫자 (num1), 3자릿수 숫자(num2) 조합구하기
//2. 최댓값(max) == 0
//3. 반복문
//   i=0; i< list길이까지, i++
//     j=0; j < list길이까지 j++
//      만약 towDigits[i] * threeDigitis[j] > Max
//       Max = towDigits[i] * threeDigitis[j]
//   return Max;
import * as fs from "fs";

const filePath = "Question01.txt";

const data = fs.readFileSync(filePath, "utf-8");

const numbers = data.split(",").map((num) => parseInt(num.trim(), 10));

const result = findMax(numbers);
console.log(`result : ${result.num1}, ${result.num2}`);

function findMax(list: number[]): { num1: number; num2: number } {
  let max: number = 0;
  let maxNum1 = 0;
  let maxNum2 = 0;

  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (i !== j) {
        //두자릿수 숫자 만들기
        const num1: number = parseInt(list[i].toString() + list[j].toString());

        //세자리 숫자 만들기
        const threeDigitis: any = list
          .filter((_, index) => index !== i && index !== j) //filter callback 함수에서 element 제외
          .join("");
        const num2 = parseInt(threeDigitis);

        const multi = num1 * num2;

        if (multi > max) {
          max = multi;
          maxNum1 = num1;
          maxNum2 = num2;
        }
      }
    }
  }
  return { num1: maxNum1, num2: maxNum2 };
}
