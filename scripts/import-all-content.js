const { execSync } = require('child_process')
const path = require('path')

console.log('🚀 SPOUŠTÍM IMPORT VŠECH DAT DO SANITY\n')
console.log('='.repeat(70))

const scripts = [
  { name: 'Site Settings', file: 'import-site-settings.js' },
  { name: 'Homepage', file: 'import-homepage.js' },
  { name: 'Byty stránka', file: 'import-apartments-page.js' },
]

let successCount = 0
let failCount = 0

scripts.forEach((script, index) => {
  console.log(`\n[${index + 1}/${scripts.length}] 📦 ${script.name}`)
  console.log('-'.repeat(70))
  
  try {
    execSync(`node ${path.join(__dirname, script.file)}`, {
      stdio: 'inherit',
      cwd: __dirname
    })
    successCount++
  } catch (error) {
    console.error(`\n❌ Chyba při importu ${script.name}`)
    failCount++
  }
})

console.log('\n' + '='.repeat(70))
console.log('✅ IMPORT DOKONČEN')
console.log('='.repeat(70))
console.log(`📊 Statistiky:`)
console.log(`   Úspěšné:  ${successCount}/${scripts.length}`)
if (failCount > 0) {
  console.log(`   Chybné:   ${failCount}/${scripts.length}`)
}
console.log('\n💡 Otevři Sanity Studio a zkontroluj data:')
console.log('   http://localhost:3000/studio')
console.log('\n🎨 Design webu zůstává BEZE ZMĚNY!')
console.log('   Další krok: Propojení frontendu se Sanity (opatrně)')
console.log('='.repeat(70))



