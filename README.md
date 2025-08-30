# Documentação de API REST com OpenAPI

Este projeto demonstra três abordagens diferentes para criar documentação de APIs REST utilizando o padrão OpenAPI 3.1.0. O objetivo é explorar e comparar diferentes métodos de documentação, desde a criação manual até a geração automática a partir do código.

## 📋 Visão Geral

O projeto implementa uma API simples com autenticação e gerenciamento de usuários, explorando as seguintes funcionalidades:
- Autenticação de usuários
- Listagem de usuários com paginação
- Criação de usuários

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Fastify** - Framework web rápido e eficiente
- **Zod** - Biblioteca de validação e parsing de esquemas
- **OpenAPI 3.1.0** - Especificação para documentação de APIs REST
- **Scalar UI** - Interface moderna para visualização da documentação

## 📚 Três Abordagens de Documentação

### 1. Documentação Manual (spec.yml)

**Localização:** `spec.yml`

A primeira abordagem consiste em criar manualmente um arquivo YAML seguindo a especificação OpenAPI. Este método oferece controle total sobre a documentação, mas requer manutenção manual sempre que a API for alterada.

**Características:**
- ✅ Controle total sobre a estrutura da documentação
- ✅ Independente da implementação
- ✅ Pode ser criada antes mesmo da implementação (Design-First)
- ❌ Requer sincronização manual com o código
- ❌ Propenso a divergências entre documentação e implementação

**Exemplo:**
```yaml
openapi: 3.1.0
info:
  title: Sample API
  description: A sample API to illustrate OpenAPI concepts
  version: 1.0.0

paths:
  /users:
    get:
      summary: Retrieve a list of users
      parameters:
        - name: page
          in: query
          description: Page number for pagination
          required: false
          schema:
            type: integer
            default: 1
            minimum: 1
```

### 2. Documentação com Fastify Swagger

**Localização:** `src/routes/create-user-route.ts` e `src/routes/get-users-route.ts`

A segunda abordagem utiliza o plugin `@fastify/swagger` para gerar documentação diretamente a partir dos esquemas definidos nas rotas. A documentação é definida usando JSON Schema no próprio código das rotas.

**Características:**
- ✅ Documentação próxima ao código
- ✅ Geração automática da especificação OpenAPI
- ✅ Validação automática baseada nos esquemas
- ✅ Suporte completo ao JSON Schema
- ❌ Sintaxe mais verbosa
- ❌ Esquemas podem ficar extensos

**Exemplo:**
```typescript
export async function createUserRoute(server: FastifyInstance) {
  server.post('/users', {
    schema: {
      summary: 'Create user',
      description: 'Register user on the platform',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: {
            type: 'string',
            minLength: 2,
            maxLength: 100
          },
          email: {
            type: 'string',
            format: 'email'
          }
        }
      },
      response: {
        201: {
          description: 'User created successfully',
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' }
          }
        }
      }
    }
  }, async (request, reply) => {
    // Implementação da rota
  })
}
```

### 3. Documentação com Zod + fastify-type-provider-zod

**Localização:** `src/routes/login-route.ts`

A terceira abordagem combina o poder do Zod para validação de tipos com o `fastify-type-provider-zod`, que automaticamente converte esquemas Zod para JSON Schema e gera a documentação OpenAPI.

**Características:**
- ✅ Type-safety completo com TypeScript
- ✅ Sintaxe mais limpa e expressiva
- ✅ Validação runtime e compiletime
- ✅ Geração automática de tipos TypeScript
- ✅ Menos código boilerplate
- ✅ Melhor experiência de desenvolvimento

**Exemplo:**
```typescript
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/login', {
    schema: {
      summary: 'User authentication',
      description: 'Authenticate user into the system',
      tags: ['Auth'],
      body: z.object({
        email: z.email().describe('User email'),
        password: z.string().describe('User password')
      }),
      response: {
        201: z.object({
          message: z.string().default('Login successful'),
          token: z.string().describe('JWT access token')
        }).describe('Successful login response'),
        401: z.object({
          error: z.string().default('Invalid credentials')
        }).describe('Email or password incorrect')
      }
    }
  }, async (request, reply) => {
    // Implementação da rota com tipos automaticamente inferidos
  })
}
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- pnpm (gerenciador de pacotes)

### Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd documentacao-api
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Execute o servidor em modo de desenvolvimento:**
   ```bash
   pnpm run dev
   ```

4. **Acesse a documentação:**
   - Servidor: http://localhost:3000
   - Documentação: http://localhost:3000/docs
   - Especificação OpenAPI: http://localhost:3000/openapi.json

## 🎯 Endpoints Disponíveis

### Autenticação
- `POST /login` - Autenticação de usuário

### Usuários
- `GET /users` - Listagem de usuários (com paginação)
- `POST /users` - Criação de usuário

## 🔧 Configuração

O projeto utiliza:
- **Fastify** como framework web
- **@fastify/swagger** para geração da especificação OpenAPI
- **@scalar/fastify-api-reference** para interface de documentação moderna
- **fastify-type-provider-zod** para integração entre Zod e Fastify
- **@fastify/cors** para configuração de CORS

## 📊 Comparação das Abordagens

| Aspecto | Manual (YAML) | Fastify Swagger | Zod + Type Provider |
|---------|---------------|-----------------|-------------------|
| **Type Safety** | ❌ | ⚠️ Parcial | ✅ Completo |
| **Manutenção** | ❌ Manual | ✅ Automática | ✅ Automática |
| **Sintaxe** | ✅ Simples | ⚠️ Verbosa | ✅ Expressiva |
| **Validação** | ❌ | ✅ | ✅ |
| **DX** | ⚠️ | ✅ | ✅ Excelente |
| **Flexibilidade** | ✅ | ✅ | ⚠️ |

## 🎓 Aprendizados

Este projeto de estudos demonstra que:

1. **Documentação Manual** é útil para prototipagem rápida e quando se precisa de controle total, mas não escala bem em projetos maiores.

2. **Fastify Swagger** oferece um bom equilíbrio entre controle e automação, sendo ideal para projetos que já utilizam JSON Schema.

3. **Zod + Type Provider** oferece a melhor experiência de desenvolvimento com type-safety completo, validação automática e menos código boilerplate, sendo a escolha recomendada para novos projetos TypeScript.