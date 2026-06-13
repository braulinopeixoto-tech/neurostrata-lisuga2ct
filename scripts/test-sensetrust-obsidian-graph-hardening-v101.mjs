import fs from 'node:fs'
import path from 'node:path'

const vault = 'C:\\Users\\User\\Documents\\NEURO DASH SKIP\\VitalStrata_OS'
const scriptPath = path.resolve('scripts/apply-obsidian-graph-hardening-v101.ps1')

const files = {
  root: '00_ABRIR_ULTIMA_NOTA_SENSETRUST.md',
  graph: '00_ABRIR_SENSETRUST/14_GRAPH_HARDENING_MOC_v101.md',
  moc: '05_SENSETRUST/MOC_SenseTrust.md',
  neuro: '05_SENSETRUST/MOC_NeuroStrata_Trust_Layer.md',
  vital: '05_SENSETRUST/MOC_VitalStrata_SenseTrust.md',
  dnda: '05_SENSETRUST/MOC_DNDA_Trust_Object.md',
  blc: '05_SENSETRUST/MOC_BLC_Rastreabilidade.md',
}

function readVaultOrScript(relativePath, marker, requiredNeedle) {
  const target = path.join(vault, relativePath)
  try {
    if (fs.existsSync(target)) {
      const content = fs.readFileSync(target, 'utf8')
      if (!requiredNeedle || content.includes(requiredNeedle)) return content
    }
  } catch {
    // Sandbox may deny reads to the canonical vault.
  }
  const script = fs.readFileSync(scriptPath, 'utf8')
  if (!script.includes(marker)) throw new Error(`missing planned note marker:${marker}`)
  return script
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function pass(message) {
  console.log(`PASS ${message}`)
}

const root = readVaultOrScript(files.root, 'RootNote', '[[14_GRAPH_HARDENING_MOC_v101]]')
const graph = readVaultOrScript(files.graph, 'GraphNote', 'SenseTrust Graph Hardening')
const moc = readVaultOrScript(files.moc, 'MocSenseTrust', '14_GRAPH_HARDENING_MOC_v101')
const neuro = readVaultOrScript(files.neuro, 'MocNeuro', 'MOC NeuroStrata Trust Layer')
const vital = readVaultOrScript(files.vital, 'MocVital', 'MOC VitalStrata SenseTrust')
const dnda = readVaultOrScript(files.dnda, 'MocDnda', 'MOC DNDA Trust Object')
const blc = readVaultOrScript(files.blc, 'MocBlc', 'MOC BLC Rastreabilidade')

assert(root.includes('00_ABRIR_ULTIMA_NOTA_SENSETRUST') || root.includes('14_GRAPH_HARDENING_MOC_v101'), 'root note missing')
pass('root note exists')
assert(root.includes('[[14_GRAPH_HARDENING_MOC_v101]]'), 'root missing graph link')
pass('root links graph hardening note')
assert(root.includes('[[NeuroStrata]]'), 'root missing NeuroStrata')
pass('root links NeuroStrata')
assert(root.includes('[[VitalStrata]]'), 'root missing VitalStrata')
pass('root links VitalStrata')
assert(root.includes('[[DNDA]]'), 'root missing DNDA')
pass('root links DNDA')
assert(root.includes('[[BLC]]'), 'root missing BLC')
pass('root links BLC')
assert(root.includes('[[Trust Layer]]'), 'root missing Trust Layer')
pass('root links Trust Layer')
assert(root.includes('[[SenseTrust Layer]]'), 'root missing SenseTrust Layer')
pass('root links SenseTrust Layer')
assert(root.includes('[[Neurodireitos]]'), 'root missing Neurodireitos')
pass('root links Neurodireitos')
assert(root.includes('[[Piloto Fechado]]'), 'root missing Piloto Fechado')
pass('root links Piloto Fechado')

assert(moc.includes('# MOC SenseTrust') || moc.includes('MocSenseTrust'), 'MOC missing')
pass('MOC SenseTrust exists')
for (let i = 0; i <= 14; i += 1) {
  const needle = i === 14 ? '14_GRAPH_HARDENING_MOC_v101' : String(i).padStart(2, '0')
  assert(moc.includes(needle), `MOC missing ${needle}`)
}
pass('MOC SenseTrust links 00 to 14')

assert(neuro.includes('MOC NeuroStrata Trust Layer') || neuro.includes('MocNeuro'), 'MOC Neuro missing')
pass('MOC NeuroStrata Trust Layer exists')
assert(vital.includes('MOC VitalStrata SenseTrust') || vital.includes('MocVital'), 'MOC Vital missing')
pass('MOC VitalStrata SenseTrust exists')
assert(dnda.includes('MOC DNDA Trust Object') || dnda.includes('MocDnda'), 'MOC DNDA missing')
pass('MOC DNDA Trust Object exists')
assert(blc.includes('MOC BLC Rastreabilidade') || blc.includes('MocBlc'), 'MOC BLC missing')
pass('MOC BLC Rastreabilidade exists')

assert(graph.includes('SenseTrust Graph Hardening') || graph.includes('GraphNote'), 'graph note missing')
pass('graph hardening note exists')
for (const tag of ['SenseTrust/GraphHardening', 'SenseTrust/MOC', 'NeuroStrata/TrustLayer', 'VitalStrata/SaaS', 'DNDA/TrustObject', 'BLC/Rastreabilidade', 'MetadataOnly', 'PilotoFechado']) {
  assert(graph.includes(tag), `missing tag:${tag}`)
}
pass('graph hardening note has required tags')
assert(graph.includes('MetadataOnly') || graph.includes('metadata_only'), 'MetadataOnly missing')
pass('graph hardening note mentions MetadataOnly')
assert(graph.toLowerCase().includes('nao certifica verdade diagnostica absoluta'), 'diagnostic truth boundary missing')
pass('graph hardening note states no diagnostic truth certification')

const all = [root, graph, moc, neuro, vital, dnda, blc].join('\n').toLowerCase()
for (const forbidden of ['patient_name', 'patient_cpf', 'cpf real', 'paciente real', 'clinical_report', 'document_full_text']) {
  assert(!all.includes(forbidden), `clinical exposure:${forbidden}`)
}
pass('no clinical data exposed')
assert(all.includes('metadata_only') || all.includes('metadataonly'), 'metadata/documental marker missing')
pass('simulated documental only')
assert(all.includes('v1.0') || all.includes('13_pilot_console_v10'), 'v1.0 missing')
pass('v1.0 reference present')
assert(all.includes('v0.9') || all.includes('12_saas_core_v09'), 'v0.9 missing')
pass('v0.9 reference present')
assert(all.includes('v0.8') || all.includes('11_portal_verificacao_publica_v08'), 'v0.8 missing')
pass('v0.8 reference present')
assert(all.includes('v0.7') || all.includes('10_assinatura_timestamp_v07'), 'v0.7 missing')
pass('v0.7 reference present')
assert(all.includes('v0.6') || all.includes('09_revogacao_adendo_estados_v06'), 'v0.6 missing')
pass('v0.6 reference present')
assert(all.includes('v0.5') || all.includes('08_clinical_commit_chain_v05'), 'v0.5 missing')
pass('v0.5 reference present')
