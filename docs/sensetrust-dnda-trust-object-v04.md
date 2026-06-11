# SenseTrust DNDA Trust Object / Evidence Manifest v0.4

## Objetivo

Criar a estrutura tecnica minima para transformar um relatorio DNDA simulado em um objeto interno certificavel, auditavel e verificavel.

## Componentes

Evidence Manifest:

- lista evidencias simuladas;
- registra SHA-256 de cada evidencia;
- referencia pipeline e prompt;
- produz `manifest_hash`.

DNDA Trust Object:

- referencia o documento DNDA simulado;
- referencia o Evidence Manifest;
- carrega hashes de documento, pipeline e prompt;
- referencia certificado publico simulado da v0.3;
- produz `trust_object_hash`.

## Relacao com QR / Certificado v0.3

A v0.3 criou o caminho publico `/verify/:token` com metadados seguros. A v0.4 cria a camada interna que justifica o certificado: o objeto de confianca DNDA e seu manifesto de evidencias.

## Dados permitidos

- identificadores simulados;
- hashes SHA-256;
- metadados de pipeline/prompt simulados;
- referencias de certificado publico simulado.

## Dados proibidos

- nome de paciente real;
- CPF;
- EEG real;
- anamnese real;
- biomarcador real;
- laudo real;
- hipotese diagnostica real.

## Limites atuais

- Sem certificado publico real novo.
- Sem alteracao de RLS v0.2.
- Sem alteracao do fluxo QR v0.3.
- Sem uso clinico real.
- Sem assinatura digital ICP-Brasil.

## Proxima fase

Integrar Trust Object e Evidence Manifest ao fluxo simulado de emissao/revogacao, mantendo minimizacao publica.
