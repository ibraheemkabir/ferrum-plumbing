# Publishing to local consumers

$targets = @(
  "../../unifyre/unifyre-native-wallet-components/node_modules/ferrum-plumbing/",
  "../../unifyre/unifyre-wallets/WebWallet/node_modules/ferrum-plumbing/"
)

function CopyNodeModules () {
  param($path)
  echo "copy to $path"
  Copy-Item './dist' -Destination $path -Force -Recurse
}

echo "Compiling"

tsc

echo "Compiled"

$targets | ForEach-Object {CopyNodeModules $_}

