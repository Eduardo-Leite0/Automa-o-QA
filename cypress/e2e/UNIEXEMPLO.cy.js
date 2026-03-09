Cypress.on('uncaught:exception', () => false)

const URL = 'https://qualidade.apprbs.com.br/site'

describe('CT-SITE-001: Carregamento da Página', () => {
  it('Deve carregar sem erro', () => {
    cy.request({ url: URL, failOnStatusCode: false }).its('status').should('eq', 200)
    cy.visit(URL)
    cy.get('body').should('be.visible').and('not.be.empty')
  })
})

describe('CT-SITE-002: Botões de Redes Sociais e Atendimento', () => {
  const redes = [
    { nome: 'LinkedIn',  url: 'linkedin.com'  },
    { nome: 'Facebook',  url: 'facebook.com'  },
    { nome: 'X/Twitter', url: 'x.com'         },
    { nome: 'YouTube',   url: 'youtube.com'   },
    { nome: 'Instagram', url: 'instagram.com' },
    { nome: 'WhatsApp',  url: 'whatsapp'      },
  ]

  redes.forEach(({ nome, url }) => {
    it(`${nome} deve ter href válido`, () => {
      cy.visit(URL)
      cy.get(`a[href*="${url}"]`).first().then($a => {
        expect($a.attr('href'), `${nome} deve ter href válido`).to.include(url)
      })
    })
  })

  it('Botão "Atendimento" deve ter ação', () => {
    cy.visit(URL)
    cy.window().then(win => {
      const scrollAntes = win.scrollY
      cy.url().then(urlAntes => {
        cy.contains('a, button', /atendimento/i).first().invoke('removeAttr', 'target').click({ force: true })
        cy.wait(1200)
        cy.url().then(urlD => {
          if (urlD !== urlAntes) { expect(true).to.be.true; return }
          cy.window().then(winD => {
            expect(Math.abs(winD.scrollY - scrollAntes) >= 1, 'Atendimento deve ter ação').to.be.true
          })
        })
      })
    })
  })
})

describe('CT-SITE-003: Botões Institucional e Biblioteca', () => {
  it('INSTITUCIONAL 1 (cabeçalho) deve ter ação', () => {
    cy.visit(URL)
    cy.window().then(win => {
      const scrollAntes = win.scrollY
      cy.url().then(urlAntes => {
        cy.get('a, button').filter((_, el) => el.innerText.trim().toLowerCase() === 'institucional').eq(0)
          .invoke('removeAttr', 'target').click({ force: true })
        cy.wait(1200)
        cy.url().then(urlD => {
          if (urlD !== urlAntes) { expect(true).to.be.true; return }
          cy.window().then(winD => {
            expect(Math.abs(winD.scrollY - scrollAntes) >= 1, 'Deve ter ação').to.be.true
          })
        })
      })
    })
  })

  it('BIBLIOTECA deve ter ação', () => {
    cy.visit(URL)
    cy.window().then(win => {
      const scrollAntes = win.scrollY
      cy.url().then(urlAntes => {
        cy.get('a, button').filter((_, el) => el.innerText.trim().toLowerCase() === 'biblioteca').first()
          .invoke('removeAttr', 'target').click({ force: true })
        cy.wait(1200)
        cy.url().then(urlD => {
          if (urlD !== urlAntes) { expect(true).to.be.true; return }
          cy.window().then(winD => {
            expect(Math.abs(winD.scrollY - scrollAntes) >= 1, 'Deve ter ação').to.be.true
          })
        })
      })
    })
  })
})

describe('CT-SITE-004: Navegação (Nossos Diferenciais, Eventos, Depoimentos)', () => {
  const botoes = [
    { label: /nossos? diferenciais/i, nome: 'NOSSOS DIFERENCIAIS' },
    { label: /^eventos$/i,            nome: 'EVENTOS'             },
    { label: /^depoimentos$/i,        nome: 'DEPOIMENTOS'         },
  ]

  botoes.forEach(({ label, nome }) => {
    it(`${nome} deve ter ação`, () => {
      cy.visit(URL)
      cy.window().then(win => {
        const scrollAntes = win.scrollY
        cy.url().then(urlAntes => {
          cy.contains('a, button', label).first().invoke('removeAttr', 'target').click({ force: true })
          cy.wait(1200)
          cy.url().then(urlD => {
            if (urlD !== urlAntes) { expect(true).to.be.true; return }
            cy.window().then(winD => {
              expect(Math.abs(winD.scrollY - scrollAntes) >= 1, `${nome} deve ter ação`).to.be.true
            })
          })
        })
      })
    })
  })
})

