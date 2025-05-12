## 🌐 [English Version of README](README_EN.md)

# Online Course Platform API

Este projeto é uma API backend desenvolvida com NestJS para gerenciar uma plataforma de cursos online. Ele oferece funcionalidades de autenticação, gerenciamento de usuários, cursos, seções, aulas, compras, avaliações e um dashboard com estatísticas, além de suporte a upload de arquivos e documentação automática via Swagger.

## 🔨 Funcionalidades do Projeto

* Registro e login de usuários com JWT e refresh tokens
* CRUD de usuários (com upload de avatar)
* CRUD de cursos, seções e aulas
* Rota de compra de cursos e histórico de compras
* Avaliação de cursos (reviews)
* Dashboard para instrutores e administradores
* Documentação da API via Swagger em `/api/docs`
* Servir arquivos estáticos (avatars, thumbnails, etc.)

### Exemplo Visual do Projeto

![Swagger UI](https://github.com/user-attachments/assets/c89e57cc-ca23-423f-9090-2db58f562e9e)

## ✔️ Técnicas e Tecnologias Utilizadas

* **Linguagem:** TypeScript
* **Framework:** NestJS
* **Banco de Dados:** PostgreSQL
* **ORM:** TypeORM
* **Autenticação:** JWT, Passport.js
* **Validação:** class-validator, class-transformer
* **Upload de Arquivos:** Multer
* **Documentação:** Swagger (OpenAPI)
* **Testes:** Jest (E2E)

## 📁 Estrutura do Projeto

* **src/**

  * **auth/**: Autenticação (register, login, refresh, JWT)
  * **users/**: CRUD de usuários, upload de avatar
  * **courses/**: CRUD de cursos
  * **sections/**: CRUD de seções
  * **lessons/**: CRUD de aulas
  * **purchases/**: Compra de cursos
  * **reviews/**: Avaliação de cursos
  * **dashboard/**: Estatísticas para instrutores e admins
  * **config/**: Módulo de banco de dados (TypeORM)
  * **app.module.ts**: Módulo raiz da aplicação
  * **main.ts**: Bootstrap da aplicação e Swagger setup
* **uploads/**

  * **avatars/**: Armazenamento de avatares de usuários
* **test/**

  * **app.e2e-spec.ts**: Testes E2E com Jest
* **package.json**: Dependências e scripts
* **tsconfig.json**: Configurações do TypeScript
* **.env.example**: Exemplo de variáveis de ambiente

## 🛠️ Abrir e rodar o projeto

Para iniciar o projeto localmente, siga os passos abaixo:

1. **Certifique-se de que o Node.js está instalado**:

   * O [Node.js](https://nodejs.org/) é necessário. Verifique com:

     ```bash
     node -v
     ```
   * Se não estiver instalado, baixe a versão recomendada no site oficial.

2. **Clone o Repositório**:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

3. **Instale as dependências**:

   ```bash
   npm install
   ```

4. **Configure as variáveis de ambiente**:

   * Copie o `.env.example` para `.env` e preencha as informações de acesso ao banco.

5. **Execute a aplicação em modo de desenvolvimento**:

   ```bash
   npm run start:dev
   ```

6. **Acesse a documentação**:

   * Abra no navegador: `http://localhost:3000/api/docs`

## 🌐 Deploy

* **Build da aplicação**:

  ```bash
  npm run build
  ```
* **Executar em produção**:

  ```bash
  npm run start:prod
  ```
* **Docker (opcional)**:

  ```bash
  docker build -t online-course-api .
  docker run -d -p 3000:3000 --env-file .env online-course-api
  ```
