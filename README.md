This repo is forked from [tomyun/juice](https://github.com/tomyun/juice)

## Difference
- Fixed an inconsistency error when recompiling some ADV MES files (e.g., X-Girls, Pia Carrot).
- Support Chinese charset
    - 反编译和编译时**不要**(也不用)指定 `--charset chinese`，只在翻译完 rkt 文件后，将每个文件的第一处 `(charset "pc98")` 改为 `(charset "chinese")` 即可。编译指令会自动找到 `_charset_chinese.rkt` 文件并用它编码中文。
    - 中文 charset 配套的码表文件为 `font/font-chinese.bmp`

## Note
Decompile rules for `--engine ADV --extraop`
![graph1.png](doc/graph1.png)
![graph2.png](doc/graph2.png)
![graph3.png](doc/graph3.png)