# 로그인 후 페이지 이동 시 로그아웃/인증 오류 수정

## Context
`react_sts/mall`(프론트) + `mallapi`(백엔드) 쇼핑몰에서, 로그인 후 Product/Todo/Cart 등 다른 페이지로 이동하면 다시 로그인하라는 경고가 뜨거나 에러가 발생하는 문제를 조사·수정 중. 세션 중 여러 개별 버그가 순차적으로 발견되어 일부는 이미 수정 완료, 방금 카카오 로그인 경로의 별도 버그를 추가로 발견함.

## 이미 수정 완료된 항목 (구현 완료, 커밋 전)
1. **`src/include/Header.jsx`** — MAIN/ABOUT/TODO/PRODUCTS/CART 메뉴가 `react-bootstrap`의 `Nav.Link`/`NavDropdown.Item`에 `href`만 주어져 순수 `<a>`로 렌더링되고, 클릭 시 브라우저 전체 새로고침(SPA 이탈)이 발생해 Redux 로그인 상태가 초기화되던 문제. → `as={Link} to="..."`로 전환 완료.
2. **`src/slices/loginSlice.js`, `src/util/jwtUtil.jsx`** — `setCookie("member", JSON.stringify(payload), 1)`처럼 이미 객체를 넘기면 되는 `setCookie`에 추가로 `JSON.stringify`를 적용해 이중 직렬화가 발생. `react-cookie`의 `Cookies.get()`은 저장값을 자동으로 1회 파싱하므로, 이중 직렬화된 값은 조회 시 객체가 아니라 문자열로 남아 `accessToken`/`refreshToken` 등 필드가 전부 `undefined`가 되던 문제. → 두 곳 모두 `JSON.stringify` 제거 완료.
3. **`src/components/product/AddComponent.jsx`** — `productPostAdd`를 `../../api/todoApi`에서 잘못 import(오타/복붙 실수). `todoApi.jsx`에는 해당 export가 없어 "does not provide an export" 런타임 에러 발생. → import 경로를 `../../api/productApi`로 수정 완료.

이 3가지 수정 이후 일반 로그인(이메일/비번) 경로에서는 Product List/Add 이동이 정상 동작할 것으로 기대되며, 사용자가 재현한 마지막 에러는 **카카오 로그인 경로**에서 발생한 것으로 확인됨 (아래 신규 이슈).

## 완료: 카카오 로그인 시 쿠키 미저장
`src/slices/loginSlice.js`의 `reducers.login`에 `setCookie("member", loginParam, 1)` 한 줄을 추가해 `extraReducers`의 `loginPostAsync.fulfilled`와 동일한 패턴으로 맞춤 완료. 이 수정 이후 카카오 로그인도 쿠키에 `accessToken`/`refreshToken`이 정상 저장되어, REQUIRE_LOGIN으로 인한 강제 로그아웃 증상은 해결된 것으로 확인(사용자가 이번에 보고한 에러 2건은 이 문제와 무관한 별개 이슈).

## 신규 발견 (이번 턴) — 인증과 무관한 별개 이슈 2건

### 1. 카카오 인가 코드(authCode) 중복 소비로 인한 400 에러
**로그:** `Uncaught (in promise) AxiosError: Request failed with status code 400` (`axios.js` → `getAccessToken` 호출 지점)

**원인:** `src/pages/member/KakaoRedirectPage.jsx`의 `useEffect`가 카카오 인가 코드(`authCode`, 1회성)로 `getAccessToken(authCode)`를 호출함. `src/main.jsx` 확인 결과 `<React.StrictMode>`는 사용하지 않으므로 이중 마운트가 원인은 아님 — 대신 카카오 인가 코드 자체의 특성(발급 후 유효시간이 매우 짧고, 정확히 1회만 소비 가능) 때문에, 사용자가 카카오 로그인 완료 후 이 리다이렉트 페이지에서 **브라우저 새로고침을 하거나, 뒤로가기 후 다시 진입**하면 같은 `code` 쿼리 파라미터로 `useEffect`가 다시 실행되어 이미 소비된 코드로 재요청 → 카카오 서버가 400 반환. 즉 실사용 흐름(카카오 로그인 → 자동 리다이렉트 1회)에서는 발생하지 않고, 개발 중 새로고침/재진입 시에만 나타나는 것으로 추정됨.

이 코드도 교안을 따른 구조이므로 로직을 새로 설계하지 않고, 같은 `authCode`로 중복 요청되는 것만 막는 최소 가드를 추가하는 방향:
- `KakaoRedirectPage.jsx`에 `useRef` 플래그(예: `calledRef`)를 두어 이미 처리한 `authCode`에 대해서는 `getAccessToken`을 다시 호출하지 않도록 함. 새로운 로그인 흐름이나 API 구조 변경 없이, 같은 컴포넌트 안에서 중복 실행만 막는 최소한의 방어 코드.

### 2. ListComponent.jsx의 React key prop 경고
**로그:** `Each child in a list should have a unique "key" prop.` (`ListComponent.jsx:50-51`)

**원인:** `src/components/product/ListComponent.jsx`의 `serverData.dtoList.map(...)`에서 각 반복 항목의 최상위 엘리먼트는 `<>...</>` (Fragment)인데, `key`는 그 안의 자식인 `<Card key={product.pno}>`에 붙어 있음. React가 리스트 렌더링 시 식별자를 요구하는 대상은 `.map()`이 반환하는 최상위 엘리먼트이므로, Fragment 자체에 key가 없어 경고 발생.

**수정 방향:** `<>...</>`를 `<React.Fragment key={product.pno}>...</React.Fragment>`로 바꾸거나, 불필요한 Fragment 래핑 자체를 제거하고 `<Card key={product.pno}>`를 바로 최상위로 반환 (자식이 `Card` 하나뿐이라 Fragment가 애초에 불필요 — 가장 단순한 수정). 기능 동작에는 영향 없는 경고이므로 낮은 우선순위.

