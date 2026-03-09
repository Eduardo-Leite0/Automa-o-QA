# Automação QA — Rubeus

Repositório de automação de testes end-to-end utilizando Cypress, desenvolvido para validar funcionalidades de duas páginas web da plataforma Rubeus.

## Sites Testados

- Site de Certificação: https://qualidade.apprbs.com.br/certificacao
- Site Principal (UNIEXEMPLO): https://qualidade.apprbs.com.br/site

## Tecnologias Utilizadas

- Cypress — automação dos testes end-to-end
- JavaScript — linguagem dos scripts de teste
- Node.js — ambiente de execução

## Estrutura do Repositório
```
Automa-o-QA/
├── cypress/
│   └── e2e/
│       ├── cypress_certificacao.cy.js
│       └── cypress_site_principal.cy.js
├── Plano_de_Testes_-_Site_de_Certificação.pdf
├── Plano_de_Testes_-_Site_Principal.pdf
├── Relatório_Rubeus.pdf
├── cypress.config.js
├── package.json
└── README.md
```
## Casos de Teste

### Site de Certificação

- CT-CERT-001: Carregamento da página
- CT-CERT-002: Botão "Saiba mais" no cabeçalho
- CT-CERT-003: Botão "Quero me certificar" no cabeçalho
- CT-CERT-004: Envio do formulário com dados válidos
- CT-CERT-005: Validação de telefone inválido
- CT-CERT-006: Validação de e-mail inválido
- CT-CERT-007: Campos obrigatórios do formulário
- CT-CERT-008: Botão "Quero me certificar" no corpo da página
- CT-CERT-009: Botões da seção "Outros Cursos"
- CT-CERT-010: Botão "Quero me certificar" no rodapé
- CT-CERT-011: Redes sociais no rodapé

### Site Principal (UNIEXEMPLO)

- CT-SITE-001: Carregamento da página
- CT-SITE-002: Links de redes sociais e atendimento
- CT-SITE-003: Botões Institucional e Biblioteca
- CT-SITE-004: Navegação interna (Nossos Diferenciais, Eventos, Depoimentos)
- CT-SITE-005: Botão "Falar com Consultor"
- CT-SITE-006: Carrossel de banners
- CT-SITE-007: Botões "Inscreva-se Agora!"
- CT-SITE-008: Formulário de newsletter com dados válidos
- CT-SITE-009: Validação de e-mail inválido na newsletter
- CT-SITE-010: Validação de telefone inválido na newsletter
- CT-SITE-011: Campos obrigatórios da newsletter
- CT-SITE-012: Redes sociais e navegação no rodapé

## Bugs Encontrados

### Site de Certificação

- BUG-001: Botão "Saiba mais" no cabeçalho sem ação — Crítico, Alta
- BUG-002: Erro "É necessário informar a base legal" ao enviar o formulário de inscrição — Crítico, Alta
- BUG-003: Botões "Saiba", "Saiba mais" e "Salba mais" inativos na seção "Outros Cursos" — Crítico, Alta
- BUG-004: Erro tipográfico "Salba mais" no botão da seção "Outros Cursos" — Baixa, Média
- BUG-005: Botão "Quero me certificar" no rodapé redireciona para o Google — Crítico, Alta
- BUG-006: Ícone do YouTube redireciona para o TikTok — Média, Média

### Site Principal (UNIEXEMPLO)

- BUG-001: Botão "Inscreva-se!" no carrossel sem ação — Crítico, Alta
- BUG-002: Erro "É necessário informar a base legal" ao concluir o formulário da newsletter — Crítico, Alta

## Melhorias Identificadas

### Site de Certificação

- MELHORIA-001: Adicionar favicon ao site — Baixa
- MELHORIA-002: Máscara de telefone no campo de inscrição — Baixa
- MELHORIA-003: Padronização dos textos dos botões "Saiba Mais" — Média
- MELHORIA-004: Informações de contato no rodapé — Média

### Site Principal (UNIEXEMPLO)

- MELHORIA-001: Atualizar ícone do X (ainda exibe o logo antigo do Twitter) — Baixa
- MELHORIA-002: Botões de navegação interna redirecionando para outra página — Alta
- MELHORIA-003: Centralização horizontal do formulário de newsletter — Baixa

## Novas Funcionalidades Sugeridas

### Site de Certificação

- NF-001: Integração com ferramenta de consentimento de dados (LGPD) — Alta
- NF-002: Navegação interna consistente, sem redirecionamentos externos — Baixa
- NF-003: Confirmação de inscrição por e-mail — Média

### Site Principal (UNIEXEMPLO)

- NF-001: Confirmação de inscrição de newsletter por e-mail — Média
- NF-002: Campo de busca de cursos na página principal — Alta
- NF-003: Filtros de eventos por data e categoria — Média

## Como Executar os Testes

Pré-requisitos: Node.js instalado.
```bash
# Instalar dependências
npm install

# Abrir interface do Cypress
npx cypress open

# Executar testes em modo headless
npx cypress run --spec "cypress/e2e/cypress_certificacao.cy.js"
npx cypress run --spec "cypress/e2e/cypress_site_principal.cy.js"

## Documentação

- Plano de Testes — Site de Certificação: `Plano_de_Testes_-_Site_de_Certificação.pdf`
- Plano de Testes — Site Principal: `Plano_de_Testes_-_Site_Principal.pdf`
- Relatório Completo de QA: `Relatório_Rubeus.pdf`

## Autor

Eduardo de Souza Leite
eduardo.leite_@outlook.com
