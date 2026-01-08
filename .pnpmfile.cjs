function readPackage(pkg) {
  // Approve build scripts for essential dependencies
  if (pkg.name === 'esbuild' || pkg.name === '@tailwindcss/oxide') {
    pkg.scripts = pkg.scripts || {}
  }
  return pkg
}

module.exports = {
  hooks: {
    readPackage
  }
}
