# AGENTS.md

Site institucional da Music Ville Escola de Música (Alphaville), criado pela Solodev Studio. Leve, sem build e pronto para adaptação ao GreatPages.

## Regras gerais

- HTML, CSS e JavaScript puros, sem bibliotecas ou frameworks.
- Todas as classes personalizadas começam com `sd-`.
- Não estilizar o layout com seletores globais (`*`, `body`); ajustes da página ficam em `.sd-page`.
- Cada bloco principal tem comentários de abertura e fechamento.
- Animações apenas com `transform` e `opacity`, respeitando `prefers-reduced-motion`.
- Entrada das seções com `IntersectionObserver`.
- Imagens em WebP, com dimensões reais, `alt` descritivo, `decoding="async"` e `loading="lazy"` fora da primeira tela.
- Fontes hospedadas no próprio projeto (`assets/fonts/`), sem chamadas externas.
- Sem rolagem horizontal; validar em 320, 375, 480, 768, 1024 e 1440px.

## Identidade

- Azul-marinho profundo (`#0b1424`), champagne (`#d9bd84`), marfim (`#f8f4ed`) e areia (`#efe7da`).
- Pequenos acentos coloridos só nos detalhes dos cursos e no equalizador do topo.
- Títulos em Bodoni Moda; textos em Manrope. Números e rótulos sempre em Manrope.
- Moldura em arco (`.sd-arch`) é o elemento de assinatura: usar nas fotos de destaque.

## Conteúdo

- Não inventar informações do cliente: telefone, horários, preços, depoimentos, avaliações, número de alunos e certificações só entram quando fornecidos.
- Trechos pendentes ficam marcados com `<!-- PENDENTE: ... -->` e listados no README.
- As fotos atuais são de banco de imagens (Unsplash), ilustrativas. Não descrevê-las como fotos da escola; substituir por fotos reais quando o cliente enviar.

## Configuração

- WhatsApp, mensagens e Instagram ficam em `sdConfig`, no início de `js/script.js`.
- Todos os botões de WhatsApp leem dessa configuração (`data-whatsapp-link`, `data-message` ou `data-course`).
