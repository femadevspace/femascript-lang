<h1 align='center'>FemaScript Lang</h1>

FemaScript (de codenome 'Almiritmo') é uma linguagem de programação desenvolvida para a disciplina de Algoritmo e Estrutura de Dados na [FEMA](https://fema.edu.br). Inspirada no Portugol, a FemaScript vem com nossa própria "cara", ajustada para melhor atender às necessidades do currículo acadêmico e facilitar o aprendizado dos alunos em seus primeiros passos na programação.

<picture>
  <source srcset="https://github.com/femadevspace/femascript-lang/raw/HEAD/assets/femascript-banner-dark.png#gh-dark-mode-only" media="(prefers-color-scheme: dark)">
  <img src="https://github.com/femadevspace/femascript-lang/raw/HEAD/assets/femascript-banner-light.png#gh-light-mode-only" alt="Banner da linguagem FemaScript">
</picture>

<h2 align='center'>🔭 Visão Geral</h2>

FemaScript foi projetada para ajudar os alunos a aprender algoritmos e estruturas de dados de maneira intuitiva e acessível. Com sintaxe clara e recursos pedagógicos, os alunos podem se concentrar na lógica de programação antes de explorar o universo infindável de possibilidades que outras linguagens de programação podem oferecer.

Neste repositório você encontrará o código-fonte da extensão para o [Visual Studio Code](https://code.visualstudio.com/) (vscode) que oferece suporte a FemaScript, proporcionando syntax highlighting (realce/colorização de sintaxe), formatação automática e, em breve, capacidades de compilação para outras linguagens, permitindo a execução de algoritmos desenvolvidos em FemaScript.

<h2 align='center'>🌟 Recursos</h2>

- **Realce de Sintaxe:** A extensão para o VSCode oferece _syntax highlighting_ para tornar o código mais legível.
- **Formatador de Código:** Ajusta automaticamente o estilo do código para manter a consistência.
  - **Windows:** Shift + Alt + F
  - **MacOS:** Shift + Option + F
  - **Linux:** Ctrl + Shift + I
- **Erro de Sintaxe em Tempo Real:** Indicação de erros de sintaxe enquanto você digita, tornando o processo de desenvolvimento mais eficiente.
- **Snippets:** Blocos de código predefinidos para acelerar a escrita de estruturas comuns da linguagem..
- **🎯 Futuramente... Compilador Multilíngue:** Planejamos adicionar suporte para compilar FemaScript em outras linguagens, permitindo que os alunos executem seus algoritmos em diferentes ambientes.

<h2 align='center'>🚀 Instalação</h2>

<p align='center'>
<img src="https://img.shields.io/visual-studio-marketplace/v/fema-devspace.femascript-lang?style=for-the-badge&label=vs%20marketplace&color=144E8C&link=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dfema-devspace.femascript-lang" alt="Badge da versão atual da extensão">
<img src="https://img.shields.io/visual-studio-marketplace/i/fema-devspace.femascript-lang?style=for-the-badge&label=instala%C3%A7%C3%B5es&color=144E8C&link=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dfema-devspace.femascript-lang" alt="Badge da quantidade de instalações da extensão">
<img src="https://img.shields.io/visual-studio-marketplace/d/fema-devspace.femascript-lang?style=for-the-badge&label=downloads&color=144E8C&link=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dfema-devspace.femascript-lang" alt="Badge da quantidade de downloads da extensão">
</p>

Você pode acessar diretamente o [Visual Studio MarketPlace](https://marketplace.visualstudio.com/items?itemName=fema-devspace.femascript-lang) para instalar ou baixar a extensão entrando no link anterior ou em qualquer badge (botão) a cima.

Para instalar via [command line](https://code.visualstudio.com/docs/editor/command-line), você deve ter instalado o comando `code` acessando o link anterior. Após isso, execute o seguinte comando no terminal:

```sh
code --install-extension fema-devspace.femascript-lang
```

<h2 align='center'>🧑🏽‍🚀 Primeiros Passos</h2>
<h3 align='center'>Escrevendo seu Primeiro Programa em FemaScript</h3>

Você já deve estar familiarizado com a estrutura básica de um algoritmo. Agora, vamos transferir esse conhecimento para o ambiente digital! Após instalar a extensão, crie um arquivo com o nome de sua escolha, mas certifique-se de que ele tenha uma das seguintes extensões: `.alg`, `.algoritmo`, `.algorithm`, `.fema` ou `.femascript`.

Se tudo estiver correto, você verá a logo da <img src="https://github.com/femadevspace/femascript-lang/raw/HEAD/assets/femascript-logo.png" alt="Logo da linguagem FemaScript" height="20"> FEMA no ícone do arquivo. Agora, vamos inserir a estrutura básica do seu algoritmo

![Exemplo de código em FemaScript](https://github.com/femadevspace/femascript-lang/raw/HEAD/assets/screenshots/example-code.png)

O algoritmo para 'calcular circunferência' apresentado acima inclui vários elementos essenciais: o nome do algoritmo, a inicialização de constantes e variáveis, a lógica do cálculo e o uso de funções como "LEIA" e "IMPRIMA". Para explorar mais sobre as funcionalidades da linguagem, incluindo sintaxes, palavras-chave e outros detalhes, consulte a Wiki da linguagem **(🚧 em construção 🚧)**.

Enquanto a Wiki não é publicada, aqui está uma tabela de instruções que você utilizar.

<h3 align='center'>Instruções, suas alternativas e sinônimos</h3>
<table align='center'>
  <thead>
    <tr>
      <th>Instrução</th>
      <th>Alternativas & Sinônimos</th>
    </tr>
  </thead>
 <tbody>
    <tr><td colspan=2 align='center'>🔑 Palavras-chaves</td></tr>
    <tr><td><code>ALGORITMO</code></td><td><code>ALGORITHM</code></td></tr>
    <tr><td><code>CONST</code></td><td><code>CONSTANTE</code> | <code>CONSTANTES</code> | <code>CONSTANT</code> | <code>CONSTANTS</code></td></tr>
    <tr><td><code>VAR</code></td><td><code>VARIÁVEIS</code> | <code>VARIABLES</code></td></tr>
    <tr><td><code>INÍCIO</code></td><td><code>START</code></td></tr>
    <tr><td><code>FIM</code></td><td><code>END</code></td></tr>
    <tr><td><code>SE</code></td><td><code>IF</code></td></tr>
    <tr><td><code>ENTÃO</code></td><td><code>THEN</code></td></tr>
    <tr><td><code>SENÃO</code></td><td><code>ELSE</code></td></tr>
    <tr><td><code>FAÇA</code></td><td><code>DO</code></td></tr>
    <tr><td><code>ENQUANTO</code></td><td><code>WHILE</code></td></tr>
    <tr><td><code>PARA</code></td><td><code>FOR</code></td></tr>
    <tr><td><code>AVALIE</code></td><td><code>ANALISE</code> | <code>CHECK</code> | <code>TESTE</code> | <code>TEST</code></td></tr>
    <tr><td><code>QUANDO</code></td><td><code>CASO</code> | <code>CASE</code> | <code>WHEN</code></td></tr>
    <tr><td><code>CASO_CONTRÁRIO</code></td><td><code>CASOCONTRÁRIO</code> | <code>PADRÃO</code> | <code>DEFAULT</code></td></tr>
    <tr><td><code>NÃO</code></td><td><code>NOT</code></td></tr>
    <tr><td><code>OU</code></td><td><code>OR</code></td></tr>
    <tr><td><code>E</code></td><td><code>AND</code></td></tr>
    <tr><td><code>IMPRIMA</code></td><td><code>IMRPIMIR</code> | <code>PRINT</code> | <code>ESCREVA</code> | <code>ESCREVER</code> | <code>WRITE</code></td></tr>
    <tr><td><code>LER</code></td><td><code>LEIA</code> | <code>READ</code></td></tr>
    <tr><td colspan=2 align='center'>🔎 Tipos de Variáveis</td></tr>
    <tr><td><code>real</code></td><td><code>reais</code> | <code>reals</code></td></tr>
    <tr><td><code>inteiro</code></td><td><code>int</code> | <code>integer</code> | <code>integers</code> | <code>inteiros</code></td></tr>
    <tr><td><code>caractere</code></td><td><code>char</code> | <code>character</code></td></tr>
    <tr><td><code>texto</code></td><td><code>textos</code> | <code>text</code> | <code>texts</code> | <code>string</code> | <code>strings</code></td></tr>
    <tr><td><code>lógico</code></td><td><code>lógicos</code> | <code>bool</code> | <code>bools</code> | <code>boolean</code> | <code>booleans</code> | <code>booleano</code> | <code>booleanos</code> | <code>logic</code> | <code>logical</code> | <code>logicals</code></td></tr>
    <tr><td><code>arranjo</code></td><td><code>array</code> | <code>lista</code> | <code>list</code> | <code>matrix</code> | <code>matriz</code></td></tr>
    <tr><td><code>de</code></td><td><code>of</code></td></tr>
    <tr><td colspan=2 align='center'>🔠 Literais</td></tr>
    <tr><td><code>verdadeiro</code></td><td><code>true</code></td></tr>
    <tr><td><code>falso</code></td><td><code>false</code></td></tr>
    <tr><td><code>nulo</code></td><td><code>null</code></td></tr>
    <tr><td colspan=2 align='center'>🔣 Símbolos</td></tr>
    <tr><td>Atribuição</td><td><code><-</code> | <code>++</code> | <code>--</code></td></tr>
    <tr><td>Operadores Aritméticos</td><td><code>+</code> | <code>-</code> | <code>*</code> | <code>/</code> | <code>%</code></td></tr>
    <tr><td>Operadores Relacionais</td><td><code>=</code> | <code>!=</code> | <code>>=</code> | <code>></code> | <code><=</code> | <code><</code></td></tr>
    <tr><td>Operadores Lógicos</td><td><code>~</code> | <code>!</code> | <code>?</code> | <code>&</code> | <code>&&</code> | <code>|</code> | <code>||</code></td></tr>
    <tr><td colspan=2 align='center'>🪄 Extras</td></tr>
    <tr>
      <td>Comentários</td>
      <td>
        Em linha: <code>// comentário</code><br>
        Em bloco: <code>/* comentário */</code>
      </td>
    </tr>
  </tbody>
</table>

<h3 align='center'>Estrutura de Declarações (statements)</h3>
<table align='center'>
  <thead>
    <tr>
      <th>Declaração</th>
      <th>Estrutura</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Se/Senão (if/else)</td>
      <td><img src="https://github.com/femadevspace/femascript-lang/raw/HEAD/assets/screenshots/if-else-statement.png" alt="Exemplo da estrutura de uma declaração se/então"></td>
    </tr>
    <tr>
      <td>Enquanto/Faça (while/do)</td>
      <td><img src="https://github.com/femadevspace/femascript-lang/raw/HEAD/assets/screenshots/do-while-statement.png" alt="Exemplo da estrutura de uma declaração faça/enquanto">
      <img src="https://github.com/femadevspace/femascript-lang/raw/HEAD/assets/screenshots/while-do-statement.png" alt="Exemplo da estrutura de uma declaração enquanto/faça"></td>
    </tr>
    <tr>
      <td>Para (for)</td>
      <td><img src="https://github.com/femadevspace/femascript-lang/raw/HEAD/assets/screenshots/for-statement.png" alt="Exemplo da estrutura de uma declaração para (for statement)"></td>
    </tr>
    <tr>
      <td>Avalie (switch)</td>
      <td><img src="https://github.com/femadevspace/femascript-lang/raw/HEAD/assets/screenshots/switch-statement.png" alt="Exemplo da estrutura de uma declaração avalie (switch statement)"></td>
    </tr>
  </tbody>
</table>

<h2 align='center'>🤝 Contribuição</h2>

Estamos abertos a contribuições de alunos e interessados. Para contribuir:

1. Faça um fork do projeto.
2. Crie um branch para suas modificações (`git checkout -b minha-modificacao`).
3. Envie suas modificações para o branch (`git push origin minha-modificacao`).
4. Abra um [pull request](https://github.com/femadevspace/femascript-lang/pulls) detalhando suas alterações.

> **Atenção:** Este projeto foi desenvolvido utilizando a ferramenta [Bun](https://bun.sh/). Para executá-lo corretamente, por favor, instale as dependências (`bun install`) e utilize os comandos específicos do Bun, como `bun run dev`, para rodar o projeto. _Run with bun!_

<h2 align='center'>👽 Problemas (Des)conhecidos</h2>

Se você encontrar qualquer comportamento inesperado ou suspeitar de um bug, consulte a seção de [Issues Abertas](https://github.com/femadevspace/femascript-lang/issues) do repositório. É possível que o problema já tenha sido relatado por outros usuários ou que esteja em processo de resolução.

Se o problema que você encontrou não estiver listado, sinta-se à vontade para abrir uma nova issue fornecendo o máximo de detalhes possível para ajudar a identificar e corrigir o problema. Agradecemos sua contribuição!

<h2 align='center'>✨ Créditos</h2>

Este projeto foi iniciado em meados de 2024 por [Thiago Ausechi](https://github.com/thiagoausechi), então aluno do 1º ano de Ciências da Computação, com o apoio e orientação dos docentes da área de Informática da [FEMA](https://fema.edu.br/).

Além disso, vários projetos foram explorados para possibilitar o desenvolvimento desta linguagem. Em especial, gostaríamos de expressar nosso profundo agradecimento à biblioteca [Chevrotain](https://github.com/Chevrotain/chevrotain) por facilitar grande parte do trabalho complexo de análise e processamento da linguagem.
