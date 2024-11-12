<template>
  <div class="background">
    <h1>计算器喵</h1>
    <div class="body">
      <input class="input" type="string" placeholder="请输入表达式" v-model="the_input" @keypress="onKeyPress">
      <div class="cal">
        <el-row style="width: 100%;height: 100%;" :gutter="20">
          <el-col :span="16">
            <h3>运算符</h3>
            <div class="sign">
              <el-button class="sig" type="primary" plain v-for="item in ['AC', '+', '-', '*', '/', '(', ')', '=']"
                :key="item" @click="input(item)">{{ item }}</el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <h3>数字</h3>
            <div class="number">
              <el-button class="num" type="primary" plain v-for="item in 9" :key="item"
                @click="input(item.toString())">{{ item
                }}</el-button>
            </div>
          </el-col>

        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isNumber } from 'element-plus/es/utils/types.mjs';
import { ref } from 'vue';
const the_input = ref('');
const onKeyPress = (event) => {
  if (event.key === 'Enter') {
    input('=');
  }
};

function infixToPostfix(expression: string): string {
  const output: string[] = [];
  const operators: string[] = [];
  const precedence: { [key: string]: number } = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  // 使用正则表达式分割数字与运算符，支持没有空格的输入
  const tokens = expression.match(/\d+|[+\-*/()]/g);
  if (!tokens) return "";

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (!isNaN(Number(token))) {
      output.push(token);
    } else if (token === '(') {
      operators.push(token);
    } else if (token === ')') {
      while (operators.length && operators[operators.length - 1] !== '(') {
        output.push(operators.pop()!);
      }
      operators.pop();
    } else if (precedence[token]) {
      // 如果是 '-' 符号，判断前一个 token
      if (token === '-' && (i === 0 || "(".includes(tokens[i - 1]))) {
        // 负数处理
        const nextToken = tokens[i + 1];
        if (nextToken && !isNaN(Number(nextToken))) {
          output.push(`-${nextToken}`);
          i++; // 跳过下一个数字，因为已经处理过
          continue;
        }
      } else if (token === '-' && "+-*/".includes(tokens[i - 1])) {
        // '-' 作为运算符处理
        while (
          operators.length &&
          operators[operators.length - 1] !== '(' &&
          (precedence[operators[operators.length - 1]]! >= precedence[token])
        ) {
          output.push(operators.pop()!);
        }
        operators.push(token);
      } else {
        while (
          operators.length &&
          operators[operators.length - 1] !== '(' &&
          (precedence[operators[operators.length - 1]]! >= precedence[token])
        ) {
          output.push(operators.pop()!);
        }
        operators.push(token);
      }
    }
  }

  while (operators.length) {
    output.push(operators.pop()!);
  }
  console.log(output.join(' '));

  return output.join(' ');
}
function evaluatePostfix(expression: string): number {
  const stack: number[] = []; // 用于存储操作数

  // 将后缀表达式根据空格分割
  const tokens = expression.split(' ');

  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      // 如果是数字，压入栈中
      stack.push(Number(token));
    } else {
      // 否则，处理运算符
      const b = stack.pop(); // 弹出第二个操作数
      const a = stack.pop(); // 弹出第一个操作数

      if (b === undefined || a === undefined) {
        throw new Error("Invalid expression");
      }

      let result: number;

      switch (token) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          if (b === 0) {
            throw new Error("Division by zero");
          }
          result = a / b;
          break;
        default:
          throw new Error(`Unknown operator: ${token}`);
      }

      // 将计算结果压入栈
      stack.push(result);
    }
  }

  // 最后栈中应该只剩一个元素，即为表达式的结果
  if (stack.length !== 1) {
    throw new Error("Invalid expression");
  }

  return stack.pop()!; // 返回最终结果
}

// // 示例
// const postfix = "3 4 2 * + 1 -"; // 对应的后缀表达式
// const result = evaluatePostfix(postfix);
// console.log(result); // 输出: 13

// // 示例
// const infix = "3 + 4 * 2 - 1"; // 注意这里应该是没有空格的
// const postfix = infixToPostfix(infix.split(' ').join('')); // 分割处理输入
// console.log(postfix); // 输出: "3 4 2 * + 1 -"
let the_in_input = ''
const input = (item: string) => {
  if (item == '=') {
    the_input.value = evaluatePostfix(infixToPostfix(the_input.value)).toString()
    try { Number(the_input.value) }
    catch (e) {
      alert('表达式错误')
    }


    // if(!isNumber(the_input.value)){
    //   alert('表达式错误')
    // }
  }
  else if (item == 'AC') {
    the_input.value = ''
  }
  else
    the_input.value += item
  if (!isNaN(Number(the_input.value)) && parseFloat(the_input.value) < 0) {
    the_in_input = `(${the_input.value})`
  }
  else
    the_in_input = the_input.value
}
</script>

<style lang="scss">
div {
  border-radius: 20px;
}

.background {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: antiquewhite;



  .body {
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10%;
    // margin: 0 auto;
    border: 1px solid black;
    border-radius: 20px;
    background-color: rgb(103, 18, 18);

    .input {
      height: 10%;
      width: 80%;
      border-radius: 20px;
      font-size: 20px;
    }

    .cal {
      width: 80%;
      height: 40%;
      background-color: rgb(121, 50, 50);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h3 {
        height: 20%;
        margin: 0 0;
      }

      .sign {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        height: 80%;

        .sig {
          margin: 0 2%;
          width: calc(20% - 2%); // 设置宽度，减去 gap 的影响
          height: calc(20% - 2%); // 使用计算值填满父元素，确保正确
        }
      }

      .number {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        height: 80%;

        .num {
          margin: 0 2%;
          width: calc(31% - 2%); // 设置宽度，减去 gap 的影响
          height: calc(33.33% - 2%); // 使用计算值填满父元素，确保正确
        }
      }
    }
  }
}
</style>
