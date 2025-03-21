#!/usr/bin/env node
/*
 *   Copyright (c) 2025 Alexander Neitzel

 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.

 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.

 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { compile, loadFromFile, run, saveToFile } from "@astx/lib";
import { program } from "commander";
import { readFileSync } from "fs";

program
  .version("1.0.0")
  .description("Compile and run your .astx files")
  .option("compile <input> <output>", "Compile a .js file to a .astx file")
  .option("run <input>", "Run a .astx file")
  .action((options) => {
    if (options.compile) {
      console.log("Compiling...");

      const start = performance.now();
      const fileContent = readFileSync(options.compile[0], "utf-8");

      if (!fileContent) {
        console.error("File not found");
        process.exit(1);
      }

      const compiled = compile(fileContent);

      saveToFile(compiled, options.compile[1]);
      console.log(`Compiled in ${performance.now() - start}ms`);
    } else if (options.run) {
      console.log("Running...");

      const program = loadFromFile(options.run[0]);
      run(program);
    }
  });

program.parse(process.argv);