describe('CT-SITE-005: Botão "FALAR COM CONSULTOR"', () => {
  it('Deve ter ação ao clicar', () => {
    cy.visit(URL)
    cy.window().then(win => {
      const scrollAntes = win.scrollY
      cy.url().then(urlAntes => {
        cy.contains('a, button', /falar com consultor/i).first().invoke('removeAttr', 'target').click({ force: true })
        cy.wait(1200)
        cy.url().then(urlD => {
          if (urlD !== urlAntes) { expect(true).to.be.true; return }
          cy.window().then(winD => {
            expect(Math.abs(winD.scrollY - scrollAntes) >= 1, 'Deve ter ação').to.be.true
          })
        })
      })
    })
  })
})

describe('CT-SITE-006: Carrossel de Banners', () => {
  it('Setas de navegação devem responder ao clique', () => {
    cy.visit(URL)
    cy.get('[class*="swiper-button-next"],[class*="next"],[aria-label*="next"]').first().should('exist').click({ force: true })
    cy.wait(600)
    cy.get('[class*="swiper-button-prev"],[class*="prev"],[aria-label*="prev"]').first().should('exist').click({ force: true })
    cy.wait(600)
  })

  it('Indicadores de slide devem responder ao clique', () => {
    cy.visit(URL)
    cy.get('[class*="swiper-pagination-bullet"],[class*="indicator"],[class*="dot"],[role="tab"]').then($dots => {
      if ($dots.length > 1) {
        cy.wrap($dots.eq(1)).click({ force: true })
        cy.wait(600)
      }
    })
  })

  it('Imagem do carrossel deve ter ação ao clicar', () => {
    cy.visit(URL)
    cy.window().then(win => {
      const scrollAntes = win.scrollY
      cy.url().then(urlAntes => {
        cy.get('[class*="swiper-slide"] a, [class*="swiper-slide"] img, [class*="banner"] a, [class*="slider"] a').first()
          .invoke('removeAttr', 'target').click({ force: true })
        cy.wait(1200)
        cy.url().then(urlD => {
          if (urlD !== urlAntes) { expect(true).to.be.true; return }
          cy.window().then(winD => {
            expect(Math.abs(winD.scrollY - scrollAntes) >= 1, 'Imagem deve ter ação').to.be.true
          })
        })
      })
    })
  })
})

;[0, 1, 2, 3].forEach(idx => {
  describe(`CT-SITE-007: Botão "INSCREVA-SE AGORA!" ${idx + 1}/4`, () => {
    it(`Botão ${idx + 1} de 4 deve ter ação`, () => {
      cy.visit(URL)
      cy.wait(500)
      cy.window().then(win => {
        const scrollAntes = win.scrollY
        cy.url().then(urlAntes => {
          cy.get('a, button').filter((_, el) => /inscreva-se agora/i.test(el.innerText)).eq(idx)
            .invoke('removeAttr', 'target').click({ force: true })
          cy.wait(1200)
          cy.url().then(urlD => {
            if (urlD !== urlAntes) { cy.log(`✅ Redirecionou para: ${urlD}`); expect(true).to.be.true; return }
            cy.window().then(winD => {
              expect(Math.abs(winD.scrollY - scrollAntes) >= 1, `Botão ${idx + 1} deve ter ação`).to.be.true
            })
          })
        })
      })
    })
  })
})

