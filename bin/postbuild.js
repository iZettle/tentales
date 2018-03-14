const { last } = require("ramda")
const fs = require("fs-extra")
const pathModule = require("path")
const FILES_TO_COPY = ["README.md", "package.json"]

const BUILD_DIR = pathModule.join(__dirname, "..", "dist")
const BUILD_PACKAGES_DIR = pathModule.join(__dirname, "..", "dist", "packages")
const SRC_PACKAGES_DIR = pathModule.join(__dirname, "..", "packages")

/**
 * Just some safeguarding, making sure all directories
 * exists
 */
function checkDirectoriesExists() {
  ;[
    [BUILD_DIR, "Build directory"],
    [BUILD_PACKAGES_DIR, "Build packages directory"],
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
 * dist/packages/tentales-data/src
 * to
 * dist/tentales-data
 */
function movePackagesToRoot() {
  fs
    .readdirSync(BUILD_PACKAGES_DIR)
    .map(path => pathModule.join(BUILD_PACKAGES_DIR, path))
    .forEach(packagePath => {
      const packageSlug = last(packagePath.split("/"))
      const moveFromPath = pathModule.join(packagePath, "src")
      const moveToPath = pathModule.join(BUILD_DIR, packageSlug)
      fs.moveSync(moveFromPath, moveToPath)
      fs.rmdirSync(packagePath)
    })

  fs.rmdirSync(BUILD_PACKAGES_DIR)
}

/**
 * Copy additional files (README, package.json etc)
 * from src to dist
 */
function copyFilesFromSrcToDist() {
  fs
    .readdirSync(SRC_PACKAGES_DIR)
    .map(slug => pathModule.join(SRC_PACKAGES_DIR, slug))
    .filter(path => fs.statSync(path).isDirectory())
    .forEach(path => {
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
 * Change `main` property from ts to js in package.json
 */
function updatePackageJson() {
  fs
    .readdirSync(BUILD_DIR)
    .map(path => pathModule.join(BUILD_DIR, path))
    .filter(path => fs.statSync(path).isDirectory())
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
