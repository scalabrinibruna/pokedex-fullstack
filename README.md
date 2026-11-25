# Pokédex — React + Spring Boot + MongoDB

Atividade 04 — Desenvolvimento e Integração de Aplicações Web (PUC Minas).

A Pokédex da Atividade 03 (React + Vite) deixou de ler o `pokedex-data.json` e agora consome uma API REST em Spring Boot, que guarda os dados no MongoDB Atlas.

```
Front (React + Vite)  →  Back (Spring Boot)  →  MongoDB Atlas
```

## Tecnologias

- React 18 e Vite 5
- Java 17+ e Spring Boot 3.5 (Spring Web e Spring Data MongoDB)
- MongoDB Atlas
- `concurrently`, para rodar back e front com um único comando

## Funcionalidades

- Pesquisa por nome ou ID e filtro por tipo
- Detalhes do Pokémon com barras de atributos, buscados na API (`GET /api/pokemons/{id}`)
- Cadastro, edição e exclusão de Pokémon, salvos no MongoDB
- Imagem opcional por Pokémon (URL); quando vazia, usa o sprite da PokéAPI pelo ID
- Área de treinadores, com insígnias e Pokémon de cada um
- Tipo Fairy, além dos 17 tipos do script original, para cadastrar Pokémon de gerações mais novas
- Mensagem quando nenhum Pokémon é encontrado
- Layout responsivo

## Estrutura

```
Back/                  API Spring Boot
  src/main/java/com/pokedex/
    controller/        endpoints REST
    service/           regras de negócio
    repository/        acesso ao MongoDB
    model/             documentos
    exception/         tratamento de erros
    config/            carga inicial dos dados
  src/main/resources/
    application.properties   configuração e string de conexão do MongoDB
    seed/                    dados do Script_Pokedex.sql em JSON
Front/                 Pokédex React + Vite
  src/
    api.js             chamadas à API
    components/        componentes React
Script_Pokedex.sql     fonte original dos dados
package.json           roda back e front juntos (concurrently)
```

## Requisitos

| Ferramenta | Versão | Conferir com |
| ---------- | ------ | ------------ |
| Node.js | 18 ou maior | `node -v` |
| Java (JDK) | 17 ou maior | `java -version` |
| Maven | 3.9 ou maior | `mvn -v` |
| MongoDB Atlas | conta gratuita | — |

O Maven precisa estar no `Path` do sistema e o Java precisa ter a variável `JAVA_HOME` configurada. Depois de instalar qualquer ferramenta, feche e abra o terminal (ou o editor) de novo.

## Configurar o MongoDB Atlas

O repositório já vem com uma string de conexão no `application.properties`. Para usar o seu próprio banco, siga os passos abaixo.

1. No [MongoDB Atlas](https://www.mongodb.com/atlas), crie um cluster gratuito (**M0 / Free**).
2. Em **Database & Network Access > Database Users**, crie um usuário (por exemplo, `pokedex`) com permissão **Read and write to any database**. Use uma senha só com letras e números.
3. Em **Database & Network Access > IP Access List**, libere o seu IP. Para rodar de qualquer rede, adicione `0.0.0.0/0` (sem marcar "temporary").
4. Em **Clusters > Connect > Drivers**, copie a string de conexão e troque `<db_password>` pela senha do usuário, sem os sinais `<` e `>`.
5. Abra `Back/src/main/resources/application.properties` e cole a string em `spring.data.mongodb.uri`:

```properties
spring.data.mongodb.uri=mongodb+srv://USUARIO:SENHA@SEU-CLUSTER.mongodb.net/?retryWrites=true&w=majority
spring.data.mongodb.database=pokedex
```

Se a senha tiver caracteres especiais (`@`, `:`, `/`, `?`, `#`, `%`), codifique-os na URL (`@` vira `%40`) ou use uma senha só com letras e números.

Como a string de conexão fica nesse arquivo, o repositório é **privado** e o acesso é dado ao professor como colaborador, para que a senha não fique pública.

Na primeira execução o back cria o banco `pokedex` e popula as coleções `pokemons`, `types` e `trainers` com os dados do `Script_Pokedex.sql`. Isso só acontece quando as coleções estão vazias, então os dados não são duplicados nas próximas execuções.

## Executar

Na raiz do projeto, para rodar back e front juntos:

```bash
npm install
npm run concurrently
```

O `npm install` da raiz também instala as dependências do `Front`. Na primeira execução o Maven baixa as dependências do back e pode levar alguns minutos.

O projeto está no ar quando aparecerem:

- no back: `Started PokedexApplication in ... seconds`
- no front: `Local: http://localhost:5173/`

Depois, abra no navegador:

- **Aplicação:** http://localhost:5173
- **API:** http://localhost:8080/api/pokemons

Para parar, use `Ctrl + C` no terminal.

### Rodar separadamente

```bash
# Back (API em http://localhost:8080)
cd Back
mvn spring-boot:run

# Front (em outro terminal)
cd Front
npm install
npm run dev
```

O Vite encaminha as chamadas `/api` para `http://localhost:8080`. Para usar outro endereço da API, defina `VITE_API_URL` em `Front/.env`.

## API

| Método | Endpoint | Descrição |
| ------ | -------- | --------- |
| GET | `/api/pokemons` | Lista todos os Pokémon |
| GET | `/api/pokemons/{id}` | Busca um Pokémon pelo ID |
| POST | `/api/pokemons` | Cadastra (o ID é gerado pela API) |
| PUT | `/api/pokemons/{id}` | Atualiza |
| DELETE | `/api/pokemons/{id}` | Remove |
| GET | `/api/trainers` | Lista os treinadores |
| GET | `/api/types` | Lista os tipos |

Respostas de erro vêm em JSON, por exemplo `404` com `{ "message": "Pokémon 9999 não encontrado" }` e `400` quando faltam nome ou atributos.

Exemplo de documento da coleção `pokemons`:

```json
{
  "id": 25,
  "name": "Pikachu",
  "stats": {
    "hp": 35,
    "attack": 55,
    "defense": 30,
    "specialAttack": 50,
    "specialDefense": 40,
    "speed": 90
  },
  "types": [{ "id": 5, "name": "Electric" }],
  "image": null
}
```

O campo `image` é opcional. Quando é `null`, o front usa o sprite da PokéAPI pelo ID.

## Como o professor pode executar

A string de conexão do MongoDB Atlas já está no `Back/src/main/resources/application.properties`, então basta seguir a seção **Executar**. O banco é populado automaticamente na primeira execução.

## Problemas comuns

| Problema | Solução |
| -------- | ------- |
| `mvn` não é reconhecido | Instale o Maven, adicione a pasta `bin` ao `Path` e reabra o terminal |
| O back não conecta ao Atlas | Confira a senha na string, se o IP está liberado em *IP Access List* e se `<` e `>` foram removidos |
| O front mostra "Não foi possível carregar os dados" | O back não subiu; veja o terminal e a mensagem de erro do Spring |
| Scripts desabilitados no PowerShell | Rode `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| Porta 8080 ou 5173 ocupada | Feche o outro programa que usa a porta e rode de novo |

## Fontes

- Dados: `Script_Pokedex.sql` e `pokedex-data.json` da atividade (professor João Paulo Aramuni). O tipo Fairy foi acrescentado pela dupla.
- Imagens: sprites públicos da PokéAPI (`raw.githubusercontent.com/PokeAPI/sprites`).

## Integrantes

- Bruna Batista Scalabrini