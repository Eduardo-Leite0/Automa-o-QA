Cypress.on('uncaught:exception', () => false)

const URL = 'https://qualidade.apprbs.com.br/certificacao'

describe('CT-CERT-001: Carregamento da Página', () => {
  it('Página deve carregar sem erros', () => {
    cy.visit(URL)
    cy.get('body').should('be.visible').and('not.be.empty')
  })
})

describe('CT-CERT-002: Botão "Saiba mais" (Cabeçalho)', () => {
  it('Saiba mais deve ter ação', () => {
    cy.visit(URL)
    cy.window().then(win => {
      const scrollAntes = win.scrollY
      cy.url().then(urlAntes => {
        cy.get('a, button').filter((_, el) => /^saiba mais$/i.test(el.innerText.trim())).first()
          .invoke('removeAttr', 'target').click({ force: true })
        cy.wait(1200)
        cy.url().then(urlDepois => {
          if (urlDepois !== urlAntes) { expect(true).to.be.true; return }
          cy.window().then(winD => {
            expect(Math.abs(winD.scrollY - scrollAntes) >= 1, 'Botão deve ter ação').to.be.true
          })
        })
      })
    })
  })
})

describe('CT-CERT-003: Botão "Quero me certificar" (Cabeçalho)', () => {
  it('Quero me Certificar deve ter ação', () => {
    cy.visit(URL)
    cy.window().then(win => {
      const scrollAntes = win.scrollY
      cy.url().then(urlAntes => {
        cy.get('a, button').filter((_, el) => el.innerText.toLowerCase().includes('quero me certificar')).eq(0)
          .invoke('removeAttr', 'target').click({ force: true })
        cy.wait(1200)
        cy.url().then(urlDepois => {
          if (urlDepois !== urlAntes) { expect(true).to.be.true; return }
          cy.window().then(winD => {
            expect(Math.abs(winD.scrollY - scrollAntes) >= 1, 'Botão deve ter ação').to.be.true
          })
        })
      })
    })
  })
})

describe('CT-CERT-004: Envio do Formulário com Dados Válidos', () => {
  it('Deve exibir mensagem de sucesso', () => {
    cy.visit(URL)
    cy.get('input[name*="nome"], input[placeholder*="Nome"]').first().clear().type('Eduardo Leite')
    cy.wait(1500)
    cy.get('input[name="pessoa.telefonePrincipal"]', { timeout: 10000 })
      .should(($el) => { expect($el.prop('disabled')).to.be.false })
      .clear().type('11999999999', { delay: 50 })
    cy.get('[name="pessoa.emailPrincipal"]').first().clear().type('eduardo.leite_@outlook.com')
    cy.contains('button', /avan/i).click({ force: true })
    cy.wait(2000)
    cy.get('body').then($body => {
      const texto = $body.text().toLowerCase()
      if (texto.includes('base legal') || texto.includes('necessário informar')) {
        expect(false, 'Erro "base legal" não deve aparecer com dados válidos').to.be.true
        return
      }
      const sucesso = texto.includes('sucesso') || texto.includes('obrigado') || texto.includes('confirmação')
      expect(sucesso, 'Deve exibir mensagem de sucesso').to.be.true
    })
  })
})

describe('CT-CERT-005: Telefone Inválido no Formulário', () => {
  const telefones = ['123', 'abcdefghij', '!@#$%']

  telefones.forEach(tel => {
    it(`Telefone "${tel}" deve bloquear o envio`, () => {
      cy.visit(URL)
      cy.get('input[name*="nome"], input[placeholder*="Nome"]').first().clear().type('Eduardo Leite')
      cy.wait(1500)
      cy.get('input[name="pessoa.telefonePrincipal"]', { timeout: 10000 })
        .should(($el) => { expect($el.prop('disabled')).to.be.false })
        .clear().type(tel, { delay: 50 })
      cy.get('[name="pessoa.emailPrincipal"]').first().clear().type('eduardo.leite_@outlook.com')
      cy.contains('button', /avan/i).click({ force: true })
      cy.wait(800)
      cy.get('body').then($body => {
        const bloqueou = $body.text().toLowerCase().includes('telefone') ||
          $body.text().toLowerCase().includes('inválido') ||
          $body.text().toLowerCase().includes('preencha') ||
          $body.find('[class*="error"], [class*="erro"]').length > 0
        expect(bloqueou, `Telefone "${tel}" deve bloquear`).to.be.true
      })
    })
  })
})