### 검증 방법
- React StrictMode 적용 여부 확인 후, 카카오 로그인 재시도 시 400 에러가 (StrictMode 비활성 시) 사라지는지 또는 (가드 추가 시) 두 번째 호출 자체가 스킵되는지 콘솔로 확인
- Product List 페이지에서 key prop 경고가 콘솔에 더 이상 나타나지 않는지 확인
- 두 수정 모두 기존 로그인/목록 기능 동작에 변화가 없는지(카드 클릭 이동, 로그인 성공 흐름) 재확인

이 항목들은 모두 구현 완료됨 (`KakaoRedirectPage.jsx` useRef 가드, `ListComponent.jsx` key 위치 수정).

## 신규 발견 (이번 턴) — ReadPage 동적 import 실패

**로그:** `TypeError: Failed to fetch dynamically imported module: http://localhost:5173/src/pages/product/ReadPage.jsx` (React Router의 기본 ErrorBoundary가 캐치)

**조사 내용:**
- `src/pages/product/ReadPage.jsx`, `src/components/product/ReadComponent.jsx`, `src/router/Root.jsx`의 lazy import, `vite.config.js` 모두 확인 — import 경로/문법 자체는 정상.
- 단, `src/components/commons/exceptionHandle.jsx`(`ReadComponent.jsx`가 새로 import하는 공용 에러 핸들러) 안에 **정의되지 않은 `setFetching(false)`를 모듈 스코프 함수 내부에서 호출**하는 버그가 있음 (3번째 줄). 이 함수는 `useState`의 setter를 받는 인자가 없어 항상 `ReferenceError`를 던짐 — 다만 이는 "동적 import 자체가 실패"하는 것과는 다른 층위의 문제(빌드 실패가 아니라 런타임 호출 시 에러)로, 이번 "Failed to fetch dynamically imported module"의 직접 원인은 아닐 가능성이 높음.
- 이 세션에서 `Header.jsx`(전역 컴포넌트), `loginSlice.js`, `AddComponent.jsx`, `KakaoRedirectPage.jsx`, `ListComponent.jsx`를 연달아 Vite dev 서버가 켜진 채로 수정 — HMR이 여러 차례 모듈 그래프를 재계산하면서, 브라우저가 들고 있던 이전 청크 해시와 서버 상태가 어긋나 특정 lazy 청크 요청이 무효화(404류)되었을 가능성이 유력한 원인으로 판단됨. 이런 경우는 코드 수정이 아니라 **브라우저 하드 리프레시(캐시 무시 새로고침, 예: Ctrl+Shift+R)** 로 해결되는 경우가 많음.

### 사용자 확인 결과 및 추가 조사
- 하드 리프레시(캐시 무시 새로고침) 후에도 동일 에러 재현됨 → Vite HMR 캐시 문제가 아니라 실제 런타임 예외로 판단.
- `curl`로 `ReadPage.jsx`, `ReadComponent.jsx`, `exceptionHandle.jsx` 세 모듈을 직접 요청한 결과 모두 HTTP 200으로 정상 컴파일되어 서빙됨 — 즉 Vite 빌드/모듈 그래프 자체는 깨지지 않음.
- `Root.jsx`에 커스텀 `errorElement`가 없어 React Router v7 기본 ErrorBoundary가 렌더링 트리에서 발생한 예외를 처리하는데, 원인이 무엇이든 lazy 라우트 컴포넌트에서 발생한 에러는 이 기본 바운더리가 "Failed to fetch dynamically imported module"이라는 (오해의 소지가 있는) 문구로 표시하는 경우가 있음.
- **결론:** 실제 원인은 모듈 로드 실패가 아니라, `ReadComponent.jsx`가 `productGetOne(pno)` 실패 시 호출하는 `exceptionHandle(e)`(`src/components/commons/exceptionHandle.jsx`) 내부의 `setFetching(false)` — 정의되지 않은 식별자 호출로 `ReferenceError`가 발생하고, 이 예외가 React 트리 바깥(promise catch)에서 터지며 React Router 에러 바운더리에 "동적 import 실패"로 표시된 것.

### 수정 계획 (사용자 승인: "그냥 삭제")
1. **`src/components/commons/exceptionHandle.jsx`** — 3번째 줄 `setFetching(false);`를 삭제. 호출부인 `ReadComponent.jsx`(및 다른 사용처)는 이미 자체적으로 `.finally(() => setFetching(false))`로 로딩 상태를 해제하고 있어 이 줄은 애초에 중복이자 정의되지 않은 참조였음 — 단순 삭제로 충분하고 기능 손실 없음.
2. 삭제 후에도 `productGetOne(pno)`가 여전히 실패하는 근본 원인(예: 인증 헤더 문제, 존재하지 않는 pno 등)이 있다면 이번엔 `exceptionHandle`이 정상 동작해 알림창으로 실제 상태 코드가 표시될 것이므로, 그 알림 내용으로 다음 원인을 좁힐 수 있음.

### 검증 방법
- 수정 후 Product List에서 카드를 클릭해 ReadPage로 이동 시 "Failed to fetch dynamically imported module" 에러 없이 정상적으로 상세 페이지가 렌더링되는지 확인.
- 만약 백엔드 인증/조회 자체가 실패하는 상태라면, 이번엔 콘솔 대신 `exceptionHandle`이 의도한 대로 알림창(예: "요청하신 상품 정보를 찾을 수 없습니다" 등)이 뜨는지 확인 — 이 경우 알림 내용을 근거로 다음 조사를 진행.
