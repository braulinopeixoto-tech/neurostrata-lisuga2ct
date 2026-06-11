# SenseTrust Public Verification Contract v0.3

## Objetivo

Definir o contrato publico minimo para `/verify/:token` e para a RPC aprovada `verify_public_certificate(p_token text)`.

## Campos permitidos

- `certificate_status`
- `document_id`
- `document_type`
- `document_version`
- `issued_at`
- `issuer`
- `verification_status`
- `hash_match`
- `revocation_status`

## Campos proibidos

- nome completo do paciente;
- CPF ou documento;
- telefone, email ou endereco;
- anamnese;
- hipotese diagnostica;
- EEG, qEEG ou biomarcadores detalhados;
- escalas clinicas;
- conteudo integral do PDF;
- qualquer dado clinico sensivel.

## RPC autorizada

```sql
select public.verify_public_certificate(p_token := '<token-publico>');
```

`verification_tokens` permanece sem leitura direta `anon/public`. A pagina publica deve usar somente a RPC segura.

## Resultado invalido

Token inexistente, expirado, revogado ou com hash divergente deve retornar estado publico nao valido, sem expor detalhe sensivel.
