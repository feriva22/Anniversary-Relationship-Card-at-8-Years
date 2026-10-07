# Jalankan server website 8 Tahun
# Klik kanan file ini -> Run with PowerShell
# atau ketik di terminal:  .\start-server.ps1

$root = $PSScriptRoot
Set-Location $root

Write-Host ""
Write-Host "============================================" -ForegroundColor Magenta
Write-Host "   Website 8 Tahun - Ferico & Yohana" -ForegroundColor Magenta
Write-Host "============================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "   Alamat :  http://localhost:8099" -ForegroundColor Cyan
Write-Host "   Berhenti:  tekan Ctrl + C" -ForegroundColor DarkGray
Write-Host ""
Write-Host "============================================" -ForegroundColor Magenta
Write-Host ""

Start-Job -ScriptBlock {
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:8099"
} | Out-Null

if (Get-Command python -ErrorAction SilentlyContinue) {
    python -m http.server 8099
}
elseif (Get-Command node -ErrorAction SilentlyContinue) {
    npx --yes serve -l 8099 .
}
else {
    Write-Host "Python dan Node tidak ditemukan." -ForegroundColor Red
    Write-Host "Buka langsung file index.html dengan klik dua kali." -ForegroundColor Yellow
    Read-Host "Tekan Enter untuk keluar"
}
