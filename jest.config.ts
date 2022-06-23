import { Config } from "@jest/types";
import { join } from "path";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testTimeout: 100_000_000,
  setupFilesAfterEnv: ["jest-extended"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: join(process.cwd(), "src", "."),
  }),
};

export default config;
