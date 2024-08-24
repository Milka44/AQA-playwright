# Використання базового образу Ubuntu
FROM mcr.microsoft.com/playwright:v1.45.2-jammy

# створення папки
RUN mkdir playwright-tests
# Вказівка робочої директорії
WORKDIR playwright-tests
# Команда копіювання файлів проекту
COPY . .
# Встановлення фіксованих пакетів з package-lock.json
RUN npm ci

# Команда стартує при запуску контейнера
CMD [ "npm", "run", "test" ]