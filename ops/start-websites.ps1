$ErrorActionPreference = 'Continue'
$repoRoot = Split-Path -Parent $PSScriptRoot
$node = 'C:\Program Files\nodejs\node.exe'
$logDir = Join-Path $env:ProgramData 'TagoreWebsites\logs'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
Add-Content -Path (Join-Path $logDir 'supervisor.log') -Value "[$(Get-Date -Format o)] Website supervisor started as $([Security.Principal.WindowsIdentity]::GetCurrent().Name)"
$sites = @(
  @{ Name='TPS'; Port=3000; Root=$repoRoot; Entry=(Join-Path $repoRoot 'node_modules\next\dist\bin\next') },
  @{ Name='TIER'; Port=3001; Root=(Join-Path $repoRoot 'apps\tier'); Entry=(Join-Path $repoRoot 'apps\tier\node_modules\next\dist\bin\next') }
)
while ($true) {
  foreach ($site in $sites) {
    $listener = Get-NetTCPConnection -State Listen -LocalPort $site.Port -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $listener) {
      $out = Join-Path $logDir ($site.Name.ToLower() + '.stdout.log')
      $err = Join-Path $logDir ($site.Name.ToLower() + '.stderr.log')
      $p = Start-Process -FilePath $node -ArgumentList @($site.Entry,'start','--hostname','0.0.0.0','--port',([string]$site.Port)) -WorkingDirectory $site.Root -WindowStyle Hidden -RedirectStandardOutput $out -RedirectStandardError $err -PassThru
      Add-Content -Path (Join-Path $logDir 'supervisor.log') -Value "[$(Get-Date -Format o)] Started $($site.Name) PID $($p.Id)"
      Start-Sleep -Seconds 10
    }
  }
  Start-Sleep -Seconds 20
}