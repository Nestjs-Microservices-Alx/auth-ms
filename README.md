# Auth Microservice

- --- Creamos el proyecto
  - -- Con ncil
    - run: `nest new payments-ms `

- --- Inicia como un RESTful API
  - -- Se lo crea con nest cli
    - run:  `nest g res auth --no-spec`
      - Microservices (non-http)
      - No CRUD


- --- DTO validators:
  - -- Install deps
    - runs: `pnpm add class-validator class-transformer`
  - -- Config validator global pipe
    - en el `main.ts`