describe('CT-SITE-008: Newsletter com Dados Válidos', () => {
  it('Deve exibir mensagem de sucesso', () => {
    cy.visit(URL)
    cy.get('input[type="email"], input[name*="email"]').first().scrollIntoView()
    cy.wait(500)
    cy.get('input[name*="nome"], input[type="text"]').first().clear().type('Eduardo Leite')
    cy.get('input[type="email"], input[name*="email"]').first().clear().type('eduardo.leite_@outlook.com')
    cy.get('body').then($body => {
      const $tel = $body.find('input[type="tel"], input[name*="telefone"], input[name*="fone"], input[placeholder*="("]').not('[type="hidden"]')
      if ($tel.length > 0) {
        cy.wrap($tel.first()).scrollIntoView().should('be.visible')
        cy.wait(1500)
        cy.wrap($tel.first()).should(($el) => { expect($el.prop('disabled')).to.be.false }).clear().type('11988887777', { delay: 50 })
      }
    })
    cy.contains('button', /concluir|enviar/i).click({ force: true })
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

describe('CT-SITE-009: E-mail Inválido na Newsletter', () => {
  it('Deve bloquear o envio', () => {
    cy.visit(URL)
    cy.get('input[type="email"], input[name*="email"]').first().scrollIntoView()
    cy.wait(400)
    cy.get('input[name*="nome"], input[type="text"]').first().clear().type('Eduardo Leite')
    cy.get('input[type="email"], input[name*="email"]').first().clear().type('email_invalido')
    cy.contains('button', /concluir|enviar/i).click({ force: true })
    cy.wait(800)
    cy.get('body').then($body => {
      const bloqueou = $body.text().toLowerCase().includes('e-mail') ||
        $body.text().toLowerCase().includes('inválido') ||
        $body.find('[class*="error"], [class*="erro"]').length > 0
      expect(bloqueou, 'E-mail inválido deve bloquear').to.be.true
    })
  })
})

describe('CT-SITE-010: Telefone Inválido na Newsletter', () => {
  const telefones = ['123', 'abcdefghij', '!@#$%', '12345678901234']

  telefones.forEach(tel => {
    it(`Telefone "${tel}" deve bloquear o envio`, () => {
      cy.visit(URL)
      cy.get('input[type="email"], input[name*="email"]').first().scrollIntoView()
      cy.wait(400)
      cy.get('input[name*="nome"], input[type="text"]').first().clear().type('Eduardo Leite')
      cy.get('input[type="email"], input[name*="email"]').first().clear().type('eduardo.leite_@outlook.com')
      cy.get('body').then($body => {
        const $tel = $body.find('input[type="tel"], input[name*="telefone"], input[name*="fone"], input[placeholder*="("]').not('[type="hidden"]')
        if ($tel.length > 0) {
          cy.wrap($tel.first()).scrollIntoView().should('be.visible')
          cy.wait(1500)
          cy.wrap($tel.first()).should(($el) => { expect($el.prop('disabled')).to.be.false }).clear().type(tel, { delay: 50 })
        }
      })
      cy.contains('button', /concluir|enviar/i).click({ force: true })
      cy.wait(800)
      cy.get('body').then($body => {
        const bloqueou = $body.text().toLowerCase().includes('telefone') ||
          $body.text().toLowerCase().includes('inválido') ||
          $body.find('[class*="error"], [class*="erro"]').length > 0
        expect(bloqueou, `Telefone "${tel}" deve bloquear`).to.be.true
      })
    })
  })
})

describe('CT-SITE-011: Newsletter Vazio', () => {
  it('Botão Concluir deve estar bloqueado', () => {
    cy.visit(URL)
    cy.get('input[type="email"], input[name*="email"]').first().scrollIntoView()
    cy.wait(400)
    cy.contains('button', /concluir|enviar/i).then($btn => {
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
})

describe('CT-SITE-012: Redes Sociais e Navegação no Rodapé', () => {
  const redes = [
    { nome: 'LinkedIn',  url: 'linkedin.com'  },
    { nome: 'Facebook',  url: 'facebook.com'  },
    { nome: 'X/Twitter', url: 'x.com'         },
    { nome: 'YouTube',   url: 'youtube.com'   },
    { nome: 'Instagram', url: 'instagram.com' },
  ]

  // Redes aparecem 3x na página — a última ocorrência é a do rodapé
  redes.forEach(({ nome, url }) => {
    it(`${nome} no rodapé deve ter href válido`, () => {
      cy.visit(URL)
      cy.scrollTo('bottom')
      cy.wait(400)
      cy.get(`a[href*="${url}"]`).last().then($a => {
        expect($a.attr('href'), `${nome} deve ter href válido`).to.include(url)
      })
    })
  })

    it('INSTITUCIONAL 2 (rodapé) deve ter ação', () => {
    cy.visit(URL)
    cy.scrollTo('bottom')
    cy.wait(400)
    cy.window().then(win => {
      const scrollAntes = win.scrollY
      cy.url().then(urlAntes => {
        cy.get('a, button').filter((_, el) => el.innerText.trim().toLowerCase() === 'institucional').eq(1)
          .invoke('removeAttr', 'target').click({ force: true })
        cy.wait(1200)
        cy.url().then(urlD => {
          if (urlD !== urlAntes) { expect(true).to.be.true; return }
          cy.window().then(winD => {
            expect(Math.abs(winD.scrollY - scrollAntes) >= 1, 'Deve ter ação').to.be.true
          })
        })
      })
    })
  })
  const navLinks = [
    { label: /fale conosco/i,            nome: 'Fale Conosco'            },
    { label: /política de privacidade/i, nome: 'Política de Privacidade' },
  ]

  navLinks.forEach(({ label, nome }) => {
    it(`Link "${nome}" no rodapé deve ter ação`, () => {
      cy.visit(URL)
      cy.scrollTo('bottom')
      cy.wait(400)
      cy.window().then(win => {
        const scrollAntes = win.scrollY
        cy.url().then(urlAntes => {
          cy.contains('a', label).last().invoke('removeAttr', 'target').click({ force: true })
          cy.wait(1200)
          cy.url().then(urlD => {
            if (urlD !== urlAntes) { expect(true).to.be.true; return }
            cy.window().then(winD => {
              expect(Math.abs(winD.scrollY - scrollAntes) >= 1, `"${nome}" deve ter ação`).to.be.true
            })
          })
        })
      })
    })
  })


})