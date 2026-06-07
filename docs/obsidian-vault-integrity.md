# Obsidian Vault Integrity

## Regra canonica

O destino canonico da memoria Obsidian do NeuroStrata/VitalStrata/SenseTrust e o vault resolvido pelo Vault ID `b1a32fcb40985ffc`. Caminhos absolutos de OneDrive, pastas soltas ou diretorios inferidos nao podem ser usados como destino canonico.

## Papeis de memoria

- Obsidian e a memoria conceitual: decisoes, glossario, arquitetura, sessoes Codex, prompts e ADRs.
- Supabase e a memoria operacional: usuarios, permissoes, logs, eventos, hashes, versoes, certificados e registros estruturados.
- GitHub e a memoria tecnica: codigo, migrations, issues, pull requests, testes e historico de implementacao.

## Guardrails

- `.neurostrata/vault.config.json` fixa o Vault ID e desabilita fallback para OneDrive.
- `scripts/resolve-obsidian-vault.mjs` le a configuracao local do Obsidian e falha se o Vault ID nao existir.
- `scripts/write-obsidian-note.mjs` escreve notas somente dentro do vault resolvido e retorna `note_path`, `content_hash` e `obsidian_uri`.
- `obsidian_note_registry` registra cada nota criada com vault, modulo, ADR, hash e sessao Codex.

## Criterio de seguranca

Se o vault `b1a32fcb40985ffc` nao estiver registrado em `%APPDATA%/Obsidian/obsidian.json` ou nao contiver `.obsidian`, a operacao deve falhar explicitamente. Nao existe fallback silencioso.