describe('CT-CERT-006: E-mail Inválido no Formulário', () => {
  it('Deve bloquear o envio', () => {
    cy.visit(URL)
    cy.get('input[name*="nome"], input[placeholder*="Nome"]').first().clear().type('Eduardo Leite')
    cy.wait(1500)
    cy.get('input[name="pessoa.telefonePrincipal"]', { timeout: 10000 })
      .should(($el) => { expect($el.prop('disabled')).to.be.false })
      .clear().type('11999999999', { delay: 50 })
    cy.get('[name="pessoa.emailPrincipal"]').first().clear().type('email_invalido')
    cy.contains('button', /avan/i).click({ force: true })
    cy.wait(800)
    cy.get('body').then($body => {
      const bloqueou = $body.text().toLowerCase().includes('e-mail') ||
        $body.text().toLowerCase().includes('inválido') ||
        $body.find('[class*="error"], [class*="erro"]').length > 0
      expect(bloqueou, 'E-mail inválido deve bloquear').to.be.true
    })
  })
})

describe('CT-CERT-007: Campos Obrigatórios', () => {
  it('Formulário vazio: botão Avançar deve estar bloqueado', () => {
    cy.visit(URL)
    cy.contains('button', /avan/i).then($btn => {
      const bloqueado = $btn[0].disabled || $btn.attr('aria-disabled') === 'true' || $btn.hasClass('disabled')
      if (bloqueado) { expect(true).to.be.true; return }
      cy.window().then(win => {
        if (win.getComputedStyle($btn[0]).pointerEvents === 'none') { expect(true).to.be.true; return }
        cy.url().then(urlAntes => {
          cy.wrap($btn).click({ force: true })
          cy.wait(600)
          cy.url().then(urlD => { expect(urlD, 'Não deve avançar com formulário vazio').to.eq(urlAntes) })
        })
      })
    })
  })

  it('Apenas e-mail preenchido: deve avançar com sucesso', () => {
    cy.visit(URL)
    cy.get('[name="pessoa.emailPrincipal"]').first().clear().type('eduardo.leite_@outlook.com')
    cy.contains('button', /avan/i).click({ force: true })
    cy.wait(1500)
    cy.get('body').then($body => {
      const texto = $body.text().toLowerCase()

      if (texto.includes('base legal') || texto.includes('necessário informar')) {
        expect(false, 'Erro "base legal" apareceu — BUG').to.be.true
        return
      }

      if (texto.includes('obrigatório') || texto.includes('preencha') || texto.includes('necessário') ||
        $body.find('[class*="error"], [class*="erro"]').length > 0) {
        expect(false, 'Erro de campo obrigatório apareceu — formulário não avançou').to.be.true
        return
      }

      const sucesso = texto.includes('sucesso') || texto.includes('obrigado') || texto.includes('confirmação')
      expect(sucesso, 'Deve exibir mensagem de sucesso ao preencher apenas o e-mail').to.be.true
    })
  })

  it('Telefone com 1 caractere: deve exibir erro', () => {
    cy.visit(URL)
    cy.get('input[name*="nome"], input[placeholder*="Nome"]').first().clear().type('Eduardo Leite')
    cy.wait(1500)
    cy.get('input[name="pessoa.telefonePrincipal"]', { timeout: 10000 })
      .should(($el) => { expect($el.prop('disabled')).to.be.false })
      .clear().type('1', { delay: 50 })
    cy.get('[name="pessoa.emailPrincipal"]').first().clear().type('eduardo.leite_@outlook.com')
    cy.contains('button', /avan/i).click({ force: true })
    cy.wait(600)
    cy.get('body').then($body => {
      const erro = $body.text().toLowerCase().includes('telefone') ||
        $body.text().toLowerCase().includes('preencha') ||
        $body.text().toLowerCase().includes('inválido') ||
        $body.find('[class*="error"], [class*="erro"]').length > 0
      expect(erro, 'Deve exibir erro de telefone').to.be.true
    })
  })

  it('Sem e-mail: não deve avançar', () => {
    cy.visit(URL)
    cy.url().then(urlAntes => {
      cy.get('input[name*="nome"], input[placeholder*="Nome"]').first().clear().type('Eduardo Leite')
      cy.wait(1500)
      cy.get('input[name="pessoa.telefonePrincipal"]', { timeout: 10000 })
        .should(($el) => { expect($el.prop('disabled')).to.be.false })
        .clear().type('11999999999', { delay: 50 })
      cy.contains('button', /avan/i).click({ force: true })
      cy.wait(600)
      cy.url().then(urlD => { expect(urlD, 'Não deve avançar sem e-mail').to.eq(urlAntes) })
    })
  })
})

