# Arquiteto# Rafael Motta Arquitetura & Design — Site Institucional

## 🏛️ Sobre o Projeto

Site institucional sofisticado e moderno para escritório de arquitetura, desenvolvido com foco em identidade premium, conversão de contatos e transmissão de calma e conforto por meio de:

- **Paleta de cores terrosas e naturais** (areia, terracota suave, sage, carvão)
- **Tipografia refinada** (Cormorant Garamond serif + Jost sans-serif)
- **Animações fluidas** e transições suaves
- **Layout editorial** com hierarquia visual clara

---

## ✅ Funcionalidades Implementadas

### Navegação & UX
- Header fixo com transição ao scroll (transparente → vidro fosco)
- Menu mobile responsivo com animação
- Cursor personalizado (desktop)
- Scroll suave para âncoras
- Indicador de seção ativa na navegação
- Botão "Voltar ao topo"
- Preloader animado com progresso

### Seções do Site
1. **Hero** — imagem full-screen com overlay, título impactante, CTA duplo e estatísticas animadas
2. **Sobre** — apresentação do arquiteto com valores e badge de prêmio
3. **Serviços** — 6 cards com hover interativo (Residencial, Comercial, Interiores, Customizados, Biofílica, 3D)
4. **Portfólio** — grid masonry com 6 projetos e filtros por categoria (Todos / Residencial / Comercial / Interiores)
5. **Processo** — 5 etapas numeradas com hover
6. **Banner Parallax** — citação inspiradora com imagem de fundo
7. **Depoimentos** — slider com 4 depoimentos, navegação por botões, dots e touch/swipe, auto-play
8. **Contato** — formulário completo com validação e persistência via API + informações de contato
9. **Footer** — 4 colunas com navegação, serviços, contato e redes sociais

### Interatividade
- Animações de entrada (reveal) ao rolar a página
- Contador animado de estatísticas (14+ anos, 230+ projetos, 18 prêmios)
- Filtro de portfólio com transição suave
- Slider de depoimentos com suporte a touch
- Formulário com validação, estado de loading e mensagem de sucesso
- Efeito parallax no banner central

### Dados
- Formulário salva contatos na tabela `contatos` via RESTful Table API

---

## 📁 Estrutura de Arquivos

```
index.html          — Página principal (single-page)
css/
  style.css         — Estilos completos (paleta, componentes, responsivo)
js/
  main.js           — JavaScript (cursor, header, slider, formulário, animações)
README.md           — Documentação do projeto
```

---

## 🎨 Paleta de Cores

| Variável          | Hex       | Uso                        |
|-------------------|-----------|----------------------------|
| `--clr-bg`        | `#F8F4EE` | Fundo principal            |
| `--clr-bg-alt`    | `#FDFAF5` | Fundo alternativo          |
| `--clr-bg-dark`   | `#1E1C1A` | Footer e áreas escuras     |
| `--clr-primary`   | `#B5956A` | Terracota/areia — destaques|
| `--clr-accent`    | `#7E9B7E` | Verde sage — complementar  |
| `--clr-text`      | `#2C2825` | Texto principal — carvão   |

---

## 🗃️ Modelo de Dados

### Tabela: `contatos`
| Campo       | Tipo       | Descrição                          |
|-------------|------------|-------------------------------------|
| id          | text       | Identificador único                 |
| nome        | text       | Nome completo do cliente            |
| email       | text       | E-mail de contato                   |
| telefone    | text       | Telefone (opcional)                 |
| tipo        | text       | Categoria do projeto                |
| mensagem    | rich_text  | Descrição do projeto                |
| data_envio  | datetime   | Timestamp de envio                  |

---

## 🔗 URIs Funcionais

| Rota       | Descrição                          |
|------------|------------------------------------|
| `/`        | Página principal (index.html)      |
| `/#sobre`      | Seção Sobre                    |
| `/#servicos`   | Seção Serviços                 |
| `/#portfolio`  | Seção Portfólio                |
| `/#processo`   | Seção Processo de Trabalho     |
| `/#depoimentos`| Seção Depoimentos              |
| `/#contato`    | Seção Contato                  |

**API:**
- `GET  tables/contatos` — Listar contatos recebidos
- `POST tables/contatos` — Salvar novo contato (usado pelo formulário)

---

## 🚀 Próximos Passos Recomendados

1. **Página de Projeto Individual** — detalhe de cada projeto do portfólio
2. **Blog / Artigos** — seção de conteúdo sobre arquitetura e tendências
3. **Galeria de Imagens** — lightbox para visualização ampliada dos projetos
4. **Integração WhatsApp** — botão flutuante para contato direto
5. **Google Analytics** — rastreamento de visitantes e conversões
6. **SEO avançado** — meta tags Open Graph, Schema.org para negócio local
7. **Painel de Leads** — página interna para visualizar contatos recebidos

---

## 📱 Responsividade

- ✅ Desktop (1200px+)
- ✅ Laptop (900px–1200px)
- ✅ Tablet (640px–900px)
- ✅ Mobile (< 640px)

---

*Desenvolvido com HTML5, CSS3 e JavaScript puro. Sem dependências de framework.*
