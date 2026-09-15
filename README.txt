WERSJA NAPRAWIONA DLA VERCEL (v2)

STRUKTURA — musi być DOKŁADNIE taka:

  index.html
  package.json
  vercel.json
  api/proxy.mjs        <-- mała litera "a" w "api", nie "Api"!

NAJWAŻNIEJSZE — dlaczego wcześniej nie działało:
Klawiatura mobilna na telefonie potrafi automatycznie zmienić pierwszą
literę nazwy folderu na wielką, więc "api/proxy.mjs" zamieniało się w
"Api/proxy.mjs". Vercel wymaga DOKŁADNIE małego "api" — inaczej funkcja
serverless nie zostanie znaleziona i endpoint /api/proxy zwraca 404 /
DEPLOYMENT_NOT_FOUND.

JAK WGRAĆ NA GITHUBIE (mobile web), krok po kroku:

1. Jeśli w repo istnieje już jakikolwiek plik proxy.mjs (w root albo w
   złym folderze typu "Api") — usuń go najpierw (wejdź w plik -> ikona
   kosza -> Commit changes).

2. Wejdź w repo -> "Add file" -> "Create new file".

3. W polu nazwy wpisz: api/proxy.mjs
   Zanim zatwierdzisz — sprawdź WZROKIEM czy pole na pewno pokazuje
   małe "a" na początku. Jeśli telefon zmienił to na "Api", popraw
   ręcznie (usuń literę i wpisz małe "a" jeszcze raz, czasem trzeba
   wyłączyć autokapitalizację w ustawieniach klawiatury na czas
   wpisywania).

4. Wklej całą zawartość pliku api/proxy.mjs z tego paczki (patrz plik
   api/proxy.mjs obok).

5. Commit new file -> od razu do brancha main.

6. Sprawdź resztę plików w repo — index.html, package.json,
   vercel.json powinny leżeć w GŁÓWNYM katalogu repo (nie w api/).
   Jeśli różnią się od tych w tej paczce, podmień je tą samą metodą
   (wejdź w plik -> ołówek edycji -> zaznacz całość -> wklej nową
   treść -> Commit changes).

7. Poczekaj na redeploy (Vercel -> Deployments), status powinien być
   "Ready".

8. TEST — otwórz w przeglądarce:
   https://q1-silk.vercel.app/api/proxy?url=https%3A%2F%2Fquery1.finance.yahoo.com%2Fv8%2Ffinance%2Fchart%2FSPY%3Finterval%3D1d%26range%3D5d

   Poprawny wynik = dużo tekstu JSON zaczynającego się od {"chart":...
   Błędny wynik = strona "This page doesn't exist" albo 404.

9. Jeśli test w punkcie 8 działa, otwórz:
   https://q1-silk.vercel.app/
   Dashboard powinien zacząć pokazywać dane zamiast samych myślników.
