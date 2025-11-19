// 按照 中文占位表.txt 顺序生成 charset** 代码
// 比如 (charset** 47 1 "蓮连錬呂鲁噜炉賂路露劳婁廊弄朗楼榔浪漏牢狼篭老聋蜡郎六麓禄肋录论倭和话歪賄胁惑枠鷲亙亘鰐詫藁蕨椀湾碗腕")

const fs = require('fs')

const refFile = '中文占位表.txt'
const destFile = '_charset_chinese.rkt'
genCharsetCode(refFile, destFile)

function* generateCharsetLines(chars, ranges) {
  let idx = 0;

  for (const [colStart, colEnd, rowStart, countPerCol] of ranges) {
    const cols = colEnd - colStart + 1;      // 这个区间有多少列
    const need = cols * countPerCol;         // 需要取多少字

    const sliceChars = chars.slice(idx, idx + need).join('');

    if (sliceChars.length !== need) {
      throw new Error(`区间 [${colStart}-${colEnd}] 字符数不够，需 ${need} 实际 ${sliceChars.length}`);
    }

    // 用开始列作为 charset** 的列号
    yield `(charset** ${colStart} ${rowStart} ${JSON.stringify(sliceChars)})`;

    idx += need;
  }

  if (idx !== chars.length) {
    throw new Error(`已使用 ${idx} 字，但 chars 总长 ${chars.length}`);
  }
}

function genCharsetCode(file, destFile) {
  const content = fs.readFileSync(file, 'utf8')
  const chars = Array.from(content.replace(/\r?\n/g, ''))
  if (chars.length !== 6715) {
    console.warn('警告：chars 长度不是 6715，而是', chars.length)
  }

  const ranges = [
    [16, 46, 1, 94],  // 第 16-46 列，每列 94 字
    [47, 47, 1, 51],  // 第 47 列 51 字
    [48, 83, 1, 94],  // 第 48-83 列，每列 94 字
    [84, 84, 1, 6],   // 第 84 列 6 字
    [89, 91, 1, 94],  // 第 89-91 列，每列 94 字
    [92, 92, 1, 78],  // 第 92 列 78 字
  ]

  const gen = generateCharsetLines(chars, ranges)

  for (const line of gen) {
    console.log(line)
    fs.appendFileSync(destFile, line + '\n')
  }
}