describe('CT-CERT-008: Botão "Quero me certificar" (Corpo da Página)', () => {
  it('2º botão deve ir ao mesmo destino que o 1º', () => {
    let urlCabecalho = null

    cy.visit(URL)
    cy.get('a, button').filter((_, el) => el.innerText.toLowerCase().includes('quero me certificar')).eq(0)
      .invoke('removeAttr', 'target').click({ force: true })
    cy.wait(1000)
    cy.url().then(u => { urlCabecalho = u })

    cy.visit(URL)
    cy.wait(500)
    cy.get('a, button').filter((_, el) => el.innerText.toLowerCase().includes('quero me certificar')).eq(1)
      .invoke('removeAttr', 'target').click({ force: true })
    cy.wait(1000)
    cy.url().then(urlCorpo => {
      expect(urlCorpo, '2º botão deve ter mesmo destino do 1º').to.eq(urlCabecalho)
    })
  })
})

describe('CT-CERT-009: Botões de Outros Cursos (Saiba/Salba mais)', () => {
  ;[1, 2, 3].forEach(idx => {
    it(`Botão ${idx} deve ter ação`, () => {
      cy.visit(URL)
      cy.window().then(win => {
        const scrollAntes = win.scrollY
        cy.url().then(urlAntes => {
          cy.get('a, button').filter((_, el) => {
            const t = el.innerText.trim().toLowerCase()
            return t.includes('saiba') || t.includes('salba')
          }).eq(idx).invoke('removeAttr', 'target').click({ force: true })
          cy.wait(1200)
          cy.url().then(urlDepois => {
            if (urlDepois !== urlAntes) { expect(true).to.be.true; return }
            cy.window().then(winD => {
              expect(Math.abs(winD.scrollY - scrollAntes) >= 1, 'Botão deve ter ação').to.be.true
            })
          })
        })
      })
    })
  })
})

describe('CT-CERT-010: Botão "Quero me certificar" (Rodapé)', () => {
  it('3º botão deve ir ao mesmo destino que o 1º', () => {
    let urlCabecalho = null

    cy.visit(URL)
    cy.get('a, button').filter((_, el) => el.innerText.toLowerCase().includes('quero me certificar')).eq(0)
      .invoke('removeAttr', 'target').click({ force: true })
    cy.wait(1000)
    cy.url().then(u => { urlCabecalho = u })

    cy.visit(URL)
    cy.wait(500)
    cy.scrollTo('bottom')
    cy.wait(400)
    cy.get('a, button').filter((_, el) => el.innerText.toLowerCase().includes('quero me certificar')).eq(2)
      .invoke('removeAttr', 'target').click({ force: true })
    cy.wait(1000)
    cy.url().then(urlRodape => {
      expect(urlRodape, '3º botão deve ter mesmo destino do 1º').to.eq(urlCabecalho)
    })
  })
})

describe('CT-CERT-011: Redes Sociais no Rodapé', () => {
  const redes = [
    { nome: 'Facebook',  url: 'facebook.com'  },
    { nome: 'Instagram', url: 'instagram.com' },
    { nome: 'LinkedIn',  url: 'linkedin.com'  },
    { nome: 'YouTube',   url: 'youtube.com'   },
  ]

  redes.forEach(({ nome, url }) => {
    it(`${nome} deve ter href válido`, () => {
      cy.visit(URL)
      cy.scrollTo('bottom')
      cy.wait(400)
      cy.get(`a[href*="${url}"]`).first().then($a => {
        expect($a.attr('href'), `${nome} deve ter href válido`).to.include(url)
      })
    })
  })
})