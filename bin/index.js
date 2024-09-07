#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
import { program } from "commander";
import inquirer from "inquirer";

program
  .name("string-util")
  .description("CLI to some JavaScript string utilities")
  .version("0.0.1");

program
  .command("run")
  .description("Split a string into substrings and display as an array")
  .option("--first", "display just the first substring")
  .action((str, options) => {
    inquirer.prompt([{ name: "Do you want some milk ?" }]).then((answers) => {
      console.log(answers);
      // Use user feedback for... whatever!!
    });
  });

program
  .command("build")
  .description("build services")
  .action((str, options) => {
    const serviceAnswer = "Do you want to add service ?";
    inquirer
      .prompt([
        {
          name: serviceAnswer,
          type: "list",
          choices: [
            { name: "Yes", value: true, short: "Yes" },
            { name: "No", value: false, short: "No" },
          ],
        },
      ])
      .then((answers) => {
        console.log(answers[serviceAnswer]);
      });
  });

program.parse();
