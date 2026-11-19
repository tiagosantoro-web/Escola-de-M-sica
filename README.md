# Music Ville Escola de Música — site

Repositório: `tiagosantoro-web/Escola-de-M-sica` (`main` = código, `gh-pages` = site publicado).

No ar: https://tiagosantoro-web.github.io/Escola-de-M-sica/

Página única da Music Ville Escola de Música, em Alphaville, criada pela Solodev Studio. HTML, CSS e JavaScript puros, sem instalação nem etapa de build.

## Abrir e editar

Abra `index.html` no navegador. As regras de código estão em `AGENTS.md`.

## Estrutura

- `index.html`: página completa, com blocos identificados por comentários.
- `css/style.css`: estilos organizados por bloco, com a responsividade no final.
- `js/script.js`: configuração do cliente, menu, WhatsApp, formulário de interesse e animações.
- `assets/images/`: fotos em WebP (15–45 KB cada), logo (`logo-music-ville.webp`, fundo transparente) e ícones da aba.
- `assets/fonts/`: Bodoni Moda (títulos) e Manrope (textos), licença SIL Open Font.
- `_fontes/`: fotos originais, a imagem do logo enviada pelo cliente e o script de recorte (`_fontes/logo/recorte-logo.cjs`). Fica fora do Git.

## Identidade

O logo enviado é vermelho e preto. Por isso o site usa:

- **Base:** preto.
- **Botões de conversão:** vermelho do logo.
- **Detalhes finos:** champagne (títulos em itálico, linhas e ícones), como pedia o briefing.
- **Seções claras:** marfim e areia.

No topo, o logo aparece grande e "pendurado" abaixo da barra. Ao rolar, ele encolhe para caber no cabeçalho.

## Seções

1. **Topo:** título com destaque dourado, foto em moldura de arco, pauta com notas flutuando e equalizador animado.
2. **Faixa rolante** com os instrumentos.
3. **A escola:** texto do cliente, duas fotos e selo "1 a 1".
4. **Cursos:** 7 cartões, cada um com o botão "Quero aprender". No celular viram um carrossel com deslize.
5. **Para todas as idades:** crianças, jovens e adultos.
6. **Diferenciais:** os 6 itens do briefing, com ícones de traço fino.
7. **Aula experimental gratuita:**
   - Botão principal para o WhatsApp.
   - Formulário de interesse (nome, curso, para quem é a aula, observações). Ele monta a mensagem e abre o WhatsApp da escola. Nada é salvo pelo site.
8. **Localização:** endereço, Google Maps interativo e botão "Abrir rota".
9. **Chamada final**, **rodapé** e **botão flutuante** de WhatsApp em todas as telas.

## Configuração

Edite o início de `js/script.js`:

- `whatsappNumber`: DDI + DDD + número, só dígitos (ex.: `5511999999999`).
  - Enquanto estiver vazio, os botões levam ao formulário. O "Quero aprender" já deixa o curso escolhido.
  - Nesse caso, o envio do formulário avisa que o WhatsApp ainda não foi configurado.
- `messages`: textos que cada botão envia. `{curso}` é trocado pelo nome do curso.
- `instagramUrl`: link do perfil. Vazio = item oculto no rodapé.

## Pendências do cliente

Procure `PENDENTE` nos arquivos.

- **WhatsApp:** obrigatório para os botões e o formulário funcionarem.
- **Arquivo original do logo** (PNG transparente, SVG, AI ou PDF):
  - O logo atual foi recortado de uma foto de fachada (mockup com parede de tijolos e marca d'água "HG COMPANY").
  - Tem 399 × 467 px e alguns riscos finos do rejunte por dentro do anel.
  - Com o arquivo original, é só substituir `assets/images/logo-music-ville.webp` e os ícones.
- **Fotos reais da escola**, dos professores e das aulas. As atuais são ilustrativas (veja "Créditos das fotos").
- **Horários de atendimento**, CEP e telefone, para a página e os dados estruturados.
- **Instagram.**
- **Depoimentos reais:** a seção não foi criada para não usar avaliações fictícias.
- **Domínio:** necessário para `canonical`, `og:url`, `sitemap.xml` e para a imagem de compartilhamento com URL absoluta.

## Créditos das fotos

Todas vêm do Unsplash, sob a [Unsplash License](https://unsplash.com/license): uso comercial gratuito, sem atribuição obrigatória. Recortadas e convertidas para WebP. Para achar a original, use `https://unsplash.com/photos/<id>`.

| Arquivo | ID Unsplash |
| --- | --- |
| pianista-silhueta-janela | 6WRFqplPs4s |
| maos-no-piano-de-cauda | HZAPfcEwTaM |
| professor-e-aluna-no-metalofone | bGdp2ikEDmA |
| aluno-ao-teclado | hS6kmkt8ReI |
| curso-piano | OswWE4tMMgY |
| curso-violao-e-guitarra | iB_h6EFRiKY |
| curso-bateria | 0DuXYOvBDeo |
| curso-canto | uSC6z5ajEVM |
| curso-saxofone | 0h2F-Ib2Zdo |
| curso-musicalizacao-infantil | uNWuSF4WwXc |
| curso-outros-instrumentos | -UBiTsLngno |
| idade-criancas | jUMe8j_uCUI |
| idade-jovens | -LNQDiwYqFY |
| idade-adultos | ycEXIYZjiTk |
| aula-experimental-saxofonista | mI1FkOY_r30 |
| chamada-final-pianista | oSq5ejr23so |

## Testes realizados (19/11/2026)

- **Rolagem lateral:** nenhuma em 320, 375, 480, 768, 1024 e 1440 px.
- **Imagens:** as 18 carregam (16 fotos e o logo, que aparece no cabeçalho e no rodapé).
- **Cabeçalho:**
  - No topo, o logo tem 86 px no celular e 108 px no desktop.
  - Ao rolar, encolhe para cerca de 62 px, dentro da barra, que fica opaca.
- **Menu do celular:** abre, fecha ao tocar num link e fecha com Esc.
- **Sem WhatsApp configurado:**
  - O "Quero aprender" preenche o curso no formulário.
  - O envio avisa que o número não foi configurado.
- **Validação:** nome e curso são obrigatórios.
- **Com número de teste:**
  - Os links `wa.me` saem com a mensagem certa: geral, por curso e do formulário.
  - Os caracteres `<` e `>` são removidos da mensagem.
- **Mapa:** carrega o Centro Comercial Alphaville.
- **Revisão visual:** prints em 375, 768 e 1440 px.

Lighthouse ainda não foi executado; rodar depois da publicação.
