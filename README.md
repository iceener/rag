![](https://cloud.overment.com/64f03a69fe4b3cbdb0f95b7f_LOgo_V2-1694637609.png)

## AI_Devs #2
Repozytorium z kodem źródłowym z webinaru **Jak połączyć AI z własnymi danymi? RAG w praktyce!**

⚠️ **UWAGA!** ⚠️
- Kod źródłowy jest przeznaczony wyłącznie do celów edukacyjnych. Nie należy go używać w środowisku produkcyjnym.
- Kod **nie jest** zoptymalizowany do pracy z dużymi zestawami danych.
- Przed uruchomieniem kodu, ustaw twardy limit $ na swoim koncie
- Podczas webinaru kod był uruchamiany z modelem GPT-4. W repozytorium domyślny model to GPT-3.5-Turbo, którego skuteczność jest niższa. Jeśli masz dostęp do GPT-4, zamień w kodzie parametr modelName na 'gpt-4'

## Instalacja

1. Pobierz repozytorium na swój komputer
2. Dodaj swój klucz [OpenAI API](https://platform.openai.com/account/api-keys) do pliku .env
3. Zainstaluj zależności poleceniem `bun install`
4. Uruchamiaj poszczególne skrypty poleceniem `bun nazwa_pliku.ts`

## Uruchomienie 07_llama.ts

1. Zainstaluj https://ollama.ai
2. Pobierz i uruchom model, np. llama-2 poleceniem `ollama run llama2`
3. Uruchom skrypt poleceniem `bun 07_llama.ts`

## Dołącz do drugiej edycji AI_Devs

Więcej na temat pracy z dużymi modelami językowymi i łączenia ich z kodem, znajdziesz w drugiej edycji AI_Devs. Dołącz do nas na https://aidevs.pl