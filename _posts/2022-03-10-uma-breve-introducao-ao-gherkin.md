---
layout: post
title: Uma breve introdução ao Gherkin
subtitle:
cover-img:
share-img:
published: true
readtime: true
tags: [gherkin, arquitetura, requisitos]
---

> Este post vai abordar o uso da Linguagem Gherkin e como ele torna mais fácil a colaboração entre diferentes profissionais dentro de um time.

Gherkin é uma linguagem que ajuda a estruturar textos simples que definem uma regra de negócio ou cenário de uso. Então ao invés de escrever em texto corrido ou listar requisitos e funcionalidades, pode-se usar o Gherkin para estruturar e contextualizar o texto tornando-o de fácil entendimento para todos os integrantes do projeto.

Tomemos como exemplo o requisito **login**. Muitas aplicações hoje em dia disponibilizam essa funcionalidade para que usuários possam ter acesso a funcionalidades privadas. Se formos capturar a funcionalidade login em Gherkin, precisamos ter em mente primeiro como ela seria utilizada na prática.

Assim, podemos capturar em Gherkin o seguinte:

```gherkin

Funcionalidade: Login

  Cenário: O usuário faz login
    Dado um usuário já cadastrado no sistema
    Quando insere as informações necessárias (login, senha)
      E clicar no botão logar
    Então o sistema valida as informações
      E leva o usuário à página principal

```

Você pode estar pensando: "Não seria mais fácil escrever o que precisa ser feito em frases simples para não perder tempo e partir logo pro desenvolvimento?" A resposta é depende, como sempre.

Não há nada de errado em simplesmente escrever de forma curta e sucinta os requisitos. Porém o que pode parecer simples de primeira, vai ficando trabalhoso à medida que os desenvolvedores precisam entrar em cena.

Ao receberem os requisitos escritos de forma muito simplista, é natural que os desenvolvedores tenham dúvidas e perguntem mais a respeito. E é nesse momento que o time começa a perder informações valiosa, pois as perguntas são feitas em chats e conversas rápidas, que logo vão dando lugar a outros assuntos, e tudo que foi conversado aparentemente se perde (se for por troca de msg ainda tem o histórico, mas não é conveniente pois é preciso lembrar que a informação está ali e também nem todos vão saber disso).

Tal perda de informações (como requisitos, explicações e decisões) se torna prejudicial no longo prazo, principalmente quando o time começa a crescer, a complexidade aumenta, e as pessoas que estavam no início não estão mais no projeto.

Por isso o Gherkin pode ser usado idealmente durante três momentos:
- Levantamento e Análise de Requisitos
- Documentação
- Teste

Embora os três momentos que estou citando sejam os mais ideais para usar Gherkin, pode haver outros momentos dentro do workflow do seu time que faça sentido usá-lo.

Claro, não quer dizer que tudo é um mar de rosas. Essa ferramenta é apenas uma forma de estruturar requisitos em texto, e não garante que tudo seja capturado facilmente. Como toda ferramenta, ela exige prática e estudo, e uma constante avaliação para identificar o que funciona e o que não funciona.

Eu, por exemplo, não uso 100% da totalidade do Gherkin. Às vezes na pressa só escrevo o enunciado do cenário de forma declarativa primeiro, ai depois eu volto e escrevo os passos. Pois aprendi que nem todo cenário vai ser extremamente relevante, e eu preciso dar mais foco aos cenários "chave" que mais capturam a essência do requisito.

Outro importante fato sobre o Gherkin é que a colaboração entre diferentes profissionais fica mais fácil quando se emprega seu uso, pois o foco está em descrever usos do requisito ou funcionalidade.

Esse foco no "uso" ajuda a abstrair melhor a ideia do requisito e faz com que todos consigam falar a mesma língua.  Assim, nenhum aspecto muito técnico se fará presente e se tornará uma barreira na comunicação entre os integrantes do projeto.

Voltemos ao exemplo do Gherkin da funcionalidade login. Nota-se que não está sendo mencionado em qual linguagem de programação isso será implementado, qual framework ou arquitetura será utilizado, e nem onde será hospedado a aplicação.

Então, podemos ver que o Gherkin também é bastante inclusivo, o que o torna a ferramenta ideal para estabelecer um senso e linguagem em comum dentro do time ou projeto (que é algo de extrema importância, mais importante do que os detalhes técnicos do projeto).


> Nota: Gherkin é mais utilizado em inglês, porém possui uma tradução oficial que pode ser conferida aqui https://cucumber.io/docs/gherkin/languages/
