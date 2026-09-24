# Genera dia-01.html, dia-02.html y dia-03.html concatenando las partes.
# Uso:  powershell -File build\build.ps1
$build = $PSScriptRoot
$root  = Split-Path $build -Parent
$utf8  = New-Object System.Text.UTF8Encoding($false)

function Read-Part($name) {
  [System.IO.File]::ReadAllText((Join-Path $build $name), [System.Text.Encoding]::UTF8)
}

foreach ($n in 1..3) {
  $data = "part-3-data-dia$n.html"
  if (-not (Test-Path (Join-Path $build $data))) { continue }

  $head = (Read-Part "part-1-head.html") -replace '<title>[^<]*</title>', "<title>AngularJS D$([char]0xED)a $n</title>"
  $sb = New-Object System.Text.StringBuilder
  foreach ($p in @($head, (Read-Part "part-2-markup.html"), (Read-Part "part-3-prism.html"), (Read-Part $data), (Read-Part "part-4-app.html"))) {
    [void]$sb.AppendLine($p)
  }
  $out = Join-Path $root ("dia-{0:D2}.html" -f $n)
  [System.IO.File]::WriteAllText($out, $sb.ToString(), $utf8)
  Write-Output "OK $out"
}
