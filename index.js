#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import { download } from "obtain-git-repo";
import { createSpinner } from "nanospinner";
import figlet from "figlet";
import terminalLink from "terminal-link";

figlet("vite-basic", async function (err, data) {
  //打印文字图案
  console.log(data);
  //可点击链接
  //询问用户
  const message = await inquirer.prompt({
    name: "dirname",
    type: "input",
    message: "请输入目录名",
    default() {
      return "vite-basic";
    },
  });

  //目录是否已经存在
  const dirIsExists = fs.existsSync(message.dirname);

  if (dirIsExists) {
    console.log(chalk.redBright("目录已经存在"));
  } else {
    //显示下载动画
    const spinner = createSpinner("开始下载...").start();
    //下载git代码
    download(
      "direct:https://github.com/wsm1025/vite-basic.git",
      message.dirname,
      { clone: true },
      function (err) {
        if (err) {
          spinner.error({ text: "下载失败" });
        } else {
          spinner.success({
            text: "项目创建成功，请依次执行以下命令",
          });
          console.log(chalk.white(`cd ${message.dirname}`));
          console.log(chalk.white("pnpm i"));
          console.log(chalk.white("pnpm run dev"));
          return;
        }
      }
    );
  }
});
