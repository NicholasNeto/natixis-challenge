# Estágio 1: Build da Aplicação com uma imagem Maven/JDK 17 válida
FROM maven:3.9.6-eclipse-temurin-17-focal AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o pom.xml e descarrega as dependências primeiro para aproveitar a cache do Docker
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia o resto do código fonte
COPY src ./src

# Compila a aplicação e gera o .jar, ignorando os testes
RUN mvn package -DskipTests


# Estágio 2: Execução da Aplicação (esta parte já estava correta)
FROM eclipse-temurin:17-jre-focal

WORKDIR /app

# Copia o JAR do estágio de build.
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta que a aplicação Spring Boot usa
EXPOSE 8080

# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]

