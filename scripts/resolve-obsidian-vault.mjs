import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const vaultConfigPath = path.join(repoRoot, '.neurostrata', 'vault.config.json')

export function readVaultConfig() {
  if (!existsSync(vaultConfigPath)) {
    throw new Error(`vault_config_not_found: ${vaultConfigPath}`)
  }

  const config = JSON.parse(readFileSync(vaultConfigPath, 'utf8'))
  if (!config.obsidian_vault_id) {
    throw new Error('obsidian_vault_id_missing')
  }

  if (config.allow_onedrive_fallback !== false) {
    throw new Error('allow_onedrive_fallback_must_be_false')
  }

  if (config.obsidian_required !== true) {
    throw new Error('obsidian_required_must_be_true')
  }

  return config
}

export function getObsidianConfigPath() {
  const appData = process.env.APPDATA
  if (!appData) {
    throw new Error('APPDATA_not_defined')
  }

  return path.join(appData, 'Obsidian', 'obsidian.json')
}

export function resolveObsidianVault() {
  const config = readVaultConfig()
  const obsidianConfigPath = getObsidianConfigPath()

  if (!existsSync(obsidianConfigPath)) {
    throw new Error(`obsidian_config_not_found: ${obsidianConfigPath}`)
  }

  const obsidianConfig = JSON.parse(readFileSync(obsidianConfigPath, 'utf8'))
  const vault = obsidianConfig.vaults?.[config.obsidian_vault_id]

  if (!vault?.path) {
    throw new Error(`obsidian_vault_id_not_found: ${config.obsidian_vault_id}`)
  }

  const vaultPath = path.resolve(vault.path)
  const obsidianFolder = path.join(vaultPath, '.obsidian')

  if (!existsSync(vaultPath)) {
    throw new Error(`obsidian_vault_path_not_found: ${vaultPath}`)
  }

  if (!existsSync(obsidianFolder)) {
    throw new Error(`obsidian_folder_not_found: ${obsidianFolder}`)
  }

  return {
    vaultId: config.obsidian_vault_id,
    vaultPath,
    obsidianFolder,
    obsidianConfigPath,
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = resolveObsidianVault()
  console.log(JSON.stringify(result, null, 2))
}
