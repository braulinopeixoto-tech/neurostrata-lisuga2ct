# SenseTrust QR PDF / Certificado Publico Seguro v0.3

## Objetivo

Implementar o fluxo minimo de certificado publico seguro com QR Code usando exclusivamente dados simulados.

## Fluxo

```text
PDF simulado -> hash SHA-256 -> trust_certificate simulado -> verification_token -> QR Code -> /verify/:token -> verify_public_certificate -> resposta publica segura
```

## Implementacao

- Hash e comparacao: `src/services/sensetrust/pdf-hash-service.ts`
- Certificado publico: `src/services/sensetrust/public-certificate-service.ts`
- URL/QR: `src/services/sensetrust/qr-verification-service.ts`
- Fixture simulada: `src/fixtures/sensetrust/simulated-certificate.ts`
- Componente publico: `src/components/sensetrust/PublicCertificateVerification.tsx`
- Rota: `/verify/:id`

## Relacao com RLS v0.2

A sprint usa a funcao aprovada `verify_public_certificate(p_token text)` como via conceitual e tecnica para validacao publica. A tabela `verification_tokens` nao deve receber leitura direta `anon/public`.

## Metadados publicos

Somente metadados seguros sao exibidos:

- status do certificado;
- identificador de documento simulado;
- tipo e versao do documento;
- emissor;
- data de emissao;
- status de verificacao;
- resultado de hash;
- status de revogacao.

## Limites atuais

- Nao ha assinatura digital ICP-Brasil.
- Nao ha uso clinico real.
- Nao ha dado de paciente real.
- O QR e representado pela URL `/verify/:token`; a geracao de imagem final pode ser adicionada depois.
- O fluxo ponta a ponta usa fixture simulada.
