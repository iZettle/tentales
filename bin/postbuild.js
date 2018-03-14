const { last } = require("ramda")
const fs = require("fs-extra")
const pathModule = require("path")
const FILES_TO_COPY = ["README.md", "package.json"]

const BUILD_DIR = pathModule.join(__dirname, "..", "dist")
const SRC_PACKAGES_DIR = pathModule.join(__dirname, "..", "packages")

function readDir(dir) {
  return fs
    .readdirSync(dir)
    .map(path => pathModule.join(dir, path))
    .filter(path => fs.statSync(path).isDirectory())
}

/**
 * Just some safeguarding, making sure all directories
 * exists
 */
function checkDirectoriesExists() {
  ;[
    [BUILD_DIR, "Build directory"],
    [SRC_PACKAGES_DIR, "Source packages directory"],
  ].forEach(dir => {
    try {
      fs.statSync(dir[0])
    } catch (_) {
      console.error(`${dir[1]} does not exist, exiting.`)
      process.exit(1)
    }
  })
}

/**
 * Move packages from e.g.
 * dist/tentales-data/src
 * to
 * dist/tentales-data
 */
function movePackagesToRoot() {
  readDir(BUILD_DIR).forEach(packagePath => {
    const packageSlug = last(packagePath.split("/"))
    const moveFromPath = pathModule.join(packagePath, "src")
    const moveToPath = pathModule.join(BUILD_DIR, packageSlug)
    fs.moveSync(moveFromPath, moveToPath)
  })
}

/**
 * Copy additional files (README, package.json etc)
 * from src to dist
 */
function copyFilesFromSrcToDist() {
  readDir(SRC_PACKAGES_DIR).forEach(path => {
    FILES_TO_COPY.forEach(file => {
      const packageName = last(path.split("/"))
      const srcPath = pathModule.join(path, file)
      const distPath = pathModule.join(BUILD_DIR, packageName, file)
      try {
        fs.copyFileSync(srcPath, distPath)
      } catch (_) {
        // Do nothing if no file exists
      }
    })
  })
}

/**
 * Change `main` property from ts to js in package.json.
 */
function updatePackageJson() {
  readDir(BUILD_DIR)
    .map(path => pathModule.join(path, "package.json"))
    .forEach(packageJsonPath => {
      const fileContent = fs.readFileSync(packageJsonPath, { encoding: "utf8" })
      const fileJson = JSON.parse(fileContent)
      fileJson.main = "index.js"
      fileJson.types = "index.d.js"
      const outFileContent = JSON.stringify(fileJson, null, 2)
      fs.writeFileSync(packageJsonPath, outFileContent, { encoding: "utf8" })
    })
}

checkDirectoriesExists()
movePackagesToRoot()
copyFilesFromSrcToDist()
updatePackageJson()
console.log("Post build script, done!")
